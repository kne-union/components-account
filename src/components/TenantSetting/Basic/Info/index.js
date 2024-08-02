import { createWithRemoteLoader } from '@kne/remote-loader';
import { get } from 'lodash';
import { Button, ColorPicker, Space } from 'antd';
import useClickOutside from '@kne/use-click-outside';
import { useCallback, useRef, useState } from 'react';

import style from './style.module.scss';

const onSubmit = async data => {
  console.log(data);
};

export const Edit = createWithRemoteLoader({
  modules: ['components-core:Icon', 'components-core:FormInfo', 'components-core:FormInfo@useFormModal']
})(({ remoteModules, id, reload, company, list, ...props }) => {
  const [Icon, FormInfo, useFormModal] = remoteModules;
  const formModal = useFormModal();

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
              console.log(data);
              await onSubmit(data, id, reload);
              api?.close();
            }
          },
          children: <FormInfo column={1} list={list} />
        });
      }}
    />
  );
});

const Info = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:FormInfo', 'components-core:FormInfo@Avatar', 'component-core:Global@useGlobalContext']
})(({ remoteModules, menu }) => {
  const [Page, FormInfo, Avatar, useGlobalContext] = remoteModules;
  const { Input, TextArea } = FormInfo.fields;
  const { global, setGlobal } = useGlobalContext('themeToken');

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
    close();
  });

  return (
    <Page name="setting-info" title="公司信息" menu={menu}>
      <div className={style['company-info']}>
        <Space direction="vertical" size={10}>
          <Space>
            <span className={style['label']}>公司名称：</span>
            <Space className={style['value']} size={20}>
              <span>{'-'}</span>
              <span className={style['edit']}>
                <Edit list={[<Input name="name" label="公司名称" />]} />
              </span>
            </Space>
          </Space>
          <Space align="center">
            <span className={style['label']}>公司简称：</span>
            <Space className={style['value']} size={20}>
              <span>{'-'}</span>
              <span className={style['edit']}>
                <Edit list={[<Input name="shortName" label="公司简称" />]} />
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
                        onClick={() => {
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
                // value={{ id: get(company, 'logo') }}
                name="logo"
                label="公司logo"
                interceptor="photo-string"
                dropModalSize="default"
                border={50}
                width={960}
                height={540}
                block
                labelHidden
                onChange={({ id }) => {
                  console.log({ logo: id });
                }}
              />
              <div className={style['logo-edit-mask']}>编辑</div>
            </div>
          </Space>
          <Space align="center">
            <span className={style['label']}>公司简介：</span>
            <Space className={style['value']} size={20}>
              <span>{'-'}</span>
              <span className={style['edit']}>
                <Edit list={[<TextArea name="description" label="公司简介" />]} />
              </span>
            </Space>
          </Space>
        </Space>
      </div>
    </Page>
  );
});

export default Info;
