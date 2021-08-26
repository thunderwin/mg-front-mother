const { gClient, restClient } = require("../tool/request");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const injectGadmin = function (req, res, next) {
  console.dir("当前的req参数");
  console.log(JSON.stringify(req.url));

  isInit = req.url.indexOf("store");

  let magento;

  if (!req.headers["website"]) {
    req.headers["website"] = "panama";
  }

  magento = magentos[req.headers["website"]]; // 获取后端权限

  if (req.headers["store"]) {
    let list = magento.list;
    req.storeId = list[req.headers["store"]];
  }

  // ❌ 不一定要带货币
  // if (!req.headers["content-currency"]) {
  //   req.headers["content-currency"] = "USD";
  // }

  if (!req.headers["store"] && isInit < 0) {
    // 如果没带store 同时，也不是初始化请求，就报错
    return next(new APIError("语言代码不存在", 200, true));
  }

  let realtoken = magento.token; // 如果没token就是admin token

  let noneedToken = [
    "/category",
    "/product",
    "/product/",
    "/product/detail",
    "/product/detail-config",
    "/store",
    "/store/",
    "/store/countries",
    "/store/config",
    "/auth/token",
    "/user/create",
    "/category/home",
    "/product/sortedWithAtt",
    "/store/productReviewRatingsMetadata",
    "/store/menu",
    "/event/venueList",
    "/page/homepage",
    "/sms/sendCode",
    "/sms/sendEmail",
    "/push/pushOne",
    "/product/enterpriseList",
    "/product/enterpriseCategory",
    "/product/related",

    "/event/order",
    "/checkout/guestCart",
    "/checkout/cart",

    "/user/emailReg",

    "/guestcheckout/guestCart",
    "/guestcheckout/guestCartCoupon",
    "/guestcheckout/addVirtualProductsToCart",
    "/guestcheckout/addSimpleProductsToCart",
    "/guestcheckout/addConfigurableProductsToCart",
    "/guestcheckout/placeOrder",
    "/guestcheckout/setBillingAddressOnCart", // 设置账单地址
    "/guestcheckout/removeCouponFromCart",
    "/guestcheckout/updateCartItems",
    "/guestcheckout/removeItemFromCart",
    "/guestcheckout/oneStepCreateOrder",

    "/order",

    "/pay",
    "/pay/getOrderByRef",
    "/pay/genQrcode",
    "/pay/confirm",
  ];

  if (!!req.headers["authorization"]) {
    console.log("%c 有token 解析下", "color:green;font-weight:bold");

    // 如果有token 解析下
    let t = req.headers["authorization"];
    t = t.slice(7);

    console.log("%c t", "color:green;font-weight:bold");
    console.log(JSON.stringify(t));

    let userInfo = jwt.verify(t, config.jwtSecret);

    console.log("%c userInfo", "color:green;font-weight:bold");
    console.log(JSON.stringify(userInfo));

    userInfo.userId = userInfo.id; // 聊天哪里需要用
    req.userToken = userInfo.token;
    req.magentoHost = magento.host;
    req.user = userInfo;

    console.dir("当前用户的信息");
    console.log(JSON.stringify(userInfo));
  } else if (!noneedToken.includes(req.path)) {
    console.dir("没带token");
    return next(new APIError("没带token", 200, true));
  }

  // 访客的名义
  let gGuest = gClient(
    null,
    req.headers["content-currency"],
    req.headers["store"],
    magento.host
  );

  // 后台的名义
  let gAdmin = gClient(
    realtoken,
    req.headers["content-currency"],
    req.headers["store"],
    magento.host
  );

  // 某个的用户的名义
  let gUer = gClient(
    req.userToken,
    req.headers["content-currency"],
    req.headers["store"],
    magento.host
  );

  let rest = restClient(realtoken, req.headers["store"], magento.host);
  let restAdmin = restClient(realtoken, null, magento.host);

  req.gAdmin = gAdmin;
  req.gUser = gUer;
  req.rest = rest;
  req.restAdmin = restAdmin;
  req.gGuest = gGuest;
  next();
};

module.exports = injectGadmin;
