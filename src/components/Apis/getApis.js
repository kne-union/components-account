const getApis = options => {
  const { prefix } = Object.assign({}, { prefix: '/api/v1/account' }, options);

  return {
    login: {
      url: `${prefix}/login`,
      method: 'POST'
    },
    sendSMSCode: {
      url: `${prefix}/sendSMSCode`,
      method: 'POST'
    },
    sendEmailCode: {
      url: `${prefix}/sendEmailCode`,
      method: 'POST'
    },
    modifyPassword: {
      url: `${prefix}/modifyPassword`,
      method: 'POST'
    },
    forgetPwd: {
      url: `${prefix}/forgetPwd`,
      method: 'POST'
    },
    parseResetToken: {
      url: `${prefix}/parseResetToken`,
      method: 'POST'
    },
    resetPassword: {
      url: `${prefix}/resetPassword`,
      method: 'POST'
    },
    validateCode: {
      url: `${prefix}/validateCode`,
      method: 'POST'
    },
    register: {
      url: `${prefix}/register`,
      method: 'POST'
    },
    accountIsExists: {
      url: `${prefix}/accountIsExists`,
      method: 'POST'
    },
    getUserInfo: {
      url: `${prefix}/getUserInfo`,
      method: 'GET',
      cache: 'get-user-info'
    },
    getTenantUserInfo: {
      url: `${prefix}/tenant/getTenantUserInfo`,
      method: 'GET',
      cache: 'get-tenant-user-info'
    },
    getUserTenant: {
      url: `${prefix}/tenant/getUserTenant`,
      method: 'GET'
    },
    getSuperAdminInfo: {
      url: `${prefix}/admin/getSuperAdminInfo`,
      method: 'GET'
    },
    initSuperAdmin: {
      url: `${prefix}/initSuperAdmin`,
      method: 'POST'
    },
    setCurrentTenantId: {
      url: `${prefix}/setCurrentTenantId`,
      method: 'POST'
    },
    tenant: {
      getTenantOrgList: {
        url: `${prefix}/tenant/orgList`,
        method: 'GET'
      },
      addTenantOrg: {
        url: `${prefix}/tenant/addOrg`,
        method: 'POST'
      },
      editTenantOrg: {
        url: `${prefix}/tenant/editOrg`,
        method: 'POST'
      },
      removeTenantOrg: {
        url: `${prefix}/tenant/removeOrg`,
        method: 'POST'
      },
      getTenantUserList: {
        url: `${prefix}/tenant/getTenantUserList`,
        method: 'GET'
      },
      getTenantRoleList: {
        url: `${prefix}/tenant/getRoleList`,
        method: 'GET'
      },
      addTenantRole: {
        url: `${prefix}/tenant/addRole`,
        method: 'POST'
      },
      saveTenantRole: {
        url: `${prefix}/tenant/saveRole`,
        method: 'POST'
      },
      removeTenantRole: {
        url: `${prefix}/tenant/removeRole`,
        method: 'POST'
      },
      getRolePermissionList: {
        url: `${prefix}/tenant/getRolePermissionList`,
        method: 'GET'
      },
      saveRolePermissionList: {
        url: `${prefix}/tenant/saveRolePermissionList`,
        method: 'POST'
      },
      getApplicationList: {
        url: `${prefix}/tenant/getApplicationList`,
        method: 'GET'
      },
      getPermissionList: {
        url: `${prefix}/tenant/getPermissionList`,
        method: 'GET'
      },
      saveTenantUser: {
        url: `${prefix}/tenant/saveTenantUser`,
        method: 'POST'
      },
      deleteTenantUser: {
        url: `${prefix}/tenant/deleteTenantUser`,
        method: 'POST'
      },
      closeTenantUser: {
        url: `${prefix}/tenant/closeTenantUser`,
        method: 'POST'
      },
      openTenantUser: {
        url: `${prefix}/tenant/openTenantUser`,
        method: 'POST'
      },
      getOperationLogList: {
        url: `${prefix}/admin/getTenantOperationLogList`,
        method: 'POST'
      }
    },
    admin: {
      setSuperAdmin: {
        url: `${prefix}/admin/setSuperAdmin`,
        method: 'POST'
      },
      addUser: {
        url: `${prefix}/admin/addUser`,
        method: 'POST'
      },
      getAllUserList: {
        url: `${prefix}/admin/getAllUserList`,
        method: 'GET'
      },
      getAllTenantList: {
        url: `${prefix}/admin/getAllTenantList`,
        method: 'GET'
      },
      addTenant: {
        url: `${prefix}/admin/addTenant`,
        method: 'POST'
      },
      saveTenant: {
        url: `${prefix}/admin/saveTenant`,
        method: 'POST'
      },
      resetUserPassword: {
        url: `${prefix}/admin/resetUserPassword`,
        method: 'POST'
      },
      closeTenant: {
        url: `${prefix}/admin/closeTenant`,
        method: 'POST'
      },
      openTenant: {
        url: `${prefix}/admin/openTenant`,
        method: 'POST'
      },
      saveUser: {
        url: `${prefix}/admin/saveUser`,
        method: 'POST'
      },
      closeUser: {
        url: `${prefix}/admin/closeUser`,
        method: 'POST'
      },
      openUser: {
        url: `${prefix}/admin/openUser`,
        method: 'POST'
      },
      getTenantInfo: {
        url: `${prefix}/admin/getTenantInfo`,
        method: 'GET'
      },
      getTenantRoleList: {
        url: `${prefix}/admin/getRoleList`,
        method: 'GET'
      },
      addTenantRole: {
        url: `${prefix}/admin/addRole`,
        method: 'POST'
      },
      saveTenantRole: {
        url: `${prefix}/admin/saveRole`,
        method: 'POST'
      },
      removeTenantRole: {
        url: `${prefix}/admin/removeRole`,
        method: 'POST'
      },
      getTenantOrgList: {
        url: `${prefix}/admin/tenant/orgList`
      },
      addTenantOrg: {
        url: `${prefix}/admin/tenant/addOrg`,
        method: 'POST'
      },
      editTenantOrg: {
        url: `${prefix}/admin/tenant/editOrg`,
        method: 'POST'
      },
      removeTenantOrg: {
        url: `${prefix}/admin/tenant/removeOrg`,
        method: 'POST'
      },
      getApplicationList: {
        url: `${prefix}/admin/getApplicationList`,
        method: 'GET'
      },
      addApplication: {
        url: `${prefix}/admin/addApplication`,
        method: 'POST'
      },
      deleteApplication: {
        url: `${prefix}/admin/deleteApplication`,
        method: 'POST'
      },
      saveApplication: {
        url: `${prefix}/admin/saveApplication`,
        method: 'POST'
      },
      getPermissionList: {
        url: `${prefix}/admin/getPermissionList`,
        method: 'GET'
      },
      addPermission: {
        url: `${prefix}/admin/addPermission`,
        method: 'POST'
      },
      deletePermission: {
        url: `${prefix}/admin/deletePermission`,
        method: 'POST'
      },
      savePermission: {
        url: `${prefix}/admin/savePermission`,
        method: 'POST'
      },
      parsePermissionList: {
        url: `${prefix}/admin/parsePermissionList`,
        method: 'POST'
      },
      exportPermissionList: {
        url: `${prefix}/admin/exportPermissionList`,
        method: 'POST'
      },
      saveTenantPermissionList: {
        url: `${prefix}/admin/saveTenantPermissionList`,
        method: 'POST'
      },
      getTenantPermissionList: {
        url: `${prefix}/admin/getTenantPermissionList`,
        method: 'GET'
      },
      getRolePermissionList: {
        url: `${prefix}/admin/getRolePermissionList`,
        method: 'GET'
      },
      saveRolePermissionList: {
        url: `${prefix}/admin/saveRolePermissionList`,
        method: 'POST'
      },
      getTenantUserList: {
        url: `${prefix}/admin/getTenantUserList`,
        method: 'GET'
      },
      addTenantUser: {
        url: `${prefix}/admin/addTenantUser`,
        method: 'POST'
      },
      saveTenantUser: {
        url: `${prefix}/admin/saveTenantUser`,
        method: 'POST'
      },
      deleteTenantUser: {
        url: `${prefix}/admin/deleteTenantUser`,
        method: 'POST'
      },
      closeTenantUser: {
        url: `${prefix}/admin/closeTenantUser`,
        method: 'POST'
      },
      openTenantUser: {
        url: `${prefix}/admin/openTenantUser`,
        method: 'POST'
      },
      getInviteList: {
        url: `${prefix}/admin/getInviteList`,
        method: 'GET'
      },
      addInviteToken: {
        url: `${prefix}/admin/addInviteToken`,
        method: 'POST'
      },
      deleteInviteToken: {
        url: `${prefix}/admin/deleteInviteToken`,
        method: 'POST'
      },
      getOperationLogList: {
        url: `${prefix}/admin/getAllOperationLogList`,
        method: 'POST'
      }
    }
  };
};

export default getApis;
