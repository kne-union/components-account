import { createWithRemoteLoader } from '@kne/remote-loader';
import PermissionPanel from '../../Permission/PermissionPanel';
import Fetch from '@kne/react-fetch';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { App } from 'antd';
import get from 'lodash/get';

const Permission = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(
  forwardRef(({ remoteModules, tenantId }, ref) => {
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
              Object.assign({}, apis.account.saveTenantPermissionList, {
                data: Object.assign({}, { tenantId }, fetchRef.current.data)
              })
            );

            if (resData.code !== 0) {
              return;
            }
            message.success('租户权限设置成功');
          }
        };
      },
      [ajax, apis.account.saveTenantPermissionList, message, tenantId]
    );
    return (
      <Fetch
        {...Object.assign({}, apis.account.getTenantPermissionList, {
          params: { tenantId }
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
