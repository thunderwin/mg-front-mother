const Helper = {
  formartAddress: (r) => {
    return {
      address1: r.address1,
      address2: r.address2,
      city: r.city,
      company: r.company,
      country: r.country,
      firstName: r.firstName,
      lastName: r.lastName,
      phone: r.phone,
      province: r.province,
      zip: r.zip,
    };
  },

  swapArr(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },

  formatDomain(host) {
    // 必须从域名上获取到这个网站的主打语言和店铺配置名字
    // 域名标示一切，www.xx.com 一定是英文，
    // 任何一个网站的域名都要变成   en.domain  的形式统一起来

    if (host.indexOf(":") > 0) {
      console.dir("说明这个域名带端口，去掉先");
      host = host.split(":")[0];
    }

    if (host.split(".").length === 2) {
      // 如果只有两位，说明省略拉www, 帮加上
      host = "www." + host;
    }

    console.dir("处理后一定是这样的格式 xxx.xxxx.xxx");
    console.log(JSON.stringify(host));

    host = host.split(".");

    if (host[1] === "thousandcountry") {
      console.dir("来管理的");
      return host[0] + "-thousandcountry";
    }

    if (host[1] === "tokwork") {
      console.dir("二级域名哈 xx-xxx.tokwork.com");
      if (host[0] === "www") {
        return "en-tokwork";
      } else {
        return host[0] + "-tokwork";
      }
    }

    if (host[0] === "www") {
      return "en" + "-" + host[1];
    } else {
      return host[0] + "-" + host[1];
    }
  },

  formatBrowerLanguage(str) {
    console.dir("str");
    console.log(JSON.stringify(str));

    //1 获取浏览器的默认语言
    let langs = ["en", "zh-CN", "fr", "de", "ja", "es"];
    let langs2 = langs.map((x) => x.toLowerCase());
    let s2 = str.split(",");
    if (Array.isArray(s2)) {
      console.log("%c chrome 浏览器", "color:green;font-weight:bold");
      s2 = s2[0];
      console.dir("s2");
      console.log(JSON.stringify(s2));
    }

    let index = langs2.findIndex((x) => s2.toLowerCase() === x);
    index = index || 0;
    return langs[index];
  },
  //生成从minNum到maxNum的随机数
  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  },
  // 判断简单对象相同
  isObjectValueEqual(obj1, obj2) {
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
      return false;
    } else {
      for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
          if (!Object.is(obj1[key], obj2[key])) {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    }
  },

  realType(data) {
    // 判断真的类型
    let isArr = Object.prototype.toString.call(data) == "[object Array]";
    if (isArr) {
      return "array";
    }
    return typeof data;
  },
  uniq(array) {
    var temp = {},
      r = [],
      len = array.length,
      val,
      type;
    for (var i = 0; i < len; i++) {
      val = array[i];
      type = typeof val;
      if (!temp[val]) {
        temp[val] = [type];
        r.push(val);
      } else if (temp[val].indexOf(type) < 0) {
        temp[val].push(type);
        r.push(val);
      }
    }
    return r;
  },
};

const deepClone = (obj) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

// 非立即执行就是触发事件后函数不会立即执行，而是在n秒之后才执行，如果n秒内又触发了事件，那就需要重新等待n秒
function debounce(func, wait) {
  let timeout;
  return function () {
    // 保存this和arguments是为了让debounce函数最终返回的函数this指向不变以及依旧能够接收到event参数。
    let ctx = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(ctx, args);
    }, wait);
  };
}

// fn是事件触发执行的函数
// wait是指间隔时长，在wait时间内多次触发函数只会被执行一次
// timeStamp: true时间戳版，false定时器版
function throttle(fn, wait = 1000, timeStamp = false) {
  let previous = 0;
  let timeout;
  return function () {
    let ctx = this;
    let args = arguments;
    if (timeStamp) {
      let now = Date.now();
      if (now - previous > wait) {
        fn.apply(ctx, args);
        previous = now;
      }
    } else {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          fn.apply(ctx, args);
        }, wait);
      }
    }
  };
}
Helper.deepClone = deepClone;
Helper.debounce = debounce;
Helper.throttle = throttle;
export default Helper;
