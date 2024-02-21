import LoginOuterContainer from '@components/LoginOuterContainer';
import ForgetComponent from '@components/Forget';
import merge from 'lodash/merge';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { useProps } from '../../common/context';

const Forget = createWithRemoteLoader({
  modules: ['component-core:Global@usePreset']
})(({ remoteModules }) => {
  const [usePreset] = remoteModules;
  const { apis: presetApis, ajax } = usePreset();
  const { apis } = useProps();
  const account = Object.assign({}, presetApis?.account, apis);
  return (
    <LoginOuterContainer>
      <ForgetComponent
        onSubmit={(formData, success) => {
          return ajax(
            merge({}, account, {
              data: { email: formData.email }
            })
          ).then(({ data }) => {
            if (data.code === 0) {
              success && success(formData.email);
            }
          });
        }}
      />
    </LoginOuterContainer>
  );
});

export default Forget;
