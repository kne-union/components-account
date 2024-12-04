import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex, Button, App } from 'antd';
import FormInner from './FormInner';
import { getUserColumns, UserListOptions, UserFormInner } from '@components/Setting';

const User = createWithRemoteLoader({
  modules: ['components-core:Table@TablePage', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset', 'components-core:Filter']
})(({ remoteModules, record }) => {
  const [TablePage, useFormModal, usePreset, Filter] = remoteModules;
  const { ajax, apis } = usePreset();
  const formModal = useFormModal();
  const tenantId = record.id;

  const { message } = App.useApp();
  const { fields: filterFields, getFilterValue } = Filter;
  const { AdvancedSelectFilterItem } = filterFields;
  return (
    <UserListOptions
      apis={apis.account.admin}
      tenantId={tenantId}
      topOptionsSize="small"
      topOptionsChildren={({ ref }) => (
        <>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              const formApi = formModal({
                title: '添加租户用户',
                size: 'small',
                formProps: {
                  onSubmit: async data => {
                    const { data: resData } = await ajax(
                      Object.assign({}, apis.account.admin.addTenantUser, {
                        data: Object.assign({}, data, { tenantId })
                      })
                    );
                    if (resData.code !== 0) {
                      return;
                    }
                    message.success('添加成功');
                    formApi.close();
                    ref.current.reload();
                  }
                },
                children: (
                  <>
                    <FormInner />
                    <UserFormInner tenantId={tenantId} apis={apis.account.admin} />
                  </>
                )
              });
            }}
          >
            添加租户用户
          </Button>
        </>
      )}
    >
      {({ ref, filter, topOptions, optionsColumn }) => {
        return (
          <Flex vertical gap={8} flex={1}>
            <Filter
              {...Object.assign({}, filter, {
                list: [
                  [
                    ...filter.list[0].slice(0, 2),
                    <AdvancedSelectFilterItem
                      label="状态"
                      name="status"
                      single
                      api={{
                        loader: () => {
                          return {
                            pageData: [
                              { label: '正常', value: 0 },
                              { label: '已关闭', value: 12 }
                            ]
                          };
                        }
                      }}
                    />,
                    <AdvancedSelectFilterItem
                      label="角色"
                      name="tenantRoles"
                      api={Object.assign({}, apis.account.admin.getTenantRoleList, {
                        params: { tenantId, withoutDefaultRole: true }
                      })}
                      dataFormat={({ pageData = [], totalCount }) => ({
                        list: (pageData || []).map(item => ({
                          label: item.name || '-',
                          value: item.id
                        })),
                        total: totalCount
                      })}
                    />
                  ]
                ]
              })}
              extra={topOptions}
              className="page-filter"
            />
            <TablePage
              {...Object.assign({}, apis.account.admin.getTenantUserList, {
                params: Object.assign({}, { tenantId, filter: getFilterValue(filter.value) })
              })}
              name="tenant-user-list"
              pagination={{ paramsType: 'params' }}
              ref={ref}
              columns={[...getUserColumns(), optionsColumn]}
            />
          </Flex>
        );
      }}
    </UserListOptions>
  );
});

export default User;
