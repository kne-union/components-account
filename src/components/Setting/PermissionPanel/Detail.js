import { createWithRemoteLoader } from '@kne/remote-loader';
import { App, Button, List, Flex, Card, Space, Checkbox } from 'antd';
import { forwardRef, useMemo, useState } from 'react';
import style from './style.module.scss';
import Fetch from '@kne/react-fetch';
import FormInner from './FormInner';
import groupBy from 'lodash/groupBy';
import get from 'lodash/get';
import difference from 'lodash/difference';
import classnames from 'classnames';

const PermissionLane = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:Icon', 'components-core:FormInfo@useFormModal', 'components-core:ConfirmButton']
})(({ remoteModules, apis, applicationId, pid, reload, list, isEdit, mustLocked, value, onChecked, children, parentChecked }) => {
  const [usePreset, Icon, useFormModal, ConfirmButton] = remoteModules;
  const { ajax } = usePreset();
  const formModal = useFormModal();
  const { message } = App.useApp();
  const [current, setCurrent] = useState(get(list, '[0].id'));
  const listMap = useMemo(() => {
    return new Map(list && list.map(item => [item.id, item]));
  }, [list]);

  const onAdd = ({ pid }) => {
    const formApi = formModal({
      title: '添加权限',
      size: 'small',
      formProps: {
        onSubmit: async data => {
          const { data: resData } = await ajax(
            Object.assign({}, apis.addPermission, {
              data: Object.assign({}, data, { applicationId, pid })
            })
          );

          if (resData.code !== 0) {
            return;
          }
          message.success('权限添加成功');
          reload();
          formApi.close();
        }
      },
      children: <FormInner />
    });
  };

  return (
    <>
      <Card className={style['lane']}>
        <List>
          {list &&
            list.map(item => {
              return (
                <List.Item
                  key={item.id}
                  className={classnames({
                    [style['is-selected']]: item.id === current
                  })}
                  onClick={() => {
                    setCurrent(item.id);
                  }}
                >
                  <Space flex={1}>
                    {!isEdit && (
                      <Checkbox
                        checked={parentChecked && ((item.isMust === 1 && mustLocked) || value.indexOf(item.id) > -1)}
                        disabled={(item.isMust === 1 && mustLocked) || !parentChecked}
                        onChange={e => {
                          const newValue = value.slice(0);
                          if (e.target.checked) {
                            newValue.push(item.id);
                          } else {
                            newValue.splice(newValue.indexOf(item.id), 1);
                          }
                          onChecked(newValue);
                        }}
                      />
                    )}
                    <Icon type={item.isModule ? 'icon-wenjianjia' : 'icon-bitian'} />
                    <div className={style['permission-name']} title={`${item.name}(${item.code})`}>
                      {item.name}({item.code})
                    </div>
                    {isEdit && item.isMust === 1 ? <Icon type="icon-yisuoding" /> : ''}
                  </Space>
                  {isEdit && (
                    <div
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      <Button
                        type="link"
                        className="btn-no-padding"
                        onClick={() => {
                          const formApi = formModal({
                            title: '编辑权限',
                            size: 'small',
                            formProps: {
                              data: Object.assign({}, item),
                              onSubmit: async data => {
                                const { data: resData } = await ajax(
                                  Object.assign({}, apis.savePermission, {
                                    data: Object.assign({}, data, { id: item.id })
                                  })
                                );

                                if (resData.code !== 0) {
                                  return;
                                }
                                message.success('权限保存成功');
                                reload();
                                formApi.close();
                              }
                            },
                            children: <FormInner isEdit />
                          });
                        }}
                      >
                        <Icon type="icon-bianji" />
                      </Button>
                      <ConfirmButton
                        type="link"
                        className="btn-no-padding"
                        onClick={async () => {
                          const { data: resData } = await ajax(
                            Object.assign({}, apis.deletePermission, {
                              data: { id: item.id }
                            })
                          );
                          if (resData.code !== 0) {
                            return;
                          }
                          message.success('删除权限成功');
                          reload();
                        }}
                      >
                        <Icon type="icon-shanchu" />
                      </ConfirmButton>
                    </div>
                  )}
                </List.Item>
              );
            })}
          {isEdit && (
            <List.Item key="add">
              <Button size="small" type="primary" onClick={() => onAdd({ pid })}>
                <Icon type="icon-tianjia" />
              </Button>
            </List.Item>
          )}
        </List>
      </Card>
      {(() => {
        if (!current) {
          return null;
        }

        const currentItem = listMap.get(current);

        if (!currentItem) {
          return null;
        }

        if (!listMap.get(current).isModule) {
          return null;
        }

        return true;
      })() && children({ current })}
    </>
  );
});

const PermissionList = ({ apis, applicationId, reload, data, isEdit, mustLocked, value, onChecked, parentChecked }) => {
  const groupData = groupBy(data, 'pid');
  const permissionMap = useMemo(() => {
    return new Map(data.map(item => [item.id, item]));
  }, [data]);
  const render = ({ pid, parentChecked }) => {
    const children = groupData[pid];
    return (
      <PermissionLane
        apis={apis}
        key={pid}
        applicationId={applicationId}
        pid={pid}
        reload={reload}
        list={children}
        value={value}
        mustLocked={mustLocked}
        onChecked={permissions => {
          onChecked(
            (permissions || []).filter(id => {
              const permission = permissionMap.get(id);
              return permission && difference(permission.paths, permissions).length === 0;
            })
          );
        }}
        parentChecked={parentChecked}
        isEdit={isEdit}
      >
        {({ current }) => {
          return (
            current &&
            render({
              pid: current,
              parentChecked: parentChecked && value.indexOf(current) > -1
            })
          );
        }}
      </PermissionLane>
    );
  };

  return <Flex gap={8}>{render({ pid: 0, parentChecked })}</Flex>;
};

const Detail = forwardRef(({ apis, applicationId, isEdit, mustLocked, value, onChecked, parentChecked, tenantId }, ref) => {
  return (
    <Fetch
      {...Object.assign({}, apis.getPermissionList, { params: { applicationId, tenantId } })}
      ref={ref}
      render={({ data, reload }) => {
        return (
          <div className={style['permission-detail-right']}>
            <PermissionList apis={apis} applicationId={applicationId} reload={reload} data={data} isEdit={isEdit} mustLocked={mustLocked} value={value} onChecked={onChecked} parentChecked={parentChecked} />
          </div>
        );
      }}
    />
  );
});

export default Detail;
