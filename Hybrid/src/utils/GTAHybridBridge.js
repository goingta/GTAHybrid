import { NativeModules } from "react-native";

export default {
  getCallbackId(callback) {
    let timestamp = new Date().getTime();
    let callbackId = "GTAHybrid" + timestamp;
    window[callbackId] = callback;
    return callbackId;
  },
  message(params) {
    if (process.env.TARO_ENV == "rn") {
      const { RNBridge } = NativeModules;
      if (params.callback) {
        let callback = params.callback;
        delete params.callback;
        RNBridge.command(params, callback);
      } else {
        RNBridge.command(params);
      }
    } else if (window.webkit) {
      try {
        if (params.callback) {
          params["callbackId"] = this.getCallbackId(params.callback);
          delete params.callback;
        }

        window.webkit.messageHandlers.hybridHandle.postMessage(params);
      } catch (error) {
        console.error("The native context not exist ");
      }
    } else {
      alert("请在移动端容器中运行");
    }
  },
  getHybridUrl(json) {
    return `gtahybrid://action?method=${json.method}&params=${JSON.stringify(
      json.params
    )}&callbackId= ${this.getCallbackId(json.callback)}`;
  }
};
