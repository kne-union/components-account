import { createWithRemoteLoader } from '@kne/remote-loader';
import { useParams, useSearchParams } from 'react-router-dom';
import Fetch from '@kne/react-fetch';

import BaseInfo from '../BaseInfo';
import Role from '../Role';
import Organization from '../Organization';
import Permission from './Permission';

const detailMap = {
  baseInfo: BaseInfo,
  role: Role,
  org: Organization,
  permission: Permission
};

const Detail = createWithRemoteLoader({
  modules: ['components-core:Layout@StateBarPage', 'components-view:PageHeader@PageHeaderInner', 'components-core:Global@usePreset', 'components-core:FormInfo@useFormModal']
})(({ remoteModules }) => {
  const [StateBarPage, PageHeader, usePreset, useFormModal] = remoteModules;
  const { apis } = usePreset();
  const formModal = useFormModal();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get('tab') || 'baseInfo';
  const DetailInner = detailMap[activeKey];

  return (
    <Fetch
      {...Object.assign({}, apis.account.getTenantInfo, { params: { id } })}
      render={({ data }) => {
        return (
          <StateBarPage
            stateBar={{
              activeKey,
              onChange: key => {
                searchParams.set('tab', key);
                setSearchParams(searchParams.toString());
              },
              stateOption: [
                { tab: '租户信息', key: 'baseInfo' },
                { tab: '租户权限', key: 'permission' },
                {
                  tab: '角色权限',
                  key: 'role'
                },
                { tab: '组织架构', key: 'org' },
                { tab: '共享组', key: 'shareGroup' },
                {
                  tab: '租户用户',
                  key: 'user'
                }
              ]
            }}
            header={
              <PageHeader
                title={data.name}
                info={`编号:${data.id}`}
                buttonOptions={{
                  list: [
                    {
                      children: '编辑',
                      onClick: () => {}
                    },
                    {
                      children: '添加公司联系人',
                      onClick: () => {}
                    },
                    {
                      children: '禁用'
                    },
                    {
                      children: '删除'
                    }
                  ]
                }}
              />
            }
          >
            <DetailInner record={data} tenantId={data.id} />
          </StateBarPage>
        );
      }}
    />
  );
});

export default Detail;
