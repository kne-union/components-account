import { createWithRemoteLoader } from '@kne/remote-loader';
import OrgTreeSelect from './OrgTreeSelect';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, tenantId, record = {} }) => {
  const [FormInfo] = remoteModules;
  const { Input } = FormInfo.fields;

  return (
    <FormInfo
      column={1}
      list={[
        <Input name="name" label="组织名称" rule="REQ LEN-0-50" />,
        <Input name="enName" label="组织英文名" rule="LEN-0-50" />,
        <OrgTreeSelect tenantId={tenantId} name="pid" label="上级组织" rule="REQ" display={Number(record.pid) !== 0 || !record.id} />
      ]}
    />
  );
});

export default FormInner;
