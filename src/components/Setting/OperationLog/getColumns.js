import get from 'lodash/get';

const getColumns = () => {
  return [
    {
      name: 'summary',
      title: 'API 概述',
      type: 'other'
    },
    {
      name: 'action',
      title: 'API',
      type: 'other'
    },
    {
      name: 'user',
      title: '操作用户',
      type: 'user',
      valueOf: ({ user }) => get(user, 'nickname', '')
    },
    {
      name: 'application',
      title: '应用',
      type: 'serialNumberShort',
      valueOf: ({ application }) => get(application, 'name', '')
    },
    {
      name: 'createdAt',
      title: '创建时间',
      type: 'datetime'
    }
  ];
};

export default getColumns;
