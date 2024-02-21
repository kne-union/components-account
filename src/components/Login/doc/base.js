const { default: Login } = _Login;
const { default: LoginOuterContainer } = _LoginOuterContainer;
const { useLocation } = router;
const BaseExample = () => {
  const location = useLocation();
  const list = location.pathname.split('/');
  const baseUrl = list.slice(0, list.indexOf('Login') + 1).join('/') + '/account';
  return (
    <LoginOuterContainer className="outer">
      <Login baseUrl={baseUrl} />
    </LoginOuterContainer>
  );
};

render(<BaseExample />);
