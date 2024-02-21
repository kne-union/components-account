
# ResetPassword


### 概述

重置密码


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
- _ResetPassword(@components/ResetPassword),router(react-router-dom)

```jsx
const {default: ResetPassword} = _ResetPassword;
const {useLocation} = router;
const BaseExample = () => {
    const location = useLocation();
    const list = location.pathname.split('/');
    const baseUrl = list.slice(0, list.indexOf('ResetPassword') + 1).join('/') + '/account';
    return <ResetPassword className="outer" baseUrl={baseUrl}
                          email="test@test.com"
                          onSubmit={(data) => {
                              console.log(data);
                          }}/>;
};

render(<BaseExample/>);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

