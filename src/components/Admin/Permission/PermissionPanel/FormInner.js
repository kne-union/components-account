import { createWithRemoteLoader } from '@kne/remote-loader';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, isEdit }) => {
  const [FormInfo] = remoteModules;
  const { Input, TextArea, Switch } = FormInfo.fields;
  return (
    <FormInfo
      column={1}
      list={[
        <Input name="name" label="权限名称" rule="REQ" />,
        <Input name="code" label="权限Code" rule="REQ" disabled={isEdit} />,
        <Switch name="isModule" interceptor="boolean-number" label="是否模块" disabled={isEdit} />,
        <Switch name="isMust" label="是否必须功能" interceptor="boolean-number" />,
        <TextArea name="description" label="简介" />
      ]}
    />
  );
});

export default FormInner;
