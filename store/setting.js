export const state = () => {
  return {};
};

export const mutations = {
  setConfig(state, v) {
    state = v;
  }
};

export const actions = {
  getStoreAvaliableLanguages({}) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.dir("开始");
        console.log(JSON.stringify());

        resolve(["英文", "中文", "德语", "法语", "西班牙语", "日语"]);
      }, 2000);
    });
  }
};
