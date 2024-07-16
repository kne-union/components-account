import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { createWithFetch } from '@kne/react-fetch';
import { createWithRemoteLoader } from '@kne/remote-loader';
import ResetPasswordComponent from '@components/ResetPassword';
import { useProps, useBaseUrl } from '../../common/context';
import { App } from 'antd';
import merge from 'lodash/merge';
import md5 from 'md5';
import { moduleName } from '../../locale';

const NavigateToLogin = () => {
  const baseUrl = useBaseUrl();
  return <Navigate to={`${baseUrl}/login`} />;
};

const EmailFormToken = createWithFetch({
  error: () => <NavigateToLogin />
})(({ data, children }) => {
  return children(data);
});

const ResetPassword = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:Intl@useIntl']
})(({ remoteModules }) => {
  const [usePreset, useIntl] = remoteModules;
  const { apis: presetApis, ajax } = usePreset();
  const { apis, baseUrl } = useProps();
  const { formatMessage } = useIntl({ moduleName });
  const navigate = useNavigate();
  const { message } = App.useApp();
  const account = Object.assign({}, presetApis?.account, apis);
  const { token } = useParams();
  return (
    <EmailFormToken
      {...merge({}, account.parseResetToken, {
        data: {
          token: decodeURIComponent(token)
        }
      })}
    >
      {({ name }) => {
        return (
          <ResetPasswordComponent
            email={name}
            onSubmit={async formData => {
              const newPwd = md5(formData.newPwd);
              const { data: resData } = await ajax(
                merge({}, account.resetPassword, {
                  data: {
                    token,
                    email: formData.email,
                    newPwd: newPwd,
                    confirmPwd: newPwd
                  }
                })
              );
              if (resData.code !== 0) {
                return;
              }
              message.success(formatMessage({ id: 'resetSuccess' }));
              navigate(`${baseUrl}/login`);
            }}
          />
        );
      }}
    </EmailFormToken>
  );
});

export default ResetPassword;
