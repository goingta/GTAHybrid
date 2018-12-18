import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@doctorwork/components";
import ListItem from "../../components/listItem/listItem";
import ListDetailItem from "../../components/listDetailItem/listDetailItem";
import HybridBridage from "../../utils/GTAHybridBridge";
import "./index.styl";

export default class Index extends Component {
  getInitialState() {
    return { menus: [] };
  }
  componentWillMount() {}

  componentDidMount() {
    HybridBridage.message({
      method: "getApiDoc",
      callback: list => {
        this.setState({ menus: list });
      }
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  buttonClick(msg) {
    HybridBridage.message({
      method: msg.function,
      params: {
        key: "Hello",
        value: "World"
      },
      callback: list => {
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
    this.state = { menus: [] };
  }
}
