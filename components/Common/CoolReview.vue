<template>
  <div>
    <div class="reviewss">
      <div
        class="yotpo yotpo-main-widget"
        data-product-id="10"
        data-price="Product Price"
        data-currency="Price Currency"
        data-name="Product Title"
        data-url="The url of your product page"
        data-image-url="The product image url"
      ></div>

      <div class="yotpo bottomLine" data-yotpo-product-id="10"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    (function e() {
      var e = document.createElement("script");
      (e.type = "text/javascript"),
        (e.async = true),
        (e.src =
          "//staticw2.yotpo.com/y1AJplsTShg6Tfy7WpqCTKDhJTwjqfSPpvgO6Xge/widget.js");
      var t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(e, t);
    })();
  },
};
</script>

<style lang="scss" scoped></style>
