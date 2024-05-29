import { createWithRemoteLoader } from '@kne/remote-loader';
import { Button, Flex, Space, message, Tree, Typography } from 'antd';
import FormInner from './FormInner';
import { useEffect, useMemo, useState } from 'react';
import { withFetch } from '@kne/react-fetch';
import get from 'lodash/get';
import merge from 'lodash/merge';

import style from './style.module.scss';
import { editTenantOrg } from '../../../../apis/account';

const getTreeData = (treeMap, pid) => {
  return (get(treeMap, pid) || []).map(item => Object.assign({}, item, { children: getTreeData(treeMap, item.id) }));
};

const OrganizationInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo@useFormModal', 'components-core:Global@usePreset', 'components-core:Icon', 'components-core:ConfirmButton@ConfirmLink']
})(
  withFetch(({ remoteModules, data, tenantId, record, reload }) => {
    const [useFormModal, usePreset, Icon, ConfirmLink] = remoteModules;
    const { ajax, apis } = usePreset();
    const formModal = useFormModal();
    const [expandedKeys, setExpandedKeys] = useState([]);

    const treeData = useMemo(() => {
      const tree = Array.isArray(data.pageData) ? data.pageData || [] : [data.pageData];
      const treeMap = Object.groupBy(tree, item => item.pid);
      return getTreeData(treeMap, '0');
    }, [data]);

    useEffect(() => {
      setExpandedKeys([get(data.pageData, '[0].id')]);
    }, [data]);

    return (
      <Flex vertical gap={8} flex={1}>
        <Flex justify="space-between">
          <div></div>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                const formApi = formModal({
                  title: '新增组织',
                  formProps: {
                    onSubmit: async data => {
                      const { data: resData } = await ajax(
                        Object.assign({}, apis.account.addTenantOrg, {
                          data: Object.assign({}, data, { tenantId })
                        })
                      );
                      if (resData.code !== 0) {
                        return;
                      }

                      message.success('组织新增成功');
                      formApi.close();
                      reload();
                    }
                  },
                  size: 'small',
                  children: <FormInner treeData={treeData} record={record} />
                });
              }}
            >
              新建组织
            </Button>
          </Space>
        </Flex>
        <Tree
          showLine={true}
          showIcon={true}
          expandedKeys={expandedKeys}
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
          treeData={treeData}
          onExpand={expandedKeys => {
            setExpandedKeys(expandedKeys);
          }}
          titleRender={nodeData => {
            return (
              <Space size={36} className={style['tree-node']}>
                <Space>
                  {nodeData.parentId !== 0 ? (
                    <>
                      <span>{nodeData.name} </span>
                      {nodeData.enName && <span>{nodeData.enName}</span>}
                    </>
                  ) : (
                    get(data, 'name') + ` ${nodeData.enName || ''}`
                  )}
                </Space>
                <Space size={24} className={style['tree-node-actions']}>
                  <Typography.Text
                    onClick={() => {
                      const formApi = formModal({
                        title: '编辑组织',
                        formProps: {
                          data: nodeData,
                          onSubmit: async data => {
                            const pid = data.pid || '0';
                            const { data: resData } = await ajax(
                              Object.assign({}, apis.account.editTenantOrg, {
                                data: Object.assign({}, data, { tenantId, pid, id: nodeData.id })
                              })
                            );
                            if (resData.code !== 0) {
                              return;
                            }
                            message.success('组织编辑成功');
                            formApi.close();
                            reload();
                          }
                        },
                        size: 'small',
                        children: <FormInner treeData={treeData} record={nodeData} />
                      });
                    }}
                  >
                    编辑
                    <Icon type="bianji" />
                  </Typography.Text>
                  {nodeData.pid !== 0 && (
                    <ConfirmLink
                      onClick={() => {
                        ajax(merge({}, apis.account.removeTenantOrg, { data: { tenantId, id: nodeData.id } })).then(({ data }) => {
                          if (data.code === 0) {
                            message.success('删除组织成功！');
                            reload();
                          }
                        });
                      }}
                      okText="删除"
                      danger
                      isModal
                      message={`您确定要删除该组织吗？`}
                    >
                      删除
                      <Icon type="shanchu" />
                    </ConfirmLink>
                  )}
                  <Typography.Text
                    onClick={() => {
                      const formApi = formModal({
                        title: '新增子级组织',
                        formProps: {
                          data: {
                            pid: nodeData.id
                          },
                          onSubmit: async data => {
                            const { data: resData } = await ajax(
                              Object.assign({}, apis.account.addTenantOrg, {
                                data: Object.assign({}, data, { tenantId })
                              })
                            );
                            if (resData.code !== 0) {
                              return;
                            }
                            message.success('子级组织新增成功');
                            formApi.close();
                            reload();
                          }
                        },
                        size: 'small',
                        children: <FormInner treeData={treeData} />
                      });
                    }}
                  >
                    新增子级组织
                    <Icon type="tianjia" />
                  </Typography.Text>
                </Space>
              </Space>
            );
          }}
        />
      </Flex>
    );
  })
);

const Organization = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, record }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  const tenantId = record.id;

  return <OrganizationInner {...apis.account.getTenantOrgList} params={{ tenantId }} tenantId={tenantId} record={record} />;
});

export default Organization;
