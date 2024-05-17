import LinkButton from '../../common/LinkButton';
import classnames from 'classnames';
import { Space } from 'antd';
import { useState } from 'react';
import commonStyle from '../../common/common.module.scss';
import style from './style.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { useBaseUrl } from '../../common/context';
import importMessages, { moduleName } from '../../locale';

const Forget = createWithRemoteLoader({
  modules: ['component-core:FormInfo@formModule', 'components-core:Intl@useIntl', 'components-core:Icon']
})(({ remoteModules, onSubmit, baseUrl: baseUrlProp, render }) => {
  const [formModule, useIntl, Icon] = remoteModules;
  const { Form, Input, SubmitButton } = formModule;
  const baseUrl = useBaseUrl(baseUrlProp);
  const { formatMessage } = useIntl({ moduleName });
  const [resultEmail, setResultEmail] = useState('');

  const { navigator, title, successInfo, footer, formInner, formOuter, successOuter } = render({
    navigator: () => (
      <LinkButton className={commonStyle['back-link']} type="link" size="large" to={`${baseUrl}/login`}>
        <Icon type="arrow-thin-left" />
        {formatMessage({ id: 'returnToLogin' })}
      </LinkButton>
    ),
    title: () => formatMessage({ id: 'resetPassword' }),
    successInfo: () => (
      <>
        <div>{formatMessage({ id: 'resetLinkTips1' }, { resultEmail })}</div>
        <div>{formatMessage({ id: 'resetLinkTips2' })}</div>
      </>
    ),
    footer: () => (
      <SubmitButton block size="large">
        {formatMessage({ id: 'nextStep' })}
      </SubmitButton>
    ),
    formInner: () => <Input name="email" label={formatMessage({ id: 'emailAccount' })} rule="REQ EMAIL" />,
    formOuter: ({ navigator, title, footer, formInner }) => (
      <Form
        type="inner"
        size="large"
        onSubmit={formData => {
          onSubmit &&
            onSubmit(formData, () => {
              setResultEmail(formData.email);
            });
        }}
      >
        {navigator}
        <Space className={classnames(style['main'], 'space-full')} direction="vertical" size={40}>
          <div className={commonStyle['title']}>{title}</div>
          <Space className={classnames('space-full', style['forget-input'])} direction="vertical">
            {formInner}
          </Space>
          <Space className="space-full" direction="vertical">
            {footer}
          </Space>
        </Space>
      </Form>
    ),
    successOuter: ({ navigator, title, successInfo }) => (
      <>
        {navigator}
        <Space className={classnames(style['main'], 'space-full')} direction="vertical" size={40}>
          <div className={commonStyle['title']}>{title}</div>
          <div className={style['success-info']}>{successInfo}</div>
        </Space>
      </>
    )
  });
  const navigatorComponent = navigator(),
    titleComponent = title();
  if (resultEmail) {
    const successInfoComponent = successInfo();
    return successOuter({
      navigator: navigatorComponent,
      title: titleComponent,
      successInfo: successInfoComponent
    });
  }
  const footerComponent = footer(),
    formInnerComponent = formInner();
  return formOuter({
    navigator: navigatorComponent,
    title: titleComponent,
    footer: footerComponent,
    formInner: formInnerComponent
  });
});

Forget.defaultProps = {
  render: components => components
};

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <Forget {...props} />
    </IntlProvider>
  );
});
