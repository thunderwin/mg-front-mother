//https://c.runoob.com/front-end/854  参考

const validator = {
  isDomain(v) {
    return /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(
      v
    );
  },

  isEmail(v) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
  },

  isChinese(v) {
    return /^[\u4e00-\u9fa5]{0,}$/.test(v);
  },

  isMin(v, min) {
    console.dir('开始验证')
    console.log(JSON.stringify())
    return v.length > min;
  }
};

export default validator;
