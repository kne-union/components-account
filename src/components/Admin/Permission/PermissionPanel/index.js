import { createWithRemoteLoader } from '@kne/remote-loader';
import { App, Button, Empty, Flex, Menu, Checkbox } from 'antd';
import Fetch from '@kne/react-fetch';
import ApplicationFormInner from '../ApplicationFormInner';
import { forwardRef, useState } from 'react';
import style from './style.module.scss';
import Detail from './Detail';
import get from 'lodash/get';

const ApplicationList = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:Image', 'components-core:Icon', 'components-core:ConfirmButton', 'components-core:FormInfo@useFormModal']
})(
  forwardRef(({ remoteModules, isEdit, current, onChange, value, onChecked, tenantId }, ref) => {
    const [usePreset, Image, Icon, ConfirmButton, useFormModal] = remoteModules;
    const { apis, ajax } = usePreset();
    const formModal = useFormModal();
    const { message } = App.useApp();
    return (
      <Fetch
        {...Object.assign({}, apis.account.getApplicationList, { params: { tenantId } })}
        ref={ref}
        render={({ data, reload }) => {
          return data && data.length > 0 ? (
            <Menu
              className={style['application']}
              items={data.map(item => {
                return {
                  label: (
                    <Flex align="center" gap={8} justify="space-between">
                      {!isEdit && (
                        <Checkbox
                          checked={value.indexOf(item.id) > -1}
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
                      <Image.Avatar id={item.avatar} size={32} />
                      <div className={style['app-name']} title={`${item.name}(${item.code})`}>
                        {item.name}({item.code})
                      </div>
                      {isEdit && (
                        <div onClick={e => e.stopPropagation()}>
                          <Button
                            type="text"
                            className="btn-no-padding"
                            onClick={() => {
                              const formApi = formModal({
                                title: '编辑应用',
                                size: 'small',
                                formProps: {
                                  data: Object.assign({}, item),
                                  onSubmit: async data => {
                                    const { data: resData } = await ajax(
                                      Object.assign({}, apis.account.saveApplication, {
                                        data: Object.assign({}, data, { id: item.id })
                                      })
                                    );
                                    if (resData.code !== 0) {
                                      return;
                                    }
                                    message.success('保存应用成功');
                                    reload();
                                    formApi.close();
                                  }
                                },
                                children: <ApplicationFormInner />
                              });
                            }}
                          >
                            <Icon type="icon-bianji" />
                          </Button>
                          <ConfirmButton
                            type="text"
                            className="btn-no-padding"
                            onClick={async () => {
                              const { data: resData } = await ajax(
                                Object.assign({}, apis.account.deleteApplication, {
                                  data: { id: item.id }
                                })
                              );
                              if (resData.code !== 0) {
                                return;
                              }
                              message.success('删除应用成功');
                              onChange(data?.length ? data[0].id : '');
                              reload();
                            }}
                          >
                            <Icon type="icon-shanchu" />
                          </ConfirmButton>
                        </div>
                      )}
                    </Flex>
                  ),
                  key: item.id
                };
              })}
              selectedKeys={current}
              onClick={({ key }) => onChange(key)}
            />
          ) : (
            <Empty />
          );
        }}
        onRequestSuccess={data => {
          if (!current && data && data.length > 0) {
            onChange(data[0].id);
          }
        }}
      />
    );
  })
);

const PermissionPanel = forwardRef(({ isEdit, value, mustLocked, tenantId, onChange }, ref) => {
  const [current, setCurrent] = useState('');
  return (
    <div className={style['flex-wrapper']}>
      <ApplicationList
        ref={ref}
        current={current}
        onChange={setCurrent}
        isEdit={isEdit}
        value={get(value, 'applications', [])}
        tenantId={tenantId}
        onChecked={applications => {
          onChange(
            Object.assign({}, value, {
              applications
            })
          );
        }}
      />
      {current && (
        <Detail
          applicationId={current}
          isEdit={isEdit}
          tenantId={tenantId}
          value={get(value, 'permissions', [])}
          mustLocked={mustLocked}
          onChecked={permissions => {
            onChange(
              Object.assign({}, value, {
                permissions
              })
            );
          }}
          parentChecked={get(value, 'applications', []).indexOf(current) > -1}
        />
      )}
    </div>
  );
});

export default PermissionPanel;
