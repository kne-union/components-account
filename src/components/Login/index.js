import style from './style.module.scss';
import { Checkbox, Col, Row, Space } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import LinkButton from '../../common/LinkButton';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { useBaseUrl } from '../../common/context';
import importMessages, { moduleName } from '../../locale';
import commonStyle from '../../common/common.module.scss';

const LOGIN_REMEMBER_ACCOUNT = 'LOGIN_REMEMBER_ACCOUNT';

const Login = createWithRemoteLoader({
  modules: ['component-core:FormInfo@formModule', 'components-core:Intl@useIntl']
})(({ remoteModules, onSubmit, baseUrl: baseUrlProp, render }) => {
  const [formModule, useIntl] = remoteModules;
  const { Form, Input, SubmitButton } = formModule;
  const baseUrl = useBaseUrl(baseUrlProp);
  const [rememberUser, setRememberUser] = useState(false);
  const formRef = useRef(null);
  const localEmail = useMemo(() => window.localStorage.getItem(LOGIN_REMEMBER_ACCOUNT), []);
  const { formatMessage } = useIntl({ moduleName });
  useEffect(() => {
    if (localEmail) {
      setRememberUser(true);
    }
  }, [localEmail]);

  const { footer, formOuter, formInner, title } = render({
    title: () => formatMessage({ id: 'login' }),
    footer: () => (
      <>
        <SubmitButton block size="large">
          {formatMessage({ id: 'login' })}
        </SubmitButton>
        <Row justify="space-between">
          <Col>
            <Checkbox
              checked={rememberUser}
              onChange={e => {
                setRememberUser(e.target.checked);
              }}
            >
              {formatMessage({ id: 'rememberAccount' })}
            </Checkbox>
          </Col>
          <Col>
            <LinkButton className={style['forget-button']} type="link" size="small" to={`${baseUrl}/forget`}>
              {formatMessage({ id: 'forgotPassword' })}
            </LinkButton>
          </Col>
        </Row>
      </>
    ),
    formOuter: ({ formInner, footer, title }) => (
      <Form
        ref={formRef}
        type="inner"
        size="large"
        data={
          localEmail
            ? {
                email: localEmail
              }
            : {}
        }
        enterSubmit
        onSubmit={formData => {
          if (rememberUser) {
            window.localStorage.setItem(LOGIN_REMEMBER_ACCOUNT, formData.email);
          } else {
            window.localStorage.removeItem(LOGIN_REMEMBER_ACCOUNT);
          }
          onSubmit && onSubmit(formData);
        }}
      >
        <Space className="space-full" size={38} direction="vertical">
          <div className={commonStyle['title']}>{title}</div>
          <div>{formInner}</div>
        </Space>
        <Space className="space-full" size={10} direction="vertical">
          {footer}
        </Space>
      </Form>
    ),
    formInner: () => (
      <>
        <Input name="username" label={formatMessage({ id: 'emailAccount' })} rule="REQ EMAIL" />
        <Input.Password type="password" name="password" label={formatMessage({ id: 'password' })} rule="REQ LEN-6-50" />
      </>
    )
  });

  const footerComponent = footer(),
    formInnerComponent = formInner(),
    titleComponent = title();
  return formOuter({ title: titleComponent, formInner: formInnerComponent, footer: footerComponent });
});

Login.defaultProps = {
  render: components => components
};

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <Login {...props} />
    </IntlProvider>
  );
});
