import transform from 'lodash/transform';

const getApis = options => {
  const appName = 'Account';
  const { prefix, headers } = Object.assign({}, { prefix: '/api/v1/account' }, options);
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
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    modifyPassword: {
      url: `${prefix}/modifyPassword`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    forgetPwd: {
      url: `${prefix}/forgetPwd`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    parseResetToken: {
      url: `${prefix}/parseResetToken`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    resetPassword: {
      url: `${prefix}/resetPassword`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    validateCode: {
      url: `${prefix}/validateCode`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    register: {
      url: `${prefix}/register`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    accountIsExists: {
      url: `${prefix}/accountIsExists`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    getUserInfo: {
      url: `${prefix}/getUserInfo`,
      method: 'GET',
      cache: 'get-user-info',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    getTenantUserInfo: {
      url: `${prefix}/tenant/getTenantUserInfo`,
      method: 'GET',
      cache: 'get-tenant-user-info',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    getUserTenant: {
      url: `${prefix}/tenant/getUserTenant`,
      method: 'GET',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    getSuperAdminInfo: {
      url: `${prefix}/admin/getSuperAdminInfo`,
      method: 'GET',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    initSuperAdmin: {
      url: `${prefix}/initSuperAdmin`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    setCurrentTenantId: {
      url: `${prefix}/setCurrentTenantId`,
      method: 'POST',
      options: {
        headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
      }
    },
    tenant: {
      getTenantOrgList: {
        url: `${prefix}/tenant/orgList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addTenantOrg: {
        url: `${prefix}/tenant/addOrg`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      editTenantOrg: {
        url: `${prefix}/tenant/editOrg`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      removeTenantOrg: {
        url: `${prefix}/tenant/removeOrg`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getTenantUserList: {
        url: `${prefix}/tenant/getTenantUserList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getTenantRoleList: {
        url: `${prefix}/tenant/getRoleList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addTenantRole: {
        url: `${prefix}/tenant/addRole`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveTenantRole: {
        url: `${prefix}/tenant/saveRole`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      removeTenantRole: {
        url: `${prefix}/tenant/removeRole`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getRolePermissionList: {
        url: `${prefix}/tenant/getRolePermissionList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveRolePermissionList: {
        url: `${prefix}/tenant/saveRolePermissionList`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getApplicationList: {
        url: `${prefix}/tenant/getApplicationList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getPermissionList: {
        url: `${prefix}/tenant/getPermissionList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveTenantUser: {
        url: `${prefix}/tenant/saveTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      deleteTenantUser: {
        url: `${prefix}/tenant/deleteTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      closeTenantUser: {
        url: `${prefix}/tenant/closeTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      openTenantUser: {
        url: `${prefix}/tenant/openTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getOperationLogList: {
        url: `${prefix}/tenant/getTenantOperationLogList`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getCompanyInfo: {
        url: `${prefix}/tenant/getCompanyInfo`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveCompanyInfo: {
        url: `${prefix}/tenant/saveCompanyInfo`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      }
    },
    admin: {
      setSuperAdmin: {
        url: `${prefix}/admin/setSuperAdmin`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addUser: {
        url: `${prefix}/admin/addUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getAllUserList: {
        url: `${prefix}/admin/getAllUserList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getAllTenantList: {
        url: `${prefix}/admin/getAllTenantList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addTenant: {
        url: `${prefix}/admin/addTenant`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveTenant: {
        url: `${prefix}/admin/saveTenant`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      resetUserPassword: {
        url: `${prefix}/admin/resetUserPassword`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      closeTenant: {
        url: `${prefix}/admin/closeTenant`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      openTenant: {
        url: `${prefix}/admin/openTenant`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveUser: {
        url: `${prefix}/admin/saveUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      closeUser: {
        url: `${prefix}/admin/closeUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      openUser: {
        url: `${prefix}/admin/openUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getTenantInfo: {
        url: `${prefix}/admin/getTenantInfo`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getTenantRoleList: {
        url: `${prefix}/admin/getRoleList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addTenantRole: {
        url: `${prefix}/admin/addRole`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveTenantRole: {
        url: `${prefix}/admin/saveRole`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      removeTenantRole: {
        url: `${prefix}/admin/removeRole`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getTenantOrgList: {
        url: `${prefix}/admin/tenant/orgList`,
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addTenantOrg: {
        url: `${prefix}/admin/tenant/addOrg`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      editTenantOrg: {
        url: `${prefix}/admin/tenant/editOrg`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      removeTenantOrg: {
        url: `${prefix}/admin/tenant/removeOrg`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getApplicationList: {
        url: `${prefix}/admin/getApplicationList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addApplication: {
        url: `${prefix}/admin/addApplication`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      deleteApplication: {
        url: `${prefix}/admin/deleteApplication`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveApplication: {
        url: `${prefix}/admin/saveApplication`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      copyPermissions: {
        url: `${prefix}/admin/copyPermissions`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getPermissionList: {
        url: `${prefix}/admin/getPermissionList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addPermission: {
        url: `${prefix}/admin/addPermission`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      deletePermission: {
        url: `${prefix}/admin/deletePermission`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      savePermission: {
        url: `${prefix}/admin/savePermission`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      parsePermissionList: {
        url: `${prefix}/admin/parsePermissionList`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      exportPermissionList: {
        url: `${prefix}/admin/exportPermissionList`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveTenantPermissionList: {
        url: `${prefix}/admin/saveTenantPermissionList`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getTenantPermissionList: {
        url: `${prefix}/admin/getTenantPermissionList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getRolePermissionList: {
        url: `${prefix}/admin/getRolePermissionList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveRolePermissionList: {
        url: `${prefix}/admin/saveRolePermissionList`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getTenantUserList: {
        url: `${prefix}/admin/getTenantUserList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addTenantUser: {
        url: `${prefix}/admin/addTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveTenantUser: {
        url: `${prefix}/admin/saveTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      deleteTenantUser: {
        url: `${prefix}/admin/deleteTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      closeTenantUser: {
        url: `${prefix}/admin/closeTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      openTenantUser: {
        url: `${prefix}/admin/openTenantUser`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getInviteList: {
        url: `${prefix}/admin/getInviteList`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      addInviteToken: {
        url: `${prefix}/admin/addInviteToken`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      deleteInviteToken: {
        url: `${prefix}/admin/deleteInviteToken`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getOperationLogList: {
        url: `${prefix}/admin/getAllOperationLogList`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      getCompanyInfo: {
        url: `${prefix}/admin/getCompanyInfo`,
        method: 'GET',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      },
      saveCompanyInfo: {
        url: `${prefix}/admin/saveCompanyInfo`,
        method: 'POST',
        options: {
          headers: Object.assign({}, headers, { 'X-APP-NAME': appName })
        }
      }
    }
  };
};

export default getApis;
