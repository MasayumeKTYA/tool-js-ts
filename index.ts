import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
export class Request {
  async post<T, R>(url: string, data: T) {
    const res = await request.post<R>(url, {
      data: { ...data },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("报错");
    }
  }
  async get<T, R>(url: string, data: T) {
    const res = await request.get<R>(url, { params: { ...data } });
    if (res.status >= 500) {
      throw new Error(`${res.status}`);
    }
    return res.data;
  }
}
request.interceptors.response.use(
  function (config) {
    return config;
  },
  function (err) {
    console.log(err.message);

    return Promise.reject(err);
  }
);
