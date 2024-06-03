import { createWithRemoteLoader } from '@kne/remote-loader';

const ApplicationFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  const { Input, Avatar, TextArea } = FormInfo.fields;
  return (
    <FormInfo
      column={1}
      list={[
        <Avatar name="avatar" label="应用图标" interceptor="photo-string" />,
        <Input name="name" label="应用名称" rule="REQ" />,
        <Input name="code" label="Code" tips="一般为应用名称得英文缩写" rule="REQ" />,
        <Input name="url" label="应用主页" />,
        <TextArea name="description" />
      ]}
    />
  );
});

export default ApplicationFormInner;
