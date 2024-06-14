import { createWithRemoteLoader } from '@kne/remote-loader';
import importMessages, { moduleName } from '../../../locale';

const ResetPasswordFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Intl@useIntl']
})(({ remoteModules }) => {
  const [FormInfo, useIntl] = remoteModules;
  const { Input } = FormInfo.fields;
  const { formatMessage } = useIntl({ moduleName });
  return (
    <FormInfo
      column={1}
      list={[<Input.Password name="password" label={formatMessage({ id: 'password' })} rule="REQ LEN-6-50" />, <Input.Password name="repeatPwd" label={formatMessage({ id: 'repeatNewPassword' })} rule="REQ LEN-6-50 REPEAT-password" />]}
    />
  );
});

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <ResetPasswordFormInner {...props} />
    </IntlProvider>
  );
});
