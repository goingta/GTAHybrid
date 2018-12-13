import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import ListItem from "../../components/listItem/listItem";
import ListDetailItem from "../../components/listDetailItem/listDetailItem";
import "./index.styl";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  buttonClick(msg) {
    try {
      webkit.messageHandlers.hybridHandle.postMessage({
        action: msg.function,
        params: {
          key: "Hello",
          value: "World"
        }
      });
    } catch (error) {
      console.error("The native context not exist ");
    }
  }

  render() {
    const lists = this.state.menus.map(menu => {
      return <ListItem {...menu} id={menu.key} />;
    });
    const listDetails = this.state.menus.map(menu => {
      return (
        <ListDetailItem
          {...menu}
          id={menu.key}
          onButtonClick={msg => this.buttonClick(msg)}
        />
      );
    });
    console.log(lists);
    return (
      <View className='container'>
        <View className='listView'>{lists}</View>
      </View>
    );

    // <View className='listDetailView'>{listDetails}</View>
  }

  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          title: "基础接口",
          key: "menu-basic",
          subs: [
            {
              desc: "判断当前客户端是否支持指定JS接口",
              function: "checkJsApi"
            }
          ]
        },
        {
          title: "分享接口",
          key: "menu-share",
          subs: [
            {
              desc: "显示分享菜单",
              function: "showMenuShare"
            },
            {
              desc: "隐藏分享菜单",
              function: "hideMenuShare"
            }
          ]
        },
        {
          title: "导航栏",
          key: "menu-navi",
          subs: [
            {
              desc: "导航栏设置",
              function: "setHeader"
            }
          ]
        },
        {
          title: "网络接口",
          key: "menu-network",
          subs: [
            {
              desc: "通过Native发送网络请求出去",
              function: "fetch"
            }
          ]
        },
        {
          title: "loading",
          key: "menu-loading",
          subs: [
            {
              desc: "显示通用全局loading",
              function: "showLoading"
            },
            {
              desc: "隐藏全局loading",
              function: "hideLoading"
            }
          ]
        },
        {
          title: "goto接口",
          key: "menu-goto",
          subs: [
            {
              desc: "跳转Native各种页面，支持Native页面，H5，RN页面",
              function: "goto"
            }
          ]
        }
      ]
    };
  }
}
