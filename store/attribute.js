function coverAttsToFormAtt(attSet, code) {
  return attSet.map((x) => attToField(x, code));
}

function attToField(x, code) {
  let validation = x.is_required ? "required" : "";

  // 处理tyep
  let typeMap = {
    text: "text",
    textarea: "textarea",
    texteditor: "textarea",
    date: "date",
    datetime: "datetime-local",
    boolean: "checkbox",
    multiselect: "radio",
    select: "select",
    price: "number",
  };

  // 处理label
  let storeCodeMap = {
    cn: 1,
  };
  let label = x.default_frontend_label;

  if (x.frontend_labels && x.frontend_labels.length > 0) {
    let chosenLabel = x.frontend_labels.find(
      (z) => z.store_id === storeCodeMap[code]
    );
    label = chosenLabel.label;
  }

  return {
    name: x.attribute_code,
    value: "",
    type: typeMap[x.frontend_input],
    label: label,
    validation: validation,
    options: x.options.map((z) => ({
      value: z.value,
      label: z.label,
    })),
  };
}

export const actions = {
  async attSetList({}) {
    let r = await this.$axios.post("/api/attribute/list");
    return r;
  },

  async setDetail({ commit }, { setId }) {
    return await this.$axios.post(`/api/attribute/setDetail`, {
      setId: setId,
    });
  },
};
