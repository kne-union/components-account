import { createWithRemoteLoader } from '@kne/remote-loader';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, treeData }) => {
  const [FormInfo] = remoteModules;
  const { Input, TreeSelect } = FormInfo.fields;

  return (
    <FormInfo
      column={1}
      list={[
        <Input name="name" label="组织名称" rule="REQ LEN-0-50" />,
        <Input name="enName" label="组织英文名" rule="LEN-0-50" />,
        <TreeSelect
          name="pid"
          label="上级组织"
          rule="REQ"
          fieldNames={{
            value: 'id',
            label: 'name',
            children: 'children'
          }}
          treeData={treeData}
          showSearch
          treeNodeFilterProp="name"
        >
          {({ data }) => {
            const { pageData } = data;
            return { treeData: Array.isArray(pageData) ? pageData || [] : [pageData] };
          }}
        </TreeSelect>
      ]}
    />
  );
});

export default FormInner;
