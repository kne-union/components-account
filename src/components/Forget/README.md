
# Forget


### 概述

忘记密码


### 示例


#### 示例样式

```scss
.example-driver-preview {
  background: var(--primary-color);
}

.outer {
  margin: 0 auto;
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Forget(@components/Forget),router(react-router-dom),_LoginOuterContainer(@components/LoginOuterContainer)

```jsx
const { default: Forget } = _Forget;
const { default: LoginOuterContainer } = _LoginOuterContainer;
const { useLocation } = router;
const BaseExample = () => {
  const location = useLocation();
  const list = location.pathname.split('/');
  const baseUrl = list.slice(0, list.indexOf('Forget') + 1).join('/') + '/account';
  return (
    <LoginOuterContainer className="outer">
      <Forget
        baseUrl={baseUrl}
        onSubmit={(data, callback) => {
          console.log(data);
          callback();
        }}
      />
    </LoginOuterContainer>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

