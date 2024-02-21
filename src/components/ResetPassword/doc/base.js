const { default: ResetPassword } = _ResetPassword;
const { useLocation } = router;
const BaseExample = () => {
  const location = useLocation();
  const list = location.pathname.split('/');
  const baseUrl = list.slice(0, list.indexOf('ResetPassword') + 1).join('/') + '/account';
  return (
    <ResetPassword
      className="outer"
      baseUrl={baseUrl}
      email="test@test.com"
      onSubmit={data => {
        console.log(data);
      }}
    />
  );
};

render(<BaseExample />);
