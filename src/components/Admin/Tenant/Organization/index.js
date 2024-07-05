import { createWithRemoteLoader } from '@kne/remote-loader';
import { Button, Flex, Space, message, Tree, Empty } from 'antd';
import FormInner from './FormInner';
import { useEffect, useState } from 'react';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { OrgTreeData } from '@components/OrgTreeSelect';

import style from './style.module.scss';

const OrganizationInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo@useFormModal', 'components-core:Global@usePreset', 'components-core:Icon', 'components-core:ConfirmButton']
})(({ remoteModules, data, treeData, tenantId, record, reload }) => {
  const [useFormModal, usePreset, Icon, ConfirmButton] = remoteModules;
  const { ajax, apis } = usePreset();
  const formModal = useFormModal();
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    setExpandedKeys([get(data.pageData, '[0].id')]);
  }, [data]);

  if (!(treeData && treeData.length > 0)) {
    return <Empty />;
  }

  return (
    <Flex className={style['org']} vertical gap={8} flex={1}>
      <Flex justify="space-between">
        <div></div>
        <Space>
          <Button
            size="small"
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
                children: <FormInner tenantId={tenantId} record={record} />
              });
            }}
          >
            新建组织
          </Button>
        </Space>
      </Flex>
      <Tree
        showLine
        showIcon
        selectable={false}
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
                <Button
                  type="link"
                  className="btn-no-padding"
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
                      children: <FormInner treeData={treeData} tenantId={tenantId} />
                    });
                  }}
                >
                  <Icon type="tianjia" />
                  新增子级组织
                </Button>
                {nodeData.pid !== 0 && (
                  <Button
                    type="link"
                    className="btn-no-padding"
                    onClick={() => {
                      const formApi = formModal({
                        title: '编辑组织',
                        formProps: {
                          data: nodeData,
                          onSubmit: async data => {
                            const pid = data.pid || '0';
                            const { data: resData } = await ajax(
                              Object.assign({}, apis.account.editTenantOrg, {
                                data: Object.assign({}, data, {
                                  tenantId,
                                  pid,
                                  id: nodeData.id
                                })
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
                        children: <FormInner tenantId={tenantId} record={nodeData} />
                      });
                    }}
                  >
                    <Icon type="bianji" />
                    编辑
                  </Button>
                )}
                {nodeData.pid !== 0 && (
                  <ConfirmButton
                    type="link"
                    className="btn-no-padding"
                    onClick={() => {
                      ajax(
                        merge({}, apis.account.removeTenantOrg, {
                          data: {
                            tenantId,
                            id: nodeData.id
                          }
                        })
                      ).then(({ data }) => {
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
                    <Icon type="shanchu" />
                    删除
                  </ConfirmButton>
                )}
              </Space>
            </Space>
          );
        }}
      />
    </Flex>
  );
});

const Organization = ({ record }) => {
  const tenantId = record.id;
  return (
    <OrgTreeData tenantId={tenantId}>
      {fetchApi => {
        return <OrganizationInner {...fetchApi} tenantId={tenantId} record={record} />;
      }}
    </OrgTreeData>
  );
};

export default Organization;
