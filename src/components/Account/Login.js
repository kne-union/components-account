import { useState, useRef } from 'react';
import LoginOuterContainer from '@components/LoginOuterContainer';
import LoginComponent from '@components/Login';
import LoginTenant from '@components/Tenant';
import DoLogin from './DoLogin';
import Language from '@components/Language';
import { useProps } from '../../common/context';
import useNavigate from '../../common/useNavigate';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { setCookies } from '../../common/cookies';
import style from './style.module.scss';

const Login = createWithRemoteLoader({
  modules: ['component-core:Global@useGlobalContext']
})(({ remoteModules }) => {
  const [useGlobalContext] = remoteModules;
  const navigate = useNavigate();
  const { headerKeys, language, baseUrl } = useProps();
  const refererRef = useRef(baseUrl);
  const [tenantList, setTenantList] = useState([]);
  const { global: locale, setGlobal: setLocale } = useGlobalContext('locale');
  return (
    <LoginOuterContainer>
      <DoLogin>
        {({ login }) => {
          if (tenantList.length > 0) {
            return (
              <LoginTenant
                data={tenantList}
                onChange={({ tenantId }) => {
                  setCookies(headerKeys['tenantId'], tenantId);
                  const decodeReferer = refererRef.current ? refererRef.current : baseUrl;
                  navigate(decodeReferer);
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
                await login(formData, ({ talentList, referer }) => {
                  refererRef.current = referer;
                  setTenantList(talentList);
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
