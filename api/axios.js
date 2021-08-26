const axios = require("axios");

const discourseConfig = {
  base_url = 'https://www.thousandcountry.com/',
  api_username=""
};

// 创建一个 axios 实例

const service = axios.create({
  baseURL: discourseConfig.base_url,
  timeout: 1000 * 60,
  headers: {
    "Api-Key": discourseConfig.api_key,
    "Api-Username": discourseConfig.api_username,
    "content-type": "application/json",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 发送失败
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    return data;
  },
  (error) => {
    return error.response.data;
  }
);

const post = (url, data, username = "system") => {
  return service.post(url, data, {
    headers: {
      "Api-Username": username,
    },
  });
};

const put = (url, data, username = "system") =>
  service.put(url, data, {
    headers: {
      "Api-Username": username,
    },
  });

const del = (url, data, username) =>
  service.delete(url, {
    data,
    headers: {
      "Api-Username": username,
    },
  });

const get = (url, data, username = "system") =>
  service.get(url, {
    params: data,
    headers: {
      "Api-Username": username,
    },
  });

module.exports = {
  post,
  get,
  del,
  put,
  axios: service,
};
