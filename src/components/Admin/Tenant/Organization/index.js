import { createWithRemoteLoader } from '@kne/remote-loader';
import { Button, Flex, Space, message, Tree } from 'antd';
import FormInner from './FormInner';
import { useEffect, useMemo, useState } from 'react';
import { withFetch } from '@kne/react-fetch';
import get from 'lodash/get';

import style from '../../style.module.scss';

const getTreeData = (treeMap, pid) => {
  return (get(treeMap, pid) || []).map(item => Object.assign({}, item, { children: getTreeData(treeMap, item.id) }));
};

const OrganizationInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo@useFormModal', 'components-core:Global@usePreset']
})(
  withFetch(({ remoteModules, data, tenantId, reload }) => {
    const [useFormModal, usePreset] = remoteModules;
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
                  children: <FormInner treeData={treeData} />
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
              <Space size={36} className={style.tree_node}>
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

  return <OrganizationInner {...apis.account.getTenantOrgList} params={{ tenantId }} tenantId={tenantId} />;
});

export default Organization;
