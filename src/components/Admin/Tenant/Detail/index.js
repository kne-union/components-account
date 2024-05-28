import { createWithRemoteLoader } from '@kne/remote-loader';
import { useParams, useSearchParams } from 'react-router-dom';
import Fetch from '@kne/react-fetch';
import dayjs from 'dayjs';

import Role from '../Role';
import Organization from '../Organization';

const BaseInfo = createWithRemoteLoader({
  modules: ['components-core:InfoPage', 'components-core:Descriptions', 'components-core:Enum']
})(({ data, remoteModules }) => {
  const [InfoPage, Descriptions] = remoteModules;
  return (
    <InfoPage>
      <InfoPage.Part title="基本信息">
        <Descriptions
          dataSource={[
            [
              { label: '租户名称', content: data.name },
              {
                label: '账号数量',
                content: data.accountNumber
              }
            ],
            [
              { label: '服务开始时间', content: dayjs(data.serviceStartTime).format('YYYY-MM-DD') },
              {
                label: '服务结束时间',
                content: dayjs(data.serviceEndTime).format('YYYY-MM-DD')
              }
            ],
            [
              {
                label: '简介',
                content: data.description
              }
            ]
          ]}
        />
      </InfoPage.Part>
    </InfoPage>
  );
});

const detailMap = {
  baseInfo: BaseInfo,
  role: Role,
  org: Organization
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
            <DetailInner data={data} />
          </StateBarPage>
        );
      }}
    />
  );
});

export default Detail;
