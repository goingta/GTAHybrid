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
        <a
          className='listItem-text'
          href='javascript:void(0)'
          onclick={this.anchor.bind(this, this.props.key)}
        >
          {this.props.title}
        </a>
      </View>
    );
  }
}
