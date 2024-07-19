import { useState, useRef } from 'react';
import LoginOuterContainer from '@components/LoginOuterContainer';
import LoginComponent from '@components/Login';
import LoginTenant from '@components/Tenant';
import DoLogin from './DoLogin';
import Language from '@components/Language';
import { useProps } from '../../common/context';
import useNavigate from '../../common/useNavigate';
import { createWithRemoteLoader } from '@kne/remote-loader';
import style from './style.module.scss';

const Login = createWithRemoteLoader({
  modules: ['component-core:Global@useGlobalContext', 'component-core:Global@usePreset']
})(({ remoteModules }) => {
  const [useGlobalContext, usePreset] = remoteModules;
  const navigate = useNavigate();
  const { language, baseUrl, isTenant } = useProps();
  const refererRef = useRef(baseUrl);
  const [tenantList, setTenantList] = useState([]);
  const { ajax, apis: presetApis } = usePreset();
  const { apis } = useProps();
  const account = Object.assign({}, presetApis?.account, apis);
  const { global: locale, setGlobal: setLocale } = useGlobalContext('locale');
  return (
    <LoginOuterContainer>
      <DoLogin>
        {({ login }) => {
          if (isTenant && tenantList && tenantList.length > 0) {
            const setCurrentTenant = async tenantId => {
              const { data: resData } = await ajax(
                Object.assign({}, account.setCurrentTenantId, {
                  data: { tenantId }
                })
              );
              if (resData.code !== 0) {
                return;
              }
              navigate(refererRef.current ? refererRef.current : baseUrl);
            };
            if (tenantList.length === 1) {
              setCurrentTenant(tenantList[0].id);
            }
            return (
              <LoginTenant
                data={tenantList}
                onChange={({ tenantId }) => {
                  setCurrentTenant(tenantId);
                }}
                onBack={() => {
                  setTenantList([]);
                }}
              />
            );
          }
          return (
            <LoginComponent
              render={({ formOuter, ...others }) => {
                return Object.assign({}, others, {
                  formOuter: props => (
                    <>
                      {language && (
                        <Language
                          locale={locale}
                          onChange={target => {
                            setLocale(target);
                          }}
                          className={style['language']}
                        />
                      )}
                      {formOuter(props)}
                    </>
                  )
                });
              }}
              onSubmit={async formData => {
                await login(Object.assign({}, formData, { isTenant }), ({ tenantList, referer }) => {
                  refererRef.current = referer;
                  isTenant && setTenantList(tenantList);
                });
              }}
            />
          );
        }}
      </DoLogin>
    </LoginOuterContainer>
  );
});

export default Login;
