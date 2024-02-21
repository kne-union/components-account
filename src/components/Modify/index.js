import { Space } from 'antd';
import commonStyle from '../../common/common.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import rules from '../../common/rules';
import importMessages, { moduleName } from '../../locale';

const Modify = createWithRemoteLoader({
  modules: ['FormInfo@formModule', 'components-core:Intl@useIntl']
})(({ remoteModules, email, onSubmit, className, render }) => {
  const [formModule, useIntl] = remoteModules;
  const { Form, Input, SubmitButton } = formModule;
  const { formatMessage } = useIntl({ moduleName });

  const { title, formInner, footer, formOuter } = render({
    title: () => (
      <>
        {formatMessage({ id: 'changePassword' })}
        <div className={commonStyle['reset-new-desc']}>{formatMessage({ id: 'changePasswordTips' })}</div>
      </>
    ),
    formInner: () => (
      <>
        <Input name="email" label={formatMessage({ id: 'emailAccount' })} disabled value={email && decodeURIComponent(email)} />
        <Input.Password name="oldPwd" label={formatMessage({ id: 'originalPassword' })} rule="REQ LEN-6-50" />
        <Input.Password name="newPwd" label={formatMessage({ id: 'newPassword' })} rule="REQ LEN-6-50" />
        <Input.Password name="repeatNewPwd" label={formatMessage({ id: 'repeatNewPassword' })} rule="REQ LEN-6-50 REPEAT-newPwd" />
      </>
    ),
    footer: () => (
      <SubmitButton block size="large">
        {formatMessage({ id: 'submit' })}
      </SubmitButton>
    ),
    formOuter: ({ title, formInner, footer }) => (
      <Form type="inner" rules={rules} size="large" onSubmit={onSubmit}>
        <Space className={classnames(commonStyle['form-inner'])} size={38} direction="vertical">
          <div className={commonStyle['title']}>{title}</div>
          <div>{formInner}</div>
          {footer}
        </Space>
      </Form>
    )
  });

  const footerComponent = footer(),
    formInnerComponent = formInner(),
    titleComponent = title();
  return <div className={classnames(commonStyle['out-container'], className)}>{formOuter({ title: titleComponent, formInner: formInnerComponent, footer: footerComponent })}</div>;
});

Modify.defaultProps = {
  render: components => components
};

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <Modify {...props} />
    </IntlProvider>
  );
});
