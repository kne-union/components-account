import { createWithRemoteLoader } from '@kne/remote-loader';
import { getRoleColumns, RoleListOptions } from '@components/Setting';

const Role = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Global@usePreset']
})(({ remoteModules, menu }) => {
  const [TablePage, usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <RoleListOptions apis={apis.account.tenant}>
      {({ topOptions, optionsColumn, ref }) => {
        return (
          <TablePage
            {...Object.assign({}, apis.account.tenant.getTenantRoleList)}
            columns={[...getRoleColumns(), optionsColumn]}
            name="setting-role"
            ref={ref}
            page={{
              title: '角色管理',
              menu,
              titleExtra: topOptions
            }}
          />
        );
      }}
    </RoleListOptions>
  );
});

export default Role;
