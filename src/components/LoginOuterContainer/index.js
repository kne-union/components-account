import { Row, Col } from 'antd';
import classnames from 'classnames';
import style from './style.module.scss';
import commonStyle from '../../common/common.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import importMessages, { moduleName } from '../../locale';

const OuterContainer = ({ className, children }) => {
  return (
    <div className={classnames(className, commonStyle['out-container'], 'account-box')}>
      <div className={style['out-inner']}>
        <Row wrap={false}>
          <Col className={classnames(style['out-left'], 'container-left')} />
          <Col className={classnames(style['out-right'], 'container-right')} flex={1}>
            <div className={classnames(style['out-right-inner'], 'container-right-inner')}>{children}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const LoginOuterContainer = createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <OuterContainer {...props} />
    </IntlProvider>
  );
});

export default LoginOuterContainer;
