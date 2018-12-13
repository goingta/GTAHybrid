import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./listItem.styl";

export default class ListItem extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  anchor(name) {
    document.getElementById(name).scrollIntoView();
  }

  render() {
    return (
      <View className='listItem'>
        <Text
          className='listItem-text'
          onclick={this.anchor.bind(this, this.props.key)}
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
}
