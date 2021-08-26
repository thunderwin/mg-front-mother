<template>
  <client-only>
    <div class="wrappeprr" style="width: 100%; padding: 1rem">
      <div
        class="checkout_line_item"
        style="
          display: flex;
          width: 100%;
          justify-content: space-between;
          padding: auto 1rem;
          align-items: center;
        "
      >
        <!-- {{ x.product.imglist }} -->

        <van-card
          style="
            background-color: #fff !important;
            padding: 0 !important;
            margin-bottom: 1rem;
          "
          :title="item.product.name"
          :thumb="thumb"
          :style="{ width: mob ? '100%' : '' }"
        >
          <template #tags>
            <!-- {{ item }} -->
            <div v-for="(x, indx) in item.customizable_options" :key="indx">
              <span class="is-capitalized">{{ x.label }}:</span>
              <span style="" class="is-uppercase">{{
                x.values[0].label || x.values[0].value
              }}</span>
            </div>

            <div
              v-if="
                item.configurable_options &&
                item.configurable_options.length > 0
              "
              class="config_options"
            >
              <div v-for="(x, indx) in item.configurable_options" :key="indx">
                <span>{{ x.option_label }}:</span>
                <span style="">{{ x.value_label }}</span>
              </div>
            </div>
          </template>

          <template v-if="$device.isMobileOrTablet" #footer>
            <div class="my-flex" style="margin-top: 1rem">
              <div v-if="simpleItem" class="qty" style="font-size: 1rem">
                {{ $t("c.qty") }} : {{ item.quantity }}
              </div>
              <div style="font-size: 1.3rem; flex-shrink: 0" class="pricr">
                {{ item.prices.price.currency }}
                {{ (item.prices.price.value * item.quantity).toFixed(2) }}
              </div>

              <!-- <van-icon
              v-if="!simpleItem"
              size="30"
              style="cursor: pointer; margin-right: 10px"
              name="edit"
              @click="edit(item.id)"
            /> -->

              <button v-if="!simpleItem" class="button is-light">
                <van-icon
                  size="1rem"
                  style="cursor: pointer"
                  name="delete-o"
                  @click="removeItem(item.id)"
                />
              </button>

              <van-stepper
                v-if="!simpleItem"
                style="flex-shrink: 0; margin-right: 1rem"
                v-model="item.quantity"
                input-width="3rem"
                button-size="2.5rem"
                async-change
                @change="onChange(item.id, item.quantity)"
              />
            </div>
          </template>
        </van-card>

        <div
          v-if="!mob"
          class="my-flex"
          style="margin-top: 1rem; flex-shrink: 0"
        >
          <!-- <van-icon
          v-if="!simpleItem"
          size="30"
          style="cursor: pointer; margin-right: 10px"
          name="edit"
          @click="edit(item.id)"
        /> -->
          <van-icon
            @click="removeItem(item.id)"
            style="cursor: pointer; margin-right: 1rem"
            size="1rem"
            name="delete-o"
          />

          <van-stepper
            v-if="!simpleItem"
            style="flex-shrink: 0"
            v-model="item.quantity"
            async-change
            :min="0"
            @change="onChange(item.id, item.quantity)"
          />

          <div
            style="margin-left: 2rem; font-size: 1.5rem; flex-shrink: 0"
            class="pricr"
          >
            {{
              item.prices.price.currency === "USD"
                ? "$"
                : item.prices.price.currency
            }}

            {{ (item.prices.price.value * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>

      <van-popup
        v-model="showEdit"
        round
        position="center"
        :style="{ height: 'auto', padding: '1rem' }"
      >
        <!-- <CartEdit @editDone="showEdit = !showEdit" :x="x" /> -->
      </van-popup>
    </div>
  </client-only>
</template>

<script>
import Helper from "@/assets/js/helper";
// import CartEdit from "@/components/front/common/cart/cart-edit";
// import adder from "@/components/common/basic/adder";
export default {
  // components: { adder, CartEdit },
  props: {
    x: {
      type: Object,
      default() {
        return {};
      },
    },
    readyOnly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    simpleItem: {
      type: Boolean,
      default() {
        return false;
      },
    },
    mob: {
      type: Boolean,
      default() {
        return true;
      },
    },
    readOnly: {
      type: Boolean,
      default() {
        return false;
      },
    },
    showEditBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  computed: {
    item() {
      return this.x;
    },

    thumb() {
      if (!!this.x.product.imglist) {
        let imgs = JSON.parse(this.x.product.imglist);
        return imgs[0].url;
      }
      return this.x.product.media_gallery.length > 0
        ? this.x.product.media_gallery[0].url
        : "";
    },

    formatedCusAtts() {
      return this.item.customizable_options.map((x) => {
        if (x.label === "date") {
          x.values = x.values.map((y) => {
            y.value = new Date(y.values).toLocaleDateString();
            return y.value;
          });
        }
        return x;
      });
    },
  },
  data() {
    return {
      qty: 0,
      showEdit: false,
      editItem: "",
    };
  },
  methods: {
    edit() {
      this.showEdit = !this.showEdit;
    },
    onChange: Helper.debounce(function (id, qty) {
      console.log("%c id,qty", "color:green;font-weight:bold");
      console.log(JSON.stringify(id, qty));

      if (Number(id) < 1) {
        this.removeItem(id);
      } else {
        this.addItem(id, qty);
      }
    }, 1000),

    removeItem(id) {
      this.$store.dispatch("cart/removeItemFromCart", { cart_item_id: id });
    },

    addItem(id, qty) {
      this.$store.dispatch("cart/updateCartItems", {
        cart_item_id: id,
        quantity: qty,
      });
    },
  },
};
</script>

<style lang="scss">
.checkout_line_item .van-card__title {
  font-size: 1.1rem;
  line-height: 1.1rem;
  overflow: inherit;
}
</style>
