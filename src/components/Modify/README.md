
# Modify


### 概述

修改密码


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
- _Modify(@components/Modify)

```jsx
const {default: Modify} = _Modify;
const BaseExample = () => {
    return <Modify
        className="outer"
        email="test@test.com"
        onSubmit={(data) => {
            console.log(data);
        }}
    />;
};

render(<BaseExample/>);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

