const importMessages = locale => {
  return {
    'en-US': () => import('./en-US'),
    'zh-CN': () => import('./zh-CN')
  }[locale]();
};

export const moduleName = 'components-account';

export default importMessages;
