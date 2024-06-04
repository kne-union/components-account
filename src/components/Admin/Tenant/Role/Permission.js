import { createWithRemoteLoader } from '@kne/remote-loader';
import PermissionPanel from '../../Permission/PermissionPanel';
import Fetch from '@kne/react-fetch';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { App } from 'antd';
import get from 'lodash/get';

const Permission = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(
  forwardRef(({ remoteModules, roleId, tenantId }, ref) => {
    const [usePreset] = remoteModules;
    const { ajax, apis } = usePreset();
    const fetchRef = useRef(null);
    const { message } = App.useApp();
    useImperativeHandle(
      ref,
      () => {
        return {
          onSubmit: async () => {
            const { data: resData } = await ajax(
              Object.assign({}, apis.account.saveRolePermissionList, {
                data: Object.assign({}, { roleId }, fetchRef.current.data)
              })
            );

            if (resData.code !== 0) {
              return false;
            }
            message.success('角色权限设置成功');
          }
        };
      },
      [ajax, apis.account.saveRolePermissionList, message, roleId]
    );
    return (
      <Fetch
        {...Object.assign({}, apis.account.getRolePermissionList, {
          params: { id: roleId }
        })}
        transformData={data => {
          return {
            applications: (get(data, 'applications') || []).map(({ applicationId }) => applicationId),
            permissions: (get(data, 'permissions') || []).map(({ permissionId }) => permissionId)
          };
        }}
        ref={fetchRef}
        render={({ data, setData }) => {
          return (
            <PermissionPanel
              tenantId={tenantId}
              value={data}
              onChange={({ applications, permissions }) => {
                setData({ applications, permissions });
              }}
            />
          );
        }}
      />
    );
  })
);

export default Permission;
