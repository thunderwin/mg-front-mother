export const actions = {
  error(context, message) {
    this._vm.$toast.fail(message);
  },
  warn(context, message) {
    this._vm.$toast.fail(message);
  },
  success(context, message) {
    this._vm.$toast.success({
      duration: 2000, // 持续展示 toast
      forbidClick: false, // 可以点击

      message: message
    });
  },
  loading(context, message) {
    this._vm.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: false, // 可以点击
      message: message,
      loadingType: "spinner"
    });
  },

  clear() {
    this._vm.$toast.clear();
  },

  confirm(context, m) {

    this._vm.$dialog.alert(m);
  },

  ask(context, message) {
    this._vm.$dialog.confirm({
      message: message
    });
  }
};
