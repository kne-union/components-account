
# Tenant


### 概述

租户选择


### 示例(全屏)


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
- _Tenant(@components/Tenant),_LoginOuterContainer(@components/LoginOuterContainer),lodash(lodash)

```jsx
const {default: Tenant} = _Tenant;
const {default: LoginOuterContainer} = _LoginOuterContainer;
const {range} = lodash;
const BaseExample = () => {
    return <LoginOuterContainer className="outer">
        <Tenant data={range(0, 20).map((key) => ({id: key, name: `测试公司${key + 1}`}))} onBack={() => {
            console.log("返回");
        }} onChange={({coid}) => {
            console.log(coid);
        }}/>
    </LoginOuterContainer>;
};

render(<BaseExample/>);

```

- 租户列表为空的情况
- 租户列表为空的情况
- _Tenant(@components/Tenant),_LoginOuterContainer(@components/LoginOuterContainer)

```jsx
const {default: Tenant} = _Tenant;
const {default: LoginOuterContainer} = _LoginOuterContainer;
const BaseExample = () => {
    return <LoginOuterContainer className="outer">
        <Tenant data={[]} onBack={() => {
            console.log("返回");
        }} onChange={({coid}) => {
            console.log(coid);
        }}/>
    </LoginOuterContainer>;
};

render(<BaseExample/>);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

