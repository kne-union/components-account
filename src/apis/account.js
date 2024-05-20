export const login = {
  url: '/api/v1/account/login',
  method: 'POST'
};

export const sendSMSCode = {
  url: '/api/v1/account/sendSMSCode',
  method: 'POST'
};

export const sendEmailCode = {
  url: '/api/v1/account/sendEmailCode',
  method: 'POST'
};

export const validateCode = {
  url: '/api/v1/account/validateCode',
  method: 'POST'
};

export const register = {
  url: '/api/v1/account/register',
  method: 'POST'
};

export const accountIsExists = {
  url: '/api/v1/account/accountIsExists',
  method: 'POST'
};

export const getUserInfo = {
  url: '/api/v1/account/getUserInfo',
  method: 'GET'
};

export const getUserTenant = {
  url: '/api/v1/account/getUserTenant',
  method: 'GET'
};

export const initSuperAdmin = {
  url: '/api/v1/account/initSuperAdmin',
  method: 'POST'
};
