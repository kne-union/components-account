import { createWithRemoteLoader } from '@kne/remote-loader';
import { Button, Flex, Space, message, Tree, Typography } from 'antd';
import FormInner from './FormInner';
import { useEffect, useRef, useMemo, useState } from 'react';
import { withFetch } from '@kne/react-fetch';
import get from 'lodash/get';

import style from '../../style.module.scss';

const OrganizationInner = withFetch(({ data }) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const treeData = useMemo(() => {
    return Array.isArray(data.pageData) ? data.pageData || [] : [data.pageData];
  }, [data]);

  useEffect(() => {
    setExpandedKeys([get(data.pageData, '[0].id')]);
  }, [data]);
  return (
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
  );
});

const Organization = createWithRemoteLoader({
  modules: ['components-core:FormInfo@useFormModal', 'components-core:Global@usePreset']
})(({ remoteModules, data }) => {
  const [useFormModal, usePreset] = remoteModules;
  const { ajax, apis } = usePreset();
  const formModal = useFormModal();
  const tenantId = data.id;
  const ref = useRef(null);

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
                    ref.current.reload();
                    formApi.close();
                  }
                },
                size: 'small',
                children: <FormInner record={data} />
              });
            }}
          >
            新建组织
          </Button>
        </Space>
      </Flex>
      <OrganizationInner {...apis.account.getTenantOrgList} params={{ tenantId }} />
    </Flex>
  );
});

export default Organization;
