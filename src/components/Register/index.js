import { Button, Col, Row, Space } from 'antd';
import commonStyle from '../../common/common.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import VerificationCodeButton from '@components/VerificationCodeButton';
import rules from '../../common/rules';
import importMessages, { moduleName } from '../../locale';
import get from 'lodash/get';
import style from './style.module.scss';
import { useRef } from 'react';
import useNavigate from '../../common/useNavigate';
import { useBaseUrl } from '../../common/context';

const Register = createWithRemoteLoader({
  modules: ['FormInfo@formModule', 'components-core:Intl@useIntl', 'components-core:Icon']
})(({ remoteModules, baseUrl: baseUrlProp, type, sendVerificationCode, validateCode, accountIsExists, onSubmit, className, render }) => {
  const [formModule, useIntl, Icon] = remoteModules;
  const { Form, Input, SubmitButton, PhoneNumber } = formModule;
  const { formatMessage } = useIntl({ moduleName });
  const formRef = useRef(null);
  const navigate = useNavigate();
  const baseUrl = useBaseUrl(baseUrlProp);
  const { title, formInner, footer, formOuter } = render({
    title: () => <>{formatMessage({ id: 'registerAccount' })}</>,
    formInner: () => (
      <>
        {type === 'phone' ? (
          <PhoneNumber name="phone" label={formatMessage({ id: 'phoneNumber' })} rule="REQ ACCOUNT_IS_EXISTS" codeType="code" realtime interceptor="phone-number-string" />
        ) : (
          <Input name="email" label={formatMessage({ id: 'emailAccount' })} rule="REQ EMAIL ACCOUNT_IS_EXISTS" realtime />
        )}
        <Row align={'bottom'} justify={'space-between'}>
          <Col className={style['code-field']}>
            <Input name="code" label={formatMessage({ id: 'verificationCode' })} rule="REQ LEN-6 VALIDATE_CODE" />
          </Col>
          <Col>
            <VerificationCodeButton
              className={style['get-code']}
              type={'link'}
              target={{ name: type === 'phone' ? 'phone' : 'email' }}
              onClick={async () => {
                return (
                  sendVerificationCode &&
                  (await sendVerificationCode({
                    type,
                    data:
                      type === 'phone'
                        ? {
                            phone: get(formRef.current.data, 'phone')
                          }
                        : { email: get(formRef.current.data, 'email') }
                  }))
                );
              }}
            >
              {formatMessage({ id: 'getVerificationCode' })}
            </VerificationCodeButton>
          </Col>
        </Row>
        <Input.Password name="password" label={formatMessage({ id: 'password' })} rule="REQ LEN-6-50" />
        <Input.Password name="repeatPwd" label={formatMessage({ id: 'repeatNewPassword' })} rule="REQ LEN-6-50 REPEAT-password" />
      </>
    ),
    footer: () => (
      <SubmitButton block size="large">
        {formatMessage({ id: 'submit' })}
      </SubmitButton>
    ),
    formOuter: ({ title, formInner, footer, ref }) => (
      <Form
        ref={ref}
        type="inner"
        rules={Object.assign({}, rules, {
          ACCOUNT_IS_EXISTS: async (value, { field, data }) => {
            return await accountIsExists(data[field.name]);
          },
          VALIDATE_CODE: async (value, { data: formData }) => {
            return await validateCode({
              code: value,
              name: type === 'phone' ? formData.phone : formData.email,
              type: type === 'phone' ? 0 : 1
            });
          }
        })}
        size="large"
        onSubmit={onSubmit}
      >
        <Button
          className={commonStyle['back-link']}
          type="link"
          size="large"
          onClick={() => {
            navigate(`${baseUrl}/login`);
          }}
        >
          <Icon type="arrow-thin-left" />
          {formatMessage({ id: 'existingAccount' })}
        </Button>
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
  return (
    <div className={classnames(commonStyle['out-container'], className)}>
      {formOuter({
        title: titleComponent,
        formInner: formInnerComponent,
        footer: footerComponent,
        ref: formRef
      })}
    </div>
  );
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
