import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@doctorwork/components";
import HybridBridage from "../../utils/GTAHybridBridge";
import "./listDetailItem.styl";

export default class ListDetailItem extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  buttonClick(msg) {
    this.props.onButtonClick(msg);
  }

  render() {
    const env = process.env.TARO_ENV;
    const subs = this.props.subs.map((sub, index) => {
      let hybridUrl = HybridBridage.getHybridUrl({
        method: sub.function
      });
      return (
        <View key={index}>
          <Text className='listDetailItem-detail'>{sub.desc}</Text>
          <Button
            className='listDetailItem-button'
            onClick={this.buttonClick.bind(this, sub)}
          >
            <Text className='listDetailItem-button'>{sub.function}</Text>
          </Button>

          {env == "h5" ? (
            <a className='listDetailItem-a' href={hybridUrl}>
              {sub.function}
            </a>
          ) : (
            <View />
          )}
        </View>
      );
    });
    return (
      <View className='listDetailItem'>
        <Text
          id={this.props.key}
          name={this.props.key}
          className='listDetailItem-title'
        >
          {this.props.title}
        </Text>
        {subs}
      </View>
    );
  }
}
