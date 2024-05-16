
# Register


### 概述

注册账户


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
- _Register(@components/Register)

```jsx
const { default: Register } = _Register;
const BaseExample = () => {
  return (
    <Register
      className="outer"
      onSubmit={data => {
        console.log(data);
      }}
    />
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

