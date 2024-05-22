import { createWithRemoteLoader } from '@kne/remote-loader';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@formModule']
})(({ remoteModules }) => {
  const [FormInfo, formModule] = remoteModules;
  const { Input } = formModule;
  return <FormInfo column={1} list={[<Input allowClear name="nickname" label="昵称" rule="LEN-0-100" />]} />;
});

export default FormInner;
