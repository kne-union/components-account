import { createWithRemoteLoader } from '@kne/remote-loader';
import { get } from 'lodash';
import { Button, ColorPicker, Space } from 'antd';
import useClickOutside from '@kne/use-click-outside';
import { useCallback, useRef, useState } from 'react';
import { withFetch } from '@kne/react-fetch';

import style from './style.module.scss';

const onSubmit = async ({ data, reload, apis, ajax, onSuccess }) => {
  const { data: resData } = await ajax(Object.assign({}, apis.account.tenant.saveCompanyInfo, { data }));
  if (resData.code === 0) {
    reload?.();
    onSuccess?.();
  }
};

export const Edit = createWithRemoteLoader({
  modules: ['components-core:Icon', 'components-core:FormInfo', 'components-core:FormInfo@useFormModal', 'component-core:Global@usePreset']
})(({ remoteModules, reload, company, list, ...props }) => {
  const [Icon, FormInfo, useFormModal, usePreset] = remoteModules;
  const formModal = useFormModal();
  const { apis, ajax } = usePreset();

  return (
    <Icon
      type="icon-bianji"
      {...props}
      onClick={() => {
        const api = formModal({
          title: '编辑',
          size: 'small',
          formProps: {
            type: 'inner',
            data: company,
            onSubmit: async data => {
              await onSubmit({ data, reload, apis, ajax });
              api?.close();
            }
          },
          children: <FormInfo column={1} list={list} />
        });
      }}
    />
  );
});

const InfoInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@Avatar', 'component-core:Global@useGlobalContext', 'component-core:Global@usePreset']
})(
  withFetch(({ remoteModules, reload, data }) => {
    const [FormInfo, Avatar, useGlobalContext, usePreset] = remoteModules;
    const { Input, TextArea } = FormInfo.fields;
    const { global, setGlobal } = useGlobalContext('themeToken');
    const { global: userInfo } = useGlobalContext('userInfo');
    const { apis, ajax } = usePreset();

    const [open, setOpen] = useState(false);

    const close = useCallback(() => {
      setOpen(false);
    }, []);

    const colorPickerOuterRef = useRef(null);
    const colorPickerRef = useClickOutside(e => {
      if (!colorPickerOuterRef.current) {
        return;
      }
      if (colorPickerOuterRef.current.contains(e.target) || e.target === colorPickerOuterRef.current) {
        return;
      }
      setGlobal(Object.assign({}, global, { colorPrimary: get(data, 'themeColor') || '#4F185A' }));
      close();
    });

    return (
      <div className={style['company-info']}>
        <Space direction="vertical" size={10}>
          <Space>
            <span className={style['label']}>公司名称：</span>
            <Space className={style['value']} size={20}>
              <span>{get(data, 'name') || '-'}</span>
              <span className={style['edit']}>
                <Edit list={[<Input name="name" label="公司名称" />]} reload={reload} company={data} />
              </span>
            </Space>
          </Space>
          <Space align="center">
            <span className={style['label']}>公司简称：</span>
            <Space className={style['value']} size={20}>
              <span>{get(data, 'shortName') || '-'}</span>
              <span className={style['edit']}>
                <Edit list={[<Input name="shortName" label="公司简称" />]} reload={reload} company={data} />
              </span>
            </Space>
          </Space>
          <Space align="center" style={{ minHeight: '36px' }} ref={colorPickerOuterRef}>
            <span className={style['label']}>公司主题色：</span>
            <div>
              <ColorPicker
                open={open}
                onClick={() => {
                  setOpen(true);
                }}
                value={get(global, 'colorPrimary') || '#4F185A'}
                onChange={color => {
                  setGlobal(Object.assign({}, global, { colorPrimary: color?.toHexString() }));
                }}
                styles={{ popupOverlayInner: { width: 240 } }}
                panelRender={(_, { components: { Picker } }) => {
                  return (
                    <Space direction="vertical" ref={colorPickerRef}>
                      <Picker />
                      <Button
                        type={'primary'}
                        onClick={async () => {
                          await onSubmit({ data: { themeColor: get(global, 'colorPrimary') }, reload, apis, ajax });
                          close();
                        }}
                      >
                        确定
                      </Button>
                    </Space>
                  );
                }}
              />
            </div>
          </Space>
          <Space align="center">
            <span className={style['label']}>公司logo：</span>
            <div className={style['logo-wrap']}>
              <Avatar.Field
                value={{ id: get(data, 'logo') }}
                name="logo"
                label="公司logo"
                interceptor="photo-string"
                dropModalSize="default"
                border={50}
                width={1140}
                height={320}
                block
                labelHidden
                onChange={async ({ id }) => {
                  await onSubmit({
                    data: { logo: id },
                    reload,
                    apis,
                    ajax,
                    onSuccess: () => userInfo?.reload?.()
                  });
                }}
              />
              <div className={style['logo-edit-mask']}>编辑</div>
            </div>
          </Space>
          <Space align="center">
            <span className={style['label']}>公司简介：</span>
            <Space className={style['value']} size={20}>
              <span>{get(data, 'description') || '-'}</span>
              <span className={style['edit']}>
                <Edit list={[<TextArea name="description" label="公司简介" />]} reload={reload} company={data} />
              </span>
            </Space>
          </Space>
        </Space>
      </div>
    );
  })
);

const Info = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'component-core:Global@usePreset']
})(({ remoteModules, menu }) => {
  const [Page, usePreset] = remoteModules;
  const { apis } = usePreset();

  return (
    <Page name="setting-info" title="公司信息" menu={menu}>
      <InfoInner {...apis.account.tenant.getCompanyInfo} />
    </Page>
  );
});

export default Info;
