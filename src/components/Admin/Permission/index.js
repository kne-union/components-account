import { createWithRemoteLoader } from '@kne/remote-loader';
import { App, Button } from 'antd';
import { useRef } from 'react';
import ApplicationFormInner from './ApplicationFormInner';
import PermissionPanel from './PermissionPanel';

const Permission = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset']
})(({ remoteModules, value, isEdit }) => {
  const [Page, useFormModal, usePreset] = remoteModules;
  const { ajax, apis } = usePreset();
  const { message } = App.useApp();
  const formModal = useFormModal();
  const appRef = useRef(null);
  return (
    <Page
      title="应用权限管理"
      titleExtra={
        <Button
          type="primary"
          onClick={() => {
            const formApi = formModal({
              title: '添加应用',
              size: 'small',
              formProps: {
                onSubmit: async data => {
                  const { data: resData } = await ajax(
                    Object.assign({}, apis.account.addApplication, {
                      data
                    })
                  );
                  if (resData.code !== 0) {
                    return;
                  }
                  message.success('添加应用成功');
                  appRef.current.reload();
                  formApi.close();
                }
              },
              children: <ApplicationFormInner />
            });
          }}
        >
          添加应用
        </Button>
      }
    >
      <PermissionPanel ref={appRef} isEdit={isEdit} value={value} />
    </Page>
  );
});

export default Permission;
