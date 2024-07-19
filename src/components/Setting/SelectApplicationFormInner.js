import { createWithRemoteLoader } from '@kne/remote-loader';
import { Button, App } from 'antd';
import ApplicationFormInner from './ApplicationFormInner';

const SelectApplication = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset', 'components-core:FormInfo@useFormModal']
})(({ remoteModules, single, apis }) => {
  const [FormInfo, usePreset, useFormModal] = remoteModules;
  const { ajax } = usePreset();
  const formModal = useFormModal();
  const { message } = App.useApp();
  const { AdvancedSelect } = FormInfo.fields;
  return (
    <FormInfo
      column={1}
      list={[
        <AdvancedSelect
          name={single ? 'applicationId' : 'applicationIds'}
          label="应用"
          rule="REQ"
          api={apis.getApplicationList}
          single={single}
          extra={({ context }) => (
            <Button
              type="link"
              onClick={() => {
                const modalApi = formModal({
                  title: '添加应用',
                  size: 'small',
                  children: <ApplicationFormInner />,
                  formProps: {
                    onSubmit: async data => {
                      const { data: resData } = await ajax(
                        Object.assign({}, apis.addApplication, {
                          data: Object.assign({}, data)
                        })
                      );
                      if (resData.code !== 0) {
                        return;
                      }
                      message.success('添加应用成功');
                      context.fetchApi.reload();
                      modalApi.close();
                    }
                  }
                });
              }}
            >
              添加应用
            </Button>
          )}
          dataFormat={data => ({
            list: (data || []).map(item => ({
              value: item.id,
              label: item.name
            })),
            total: data?.length || 0
          })}
        />
      ]}
    />
  );
});

export default SelectApplication;
