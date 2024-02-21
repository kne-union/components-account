const { default: Forget } = _Forget;
const { default: LoginOuterContainer } = _LoginOuterContainer;
const { useLocation } = router;
const BaseExample = () => {
  const location = useLocation();
  const list = location.pathname.split('/');
  const baseUrl = list.slice(0, list.indexOf('Forget') + 1).join('/') + '/account';
  return (
    <LoginOuterContainer className="outer">
      <Forget
        baseUrl={baseUrl}
        onSubmit={(data, callback) => {
          console.log(data);
          callback();
        }}
      />
    </LoginOuterContainer>
  );
};

render(<BaseExample />);
