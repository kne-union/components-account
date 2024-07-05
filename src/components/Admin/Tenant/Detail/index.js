import { createWithRemoteLoader } from '@kne/remote-loader';
import { useParams, useSearchParams } from 'react-router-dom';
import Fetch from '@kne/react-fetch';
import { App } from 'antd';
import BaseInfo from '../BaseInfo';
import Role from '../Role';
import Organization from '../Organization';
import Permission from './Permission';
import FormInner from '../FormInner';
import User from '../User';
import UserFormInner from '../User/FormInner';

const detailMap = {
  baseInfo: BaseInfo,
  role: Role,
  org: Organization,
  permission: Permission,
  user: User
};

const Detail = createWithRemoteLoader({
  modules: ['components-core:Layout@StateBarPage', 'components-view:PageHeader@PageHeaderInner', 'components-core:Global@usePreset', 'components-core:FormInfo@useFormModal']
})(({ remoteModules }) => {
  const [StateBarPage, PageHeader, usePreset, useFormModal] = remoteModules;
  const { apis, ajax } = usePreset();
  const formModal = useFormModal();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get('tab') || 'baseInfo';
  const DetailInner = detailMap[activeKey];
  const { message } = App.useApp();
  const renderWithTenantInfo = children => {
    return <Fetch cache="tenant-info" {...Object.assign({}, apis.account.getTenantInfo, { params: { id } })} render={({ data: tenant, reload }) => children({ tenant, reload })} />;
  };
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
          { tab: '组织架构', key: 'org' } /*, {tab: '共享组', key: 'shareGroup'}*/,
          {
            tab: '租户用户',
            key: 'user'
          }
        ]
      }}
      header={renderWithTenantInfo(({ tenant, reload }) => (
        <PageHeader
          title={tenant.name}
          info={`编号:${tenant.id}`}
          buttonOptions={{
            list: [
              {
                children: '编辑',
                type: 'primary',
                onClick: () => {
                  const api = formModal({
                    title: '编辑租户信息',
                    size: 'small',
                    children: <FormInner />,
                    formProps: {
                      data: Object.assign({}, tenant),
                      onSubmit: async data => {
                        const { data: resData } = await ajax(
                          Object.assign({}, apis.account.saveTenant, {
                            data: Object.assign({}, data, { id: tenant.id })
                          })
                        );
                        if (resData.code !== 0) {
                          return;
                        }
                        message.success('租户信息修改成功');
                        api.close();
                        reload();
                      }
                    }
                  });
                }
              },
              {
                children: '添加租户用户',
                onClick: () => {
                  const formApi = formModal({
                    title: '添加租户用户',
                    size: 'small',
                    formProps: {
                      onSubmit: async data => {
                        const { data: resData } = await ajax(
                          Object.assign({}, apis.account.addTenantUser, {
                            data: Object.assign({}, data, { tenantId: tenant.id })
                          })
                        );
                        if (resData.code !== 0) {
                          return;
                        }
                        message.success('添加成功');
                        formApi.close();
                      }
                    },
                    children: <UserFormInner tenantId={tenant.id} />
                  });
                }
              },
              {
                children: '禁用'
              },
              {
                children: '关闭'
              }
            ]
          }}
        />
      ))}
    >
      {renderWithTenantInfo(({ tenant }) => (
        <DetailInner record={tenant} tenantId={tenant.id} />
      ))}
    </StateBarPage>
  );
});

export default Detail;
