import { createWithRemoteLoader } from '@kne/remote-loader';

const SelectApplication = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [FormInfo, usePreset] = remoteModules;
  const { apis } = usePreset();
  const { AdvancedSelect } = FormInfo.fields;
  return (
    <FormInfo
      column={1}
      list={[
        <AdvancedSelect
          name="applicationIds"
          label="应用"
          rule="REQ"
          api={apis.account.getApplicationList}
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
