const { default: Tenant } = _Tenant;
const { default: LoginOuterContainer } = _LoginOuterContainer;
const BaseExample = () => {
  return (
    <LoginOuterContainer className="outer">
      <Tenant
        data={[]}
        onBack={() => {
          console.log('返回');
        }}
        onChange={({ coid }) => {
          console.log(coid);
        }}
      />
    </LoginOuterContainer>
  );
};

render(<BaseExample />);
