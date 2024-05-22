import RegisterComponent from '@components/Register';
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
  const { apis, baseUrl, registerType } = useProps();
  const { formatMessage } = useIntl({ moduleName });
  const navigate = useNavigate();
  const { message } = App.useApp();
  const account = Object.assign({}, presetApis?.account, apis);
  return (
    <RegisterComponent
      type={registerType}
      accountIsExists={async value => {
        const { data: resData } = await ajax(
          merge({}, account.accountIsExists, {
            data: { username: value }
          })
        );
        if (resData.code !== 0) {
          return { result: false, errMsg: resData.msg || '%s请求错误' };
        }

        if (resData.data.isExists) {
          return { result: false, errMsg: '%s已注册，请直接登录' };
        }

        return { result: true };
      }}
      validateCode={async data => {
        const { data: resData } = await ajax(
          merge({}, account.validateCode, {
            data
          })
        );
        if (resData.code !== 0) {
          return { result: false, errMsg: resData.msg || '%s不正确' };
        }

        return { result: true };
      }}
      sendVerificationCode={async ({ type, data }) => {
        const { data: resData } = await ajax(
          merge({}, type === 'phone' ? account.sendSMSCode : account.sendEmailCode, {
            data
          })
        );
        if (resData.code !== 0) {
          return false;
        }
        message.success(`验证码已发送至您的${type === 'phone' ? '手机' : '邮箱'}，请查收`);
      }}
      onSubmit={async formData => {
        const newPwd = md5(formData.password);
        const { data: resData } = await ajax(
          merge({}, account.register, {
            data: {
              email: formData.email,
              phone: formData.phone,
              password: newPwd,
              code: formData.code
            }
          })
        );
        if (resData.code !== 0) {
          return;
        }
        message.success(formatMessage({ id: 'registerSuccess' }));
        navigate(`${baseUrl}/login`);
      }}
    />
  );
});

export default Register;
