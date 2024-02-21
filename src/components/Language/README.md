
# Language


### 概述

用于系统中英文切换


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Language(@components/Language),antd(antd)

```jsx
const { default: Language } = _Language;
const { Space } = antd;
const BaseExample = () => {
  return (
    <Space>
      <Language />
      <div
        style={{
          padding: "0 10px",
          background: "var(--primary-color)",
        }}
      >
        <Language colorful />
      </div>
    </Space>
  );
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

