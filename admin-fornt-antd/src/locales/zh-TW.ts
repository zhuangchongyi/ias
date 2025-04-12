const context = require.context('./zh-CN', false, /\.ts$/);

const modules: Record<string, any> = {};

context.keys().forEach((key: any) => {
  const mod = context(key).default;
  Object.assign(modules, mod);
});

export default {
  ...modules,
};
