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
  url: '/api/v1/account/tenant/getUserTenant',
  method: 'GET'
};

export const initSuperAdmin = {
  url: '/api/v1/account/initSuperAdmin',
  method: 'POST'
};

export const addUser = {
  url: '/api/v1/account/admin/addUser',
  method: 'POST'
};

export const getSuperAdminInfo = {
  url: '/api/v1/account/admin/getSuperAdminInfo',
  method: 'GET'
};

export const getAllUserList = {
  url: '/api/v1/account/admin/getAllUserList',
  method: 'GET'
};

export const getAllTenantList = {
  url: '/api/v1/account/admin/getAllTenantList',
  method: 'GET'
};

export const addTenant = {
  url: '/api/v1/account/admin/addTenant',
  method: 'POST'
};

export const saveTenant = {
  url: '/api/v1/account/admin/saveTenant',
  method: 'POST'
};

export const resetUserPassword = {
  url: '/api/v1/account/admin/resetUserPassword',
  method: 'POST'
};

export const saveUser = {
  url: '/api/v1/account/admin/saveUser',
  method: 'POST'
};

export const getTenantInfo = {
  url: '/api/v1/account/admin/getTenantInfo',
  method: 'GET'
};

export const getTenantRoleList = {
  url: '/api/v1/account/admin/getRoleList',
  method: 'GET'
};

export const addTenantRole = {
  url: '/api/v1/account/admin/addRole',
  method: 'POST'
};

export const saveTenantRole = {
  url: '/api/v1/account/admin/saveRole',
  method: 'POST'
};

export const remoteTenantRole = {
  url: '/api/v1/account/admin/removeRole',
  method: 'POST'
};
