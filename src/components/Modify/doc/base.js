const { default: Modify } = _Modify;
const BaseExample = () => {
  return (
    <Modify
      className="outer"
      email="test@test.com"
      onSubmit={data => {
        console.log(data);
      }}
    />
  );
};

render(<BaseExample />);
