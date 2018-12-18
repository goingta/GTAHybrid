import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@doctorwork/components";
import ListItem from "../../components/listItem/listItem";
import ListDetailItem from "../../components/listDetailItem/listDetailItem";
import HybridBridage from "../../utils/GTAHybridBridge";
import "./index.styl";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    HybridBridage.message({
      method: "getAllApi",
      callback: function(list) {
        // alert(JSON.stringify(list));
      }
    });
  }

  componentDidHide() {}

  buttonClick(msg) {
    HybridBridage.message({
      method: msg.function,
      params: {
        key: "Hello",
        value: "World"
      },
      callback: function(list) {
        alert(JSON.stringify(list));
      }
    });
  }

  render() {
    const lists = this.state.menus.map((menu, index) => {
      return <ListItem {...menu} id={menu.key} key={index} />;
    });
    const listDetails = this.state.menus.map((menu, index) => {
      return (
        <ListDetailItem
          {...menu}
          id={menu.key}
          key={index}
          onButtonClick={msg => this.buttonClick(msg)}
        />
      );
    });

    return (
      <ScrollView className='container'>
        <View className='listView'>{lists}</View>
        <View className='listDetailView'>{listDetails}</View>
      </ScrollView>
    );
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
            },
            {
              desc: "获取所有支持的API",
              function: "getAllApi"
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
