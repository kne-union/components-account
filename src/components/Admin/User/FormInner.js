import { createWithRemoteLoader } from '@kne/remote-loader';
import importMessages, { moduleName } from '../../../locale';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@formModule', 'components-core:Intl@useIntl']
})(({ remoteModules }) => {
  const [FormInfo, formModule, useIntl] = remoteModules;
  const { Input, TextArea, PhoneNumber } = formModule;
  const { formatMessage } = useIntl({ moduleName });
  return (
    <FormInfo
      column={1}
      list={[
        <Input name="nickname" label="昵称" rule="LEN-0-100" />,
        <Input name="email" label={formatMessage({ id: 'emailAccount' })} rule="EMAIL ACCOUNT_IS_EXISTS" realtime />,
        <PhoneNumber name="phone" label={formatMessage({ id: 'phoneNumber' })} rule="ACCOUNT_IS_EXISTS" interceptor="phone-number-string" />,
        <TextArea name="description" label="个人简介" />
      ]}
    />
  );
});

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <FormInner {...props} />
    </IntlProvider>
  );
});
