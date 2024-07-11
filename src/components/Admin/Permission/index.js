import { createWithRemoteLoader } from '@kne/remote-loader';
import { App, Button, Space } from 'antd';
import { useRef } from 'react';
import ApplicationFormInner from './ApplicationFormInner';
import PermissionPanel from './PermissionPanel';
import SelectApplication from './FormInner/SelectApplication';
import saveJSON from '../../../common/saveJSON';

import style from './style.module.scss';
import uniqueId from 'lodash/uniqueId';

const Permission = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset', 'components-core:FormInfo']
})(({ remoteModules, value, isEdit }) => {
  const [Page, useFormModal, usePreset, FormInfo] = remoteModules;
  const { ajax, ajaxPostForm, apis } = usePreset();
  const { message } = App.useApp();
  const formModal = useFormModal();
  const { Upload } = FormInfo.fields;
  const appRef = useRef(null);
  return (
    <Page
      title="应用权限管理"
      titleExtra={
        <Space>
          <div className={style['upload-btn']}>
            <Upload.Field
              block
              showUploadList={false}
              multiple={false}
              name="attachmentIds"
              labelHidden
              label="上传文件并解析"
              rule="REQ"
              interceptor="file-format"
              uploadText="上传文件并解析"
              renderTips={() => null}
              accept={['.json']}
              ossUpload={async ({ file }) => {
                const { data: resData } = await ajaxPostForm(apis.account.parsePermissionList.url, { file });
                if (resData.code !== 0) {
                  message.error('文件解析错误');
                  return;
                }
                message.success('导入应用权限成功');
                appRef.current.reload();
                return { data: { code: 0, data: { filename: file.filename, id: uniqueId('file-') } } };
              }}
            >
              导入应用权限
            </Upload.Field>
          </div>
          <Button
            onClick={() => {
              const formApi = formModal({
                title: '导出应用权限',
                size: 'small',
                formProps: {
                  onSubmit: async data => {
                    const { data: resData } = await ajax(
                      Object.assign({}, apis.account.exportPermissionList, {
                        data
                      })
                    );
                    if (resData.code !== 0) {
                      return;
                    }
                    saveJSON(resData.data, '应用权限.json');
                    formApi.close();
                  }
                },
                children: <SelectApplication />
              });
            }}
          >
            导出应用权限
          </Button>
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
        </Space>
      }
    >
      <PermissionPanel ref={appRef} isEdit={isEdit} value={value} />
    </Page>
  );
});

export default Permission;
