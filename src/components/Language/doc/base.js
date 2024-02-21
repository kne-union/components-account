const { default: Language } = _Language;
const { Space } = antd;
const BaseExample = () => {
  return (
    <Space>
      <Language />
      <div
        style={{
          padding: '0 10px',
          background: 'var(--primary-color)'
        }}
      >
        <Language colorful />
      </div>
    </Space>
  );
};

render(<BaseExample />);
