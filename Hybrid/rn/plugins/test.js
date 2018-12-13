const babel = require('babel-core');
const plugin = require('./transform');
const template = require('babel-template');

const opts = {
    presets: [require('babel-preset-env')],
    plugins: [
        [
            require('babel-plugin-transform-runtime'),
            {
                useESModules: true
            }
        ],
        require('babel-plugin-transform-react-jsx'),
        plugin
        // require('../../config/helper/replace')
    ]
};

var example = `
alert('test');
function Name () {
    alert("test");
    return <View className='container'>
        <Text>Text</Text>
        <ListView item="AddressRow" more="{hah}" data={list} extra="{itemStyle: styles.item}">
            {
                this.state.data.map((item, index) => {
                    return <Card name={item.key} key={index} className='card' />;
                })
            }
            <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#4c669f', '#3b5998', '#192f6a']}
            >
                <Text>Sign in with Facebook</Text>
            </LinearGradient>
        </ListView>
    </View>
}

export default {
    namespace: '$native',
    state: {},
    reducers: {},
    effects: {
        * login() {
            alert(
                'Alert Title',
                'My Alert Msg',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
    }
};
`;

const { code } = babel.transform(example, opts);
