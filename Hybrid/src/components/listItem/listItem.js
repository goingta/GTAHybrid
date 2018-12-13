import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import CSSModules from "babel-plugin-react-css-modules";
import styles from "./listItem.styl";

class ListItem extends Component {
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

const result = CSSModules(Table, styles);
console.log(result);

export default result;
