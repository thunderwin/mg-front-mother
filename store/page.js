export const actions = {
  async cmsPage() {
    let r = await this.$api.post("/api/page/cmsPage", {
      id: 1,
    });

    return r;
  },
};
