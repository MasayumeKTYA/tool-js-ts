interface WXrequestType {
  url: string;
  timeout?: number;
}
interface RequestOptions<T> {
  isShowToast: boolean;
  data?: T;
}
interface response<D> {
  code: number;
  msg: string;
  data: D;
}
export class WXrequest {
  url: string;
  timeout: number | undefined;
  constructor(config: WXrequestType) {
    this.url = config.url;
    this.timeout = config.timeout;
  }

  post<T extends AnyObject, D>(
    url: string,
    data: RequestOptions<T>
  ): Promise<D> {
    if (data.isShowToast) {
      wx.showLoading({
        title: "加载中...",
      });
    }

    return new Promise((resolve, reject) => {
      const params: WechatMiniprogram.RequestOption = {
        method: "POST",
        url: this.url + url,
        timeout: this.timeout === undefined ? 6000 : this.timeout,
        success: (res) => {
          if (res.statusCode >= 500) {
            if (data.isShowToast) {
              wx.hideLoading();
            }
            wx.showToast({
              title: "服务端错误",
              icon: "none",
            });

            reject({ status: res.statusCode, msg: "服务端错误" });
          }
          if (res.statusCode >= 400) {
            if (data.isShowToast) {
              wx.hideLoading();
            }
            wx.showToast({
              title: "客户端错误",
              icon: "none",
            });

            reject({ status: res.statusCode, msg: "客户端错误" });
          }
          const response = res.data as response<D>;
          //自定义部分
          if (response.code === 201) {
            if (data.isShowToast) {
              wx.hideLoading();
            }
            wx.showToast({
              title: "自定义端错误",
              icon: "none",
            });
            reject({ status: res.statusCode, msg: "自定义端错误" });
          }
          if (data.isShowToast) {
            wx.hideLoading();
          }
          resolve(response.data);
        },
        fail: (err) => {
          if (data.isShowToast) {
            wx.hideLoading();
          }
          wx.showToast({
            title: "请求拒绝",
            icon: "error",
          });

          reject(err);
        },
      };

      if (Object.keys(data).length !== 1) {
        Object.defineProperty(data, "isShowToast", {
          enumerable: false,
        });
        params.data = { ...data };
      }
      wx.request(params);
    });
  }
}
