import { Button, Col, Row, Space } from 'antd';
import commonStyle from '../../common/common.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import rules from '../../common/rules';
import importMessages, { moduleName } from '../../locale';
import style from './style.module.scss';

const Register = createWithRemoteLoader({
  modules: ['FormInfo@formModule', 'components-core:Intl@useIntl']
})(({ remoteModules, onSubmit, className, render }) => {
  const [formModule, useIntl] = remoteModules;
  const { Form, Input, SubmitButton, PhoneNumber } = formModule;
  const { formatMessage } = useIntl({ moduleName });

  const { title, formInner, footer, formOuter } = render({
    title: () => (
      <>
        {formatMessage({ id: 'registerAccount' })}
        <div className={commonStyle['reset-new-desc']}>{formatMessage({ id: 'changePasswordTips' })}</div>
      </>
    ),
    formInner: () => (
      <>
        <Input name="email" label={formatMessage({ id: 'emailAccount' })} rule="REQ EMAIL" />
        <PhoneNumber name="phone" label={formatMessage({ id: 'phoneNumber' })} rule="REQ" />
        <Input.Password name="password" label={formatMessage({ id: 'loginPassword' })} rule="REQ LEN-6-50" />
        <Input.Password name="repeatPwd" label={formatMessage({ id: 'repeatNewPassword' })} rule="REQ LEN-6-50 REPEAT-newPwd" />
        <Row align={'bottom'} justify={'space-between'}>
          <Col className={style['code-field']}>
            <Input name="verificationCode" label={formatMessage({ id: 'verificationCode' })} rule="REQ LEN-6" />
          </Col>
          <Col>
            <Button className={style['get-code']} type={'link'}>
              {formatMessage({ id: 'getVerificationCode' })}
            </Button>
          </Col>
        </Row>
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

Register.defaultProps = {
  render: components => components
};

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <Register {...props} />
    </IntlProvider>
  );
});
