import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
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
    const subs = this.props.subs.map(sub => {
      return (
        <View>
          <Text className='listDetailItem-detail'>{sub.desc}</Text>
          <Button
            className='listDetailItem-button'
            onclick={this.buttonClick.bind(this, sub)}
          >
            {sub.function}
          </Button>
          <a className='listDetailItem-a' href={"gtahybrid://" + sub.function}>
            {sub.function}
          </a>
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
