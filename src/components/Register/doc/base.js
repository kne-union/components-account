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
