import { createWithRemoteLoader } from '@kne/remote-loader';
import Fetch from '@kne/react-fetch';
import { Flex } from 'antd';
import get from 'lodash/get';
import dayjs from 'dayjs';

import style from './style.module.scss';

const Overview = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:Global@useGlobalContext', 'components-core:Global@usePreset']
})(({ remoteModules, menu }) => {
  const [Page, useGlobalContext, usePreset] = remoteModules;
  const {
    global: { tenant }
  } = useGlobalContext('userInfo');
  const { apis } = usePreset();

  return (
    <Page name="setting-overview" title="总览" menu={menu}>
      {tenant.id ? (
        <Fetch
          {...Object.assign({}, apis.account.getUserTenant)}
          params={{ id: tenant.id }}
          render={({ data: { currentTenant, tenantUserList }, reload }) => {
            return (
              <div className={style['overview-page']}>
                <Flex vertical gap={24}>
                  {[
                    { label: '租户名称', value: get(currentTenant, 'name') },
                    { label: '租户服务时间', value: dayjs(get(currentTenant, 'serviceStartTime')).format('YYYY-MM-DD') + ' ~ ' + dayjs(get(currentTenant, 'serviceEndTime')).format('YYYY-MM-DD') },
                    { label: '租户人数', value: get(currentTenant, 'accountNumber') + '人' },
                    { label: '当前人数', value: get(tenantUserList, 'length') + '人' }
                  ].map(({ label, value }) => (
                    <Flex gap={8}>
                      {label}：{value}
                    </Flex>
                  ))}
                </Flex>
              </div>
            );
          }}
        />
      ) : null}
    </Page>
  );
});

export default Overview;
