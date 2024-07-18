import { createWithRemoteLoader } from '@kne/remote-loader';
import { getUserColumns, UserListOptions } from '@components/Setting';

const User = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Global@usePreset', 'components-core:Filter']
})(({ remoteModules, menu }) => {
  const [TablePage, usePreset, Filter] = remoteModules;
  const { getFilterValue } = Filter;
  const { apis } = usePreset();
  return (
    <UserListOptions apis={apis.account.tenant}>
      {({ ref, filter, topOptions, optionsColumn }) => {
        return (
          <TablePage
            {...Object.assign({}, apis.account.tenant.getTenantUserList, { params: { filter: getFilterValue(filter.value) } })}
            ref={ref}
            pagination={{ paramsType: 'params' }}
            columns={[...getUserColumns(), optionsColumn]}
            name="setting-user"
            page={{
              title: '用户管理',
              menu,
              filter,
              titleExtra: topOptions
            }}
          />
        );
      }}
    </UserListOptions>
  );
});

export default User;
