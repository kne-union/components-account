import Modify from '@components/Modify';
import { createWithRemoteLoader } from '@kne/remote-loader';
import commonStyle from '../../common/common.module.scss';
import importMessages, { moduleName } from '../../locale';
import { Button } from 'antd';
import useNavigate from '../../common/useNavigate';
import { useBaseUrl } from '../../common/context';

const ResetPassword = createWithRemoteLoader({
  modules: ['components-core:Intl@useIntl', 'components-core:Icon']
})(({ remoteModules, baseUrl: baseUrlProp, render, ...props }) => {
  const [useIntl, Icon] = remoteModules;
  const { formatMessage } = useIntl({ moduleName });
  const navigate = useNavigate();
  const baseUrl = useBaseUrl(baseUrlProp);
  return (
    <Modify
      {...props}
      isReset
      render={components => {
        return render(
          Object.assign({}, components, {
            title: () => (
              <>
                {formatMessage({ id: 'setNewPassword' })}
                <div className={commonStyle['reset-new-desc']}>{formatMessage({ id: 'setNewPasswordTips' })}</div>
              </>
            ),
            formOuter: props => (
              <>
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
                {components.formOuter(props)}
              </>
            )
          })
        );
      }}
    />
  );
});

ResetPassword.defaultProps = {
  render: components => components
};

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <ResetPassword {...props} />
    </IntlProvider>
  );
});
