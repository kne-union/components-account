const { default: Tenant } = _Tenant;
const { default: LoginOuterContainer } = _LoginOuterContainer;
const { range } = lodash;
const BaseExample = () => {
  return (
    <LoginOuterContainer className="outer">
      <Tenant
        data={range(0, 20).map(key => ({ id: key, name: `测试公司${key + 1}` }))}
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
