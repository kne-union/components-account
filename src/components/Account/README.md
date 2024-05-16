
# Account


### 概述

账号模块


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Account(@components/Account),router(react-router-dom),lodash(lodash),antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default: Account } = _Account;
const { useLocation, Routes, Route, Navigate, useNavigate } = router;
const { Space, Button, Switch } = antd;
const { createWithRemoteLoader } = remoteLoader;
const { useState } = React;
const { range } = lodash;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  const location = useLocation();
  const list = location.pathname.split('/');
  const baseUrl = list.slice(0, list.indexOf('Account') + 1).join('/') + '/account';
  const navigate = useNavigate();
  const [language, setLanguage] = useState(true);
  return (
    <PureGlobal
      preset={{
        ajax: async () => {
          return {
            headers: {
              'X-User-Id': '001',
              'X-User-Token': 'xxxxxxxxxxxx'
            },
            data: {
              code: 0,
              data: range(0, 20).map(key => ({ id: key, name: `测试公司${key + 1}` }))
            }
          };
        },
        apis: {
          account: {
            login: {
              url: '/login'
            },
            parseResetEmailToken: {
              loader: async ({ data }) => {
                console.log(data);
                const { email } = await new Promise(resolve => {
                  setTimeout(() => {
                    resolve({ email: 'test@test.com' });
                  }, 1000);
                });
                return { email };
              }
            },
            modifyPassword: {
              url: '/modifyPassword'
            }
          }
        }
      }}
    >
      <Space direction="vertical">
        <Space>
          <Button
            onClick={() => {
              navigate(`${baseUrl}/login`);
            }}
          >
            登录页面
          </Button>
          <Button
            onClick={() => {
              navigate(`${baseUrl}/forget`);
            }}
          >
            忘记密码
          </Button>
          <Button
            onClick={() => {
              navigate(`${baseUrl}/modify/${encodeURIComponent('test@test.com')}`);
            }}
          >
            修改密码
          </Button>
          <Button
            onClick={() => {
              navigate(`${baseUrl}/reset-password/:${encodeURIComponent('tokenxxxxxxxxxxxx')}`);
            }}
          >
            重置密码
          </Button>
          <Space>
            语言切换
            <Switch value={language} onChange={setLanguage} />
          </Space>
        </Space>
        <Routes>
          <Route path={baseUrl + '/*'} element={<Account baseUrl={baseUrl} language={language} />} />
          <Route path="*" element={<Navigate to={baseUrl} />} />
        </Routes>
      </Space>
    </PureGlobal>
  );
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

