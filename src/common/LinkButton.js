import React from 'react';
import useNavigate from './useNavigate';
import { Button } from 'antd';

const LinkButton = ({ to, state, replace, ...props }) => {
  const navigate = useNavigate();
  return (
    <Button
      {...props}
      onClick={() => {
        navigate(to, { replace, state });
      }}
    />
  );
};

export default LinkButton;
