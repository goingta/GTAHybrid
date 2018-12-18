import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@doctorwork/components";
import "./listItem.styl";

export default class ListItem extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  anchor(name) {
    if (process.env.TARO_ENV == "h5") {
      document.getElementById(name).scrollIntoView();
    } else {
    }
  }

  render() {
    return (
      <View className='listItem'>
        <Text
          className='listItem-text'
          onClick={this.anchor.bind(this, this.props.key)}
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
}
