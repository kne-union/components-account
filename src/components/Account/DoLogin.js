import { createWithRemoteLoader } from '@kne/remote-loader';
import { useSearchParams } from 'react-router-dom';
import merge from 'lodash/merge';
import { App } from 'antd';
import { moduleName } from '../../locale';
import md5 from 'md5';
import { useProps } from '../../common/context';
import { setCookies } from '../../common/cookies';
import useNavigate from '../../common/useNavigate';

const DoLogin = createWithRemoteLoader({
  modules: ['component-core:Global@usePreset', 'components-core:Intl@useIntl']
})(({ remoteModules, children }) => {
  const [usePreset, useIntl] = remoteModules;
  const { apis: presetApis, ajax } = usePreset();
  const { apis, targetUrl, storeKeys } = useProps();
  const { formatMessage } = useIntl({ moduleName });
  const account = Object.assign({}, presetApis?.account, apis);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referer = searchParams.get('referer');
  return children({
    login: async ({ isTenant, ...formData }, callback) => {
      const { data: resData } = await ajax(
        merge({}, account.login, {
          data: {
            ...formData,
            password: md5(formData.password)
          }
        })
      );
      if (resData.code !== 0) {
        return;
      }
      let refererHref = targetUrl || '/';

      Object.keys(storeKeys).forEach(key => {
        resData.data[key] && setCookies(storeKeys[key], resData.data[key]);
      });

      if (referer) {
        const _referer = decodeURIComponent(referer);
        let obj = new URL(/http(s)?:/.test(_referer) ? _referer : window.location.origin + _referer);
        Object.values(resData.data).forEach(key => key && obj.searchParams.delete(key.toUpperCase()));
        refererHref = obj.pathname + obj.search;
      }
      if (!isTenant || resData.data.currentTenantId) {
        navigate(refererHref);
        return;
      }

      const { data: resTenantData } = await ajax(Object.assign({}, account.getUserTenant));
      if (resTenantData.code !== 0) {
        return;
      }
      const { tenantList } = resTenantData.data;
      callback &&
        (await Promise.resolve(
          callback({
            referer: refererHref,
            tenantList
          })
        ));
      message.success(formatMessage({ id: 'loginSuccess' }));
    }
  });
});

export default DoLogin;
