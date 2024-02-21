
# Login


### 概述

登录窗口


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
- _Login(@components/Login),_LoginOuterContainer(@components/LoginOuterContainer),router(react-router-dom)

```jsx
const {default: Login} = _Login;
const {default: LoginOuterContainer} = _LoginOuterContainer;
const {useLocation} = router;
const BaseExample = () => {
    const location = useLocation();
    const list = location.pathname.split('/');
    const baseUrl = list.slice(0, list.indexOf('Login') + 1).join('/') + '/account';
    return <LoginOuterContainer className="outer"><Login baseUrl={baseUrl}/></LoginOuterContainer>;
};

render(<BaseExample/>);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

