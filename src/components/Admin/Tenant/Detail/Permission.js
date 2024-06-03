import PermissionInner from '../Permission';
import { Flex, Button } from 'antd';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { useRef } from 'react';

const Permission = createWithRemoteLoader({
  modules: ['components-core:ConfirmButton']
})(({ remoteModules, ...props }) => {
  const [ConfirmButton] = remoteModules;
  const ref = useRef(null);
  return (
    <Flex vertical gap={8}>
      <Flex justify="space-between">
        <div></div>
        <ConfirmButton
          type="primary"
          message="确定要修改该租户的权限配置吗?"
          isDelete={false}
          onClick={() => {
            return ref.current.onSubmit();
          }}
        >
          修改权限
        </ConfirmButton>
      </Flex>
      <PermissionInner {...props} ref={ref} />
    </Flex>
  );
});

export default Permission;
