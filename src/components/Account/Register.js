import RegisterComponent from '@components/Register';
import { useParams } from 'react-router-dom';
import { useProps } from '../../common/context';
import useNavigate from '../../common/useNavigate';
import { createWithRemoteLoader } from '@kne/remote-loader';
import merge from 'lodash/merge';
import md5 from 'md5';
import { App } from 'antd';
import { moduleName } from '../../locale';

const Register = createWithRemoteLoader({
  modules: ['component-core:Global@usePreset', 'components-core:Intl@useIntl']
})(({ remoteModules }) => {
  const [usePreset, useIntl] = remoteModules;
  const { apis: presetApis, ajax } = usePreset();
  const { apis, baseUrl } = useProps();
  const { email } = useParams();
  const { formatMessage } = useIntl({ moduleName });
  const navigate = useNavigate();
  const { message } = App.useApp();
  const account = Object.assign({}, presetApis?.account, apis);
  return (
    <RegisterComponent
      email={email}
      onSubmit={async formData => {
        const newPwd = md5(formData.newPwd);
        const { data: resData } = await ajax(
          merge({}, account.registerAccount, {
            data: {
              email: formData.email,
              oldPwd: md5(formData.oldPwd),
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
});

export default Register;
