# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

def publicPods
  pod 'WebViewJavascriptBridge'
  pod "Toast-Swift"
  pod "Alamofire"
  pod "URLNavigator"

  #MARK: -- 测试使用
  pod "Reveal-SDK","4", :configurations => ["Debug"]
end

def reactNativePods
  # 'node_modules'目录一般位于根目录中
  # 但是如果你的结构不同，那你就要根据实际路径修改下面的`:path`
  pod "React", :path => "./Hybrid/node_modules/react-native", :subspecs => [
  "Core",
  "CxxBridge", # 如果RN版本 >= 0.47则加入此行
  "DevSupport", # 如果RN版本 >= 0.43，则需要加入此行才能开启开发者菜单
  "RCTText",
  "RCTNetwork",
  "RCTWebSocket", # 调试功能需要此模块
  "RCTAnimation", # FlatList和原生动画功能需要此模块
  "RCTImage",
  # 在这里继续添加你所需要的其他RN模块
  ]
  # 如果你的RN版本 >= 0.42.0，则加入下面这行
  pod "yoga", :path => "./Hybrid/node_modules/react-native/ReactCommon/yoga"
end

target 'GTAHybrid' do
  # Comment the next line if you're not using Swift and don't want to use dynamic frameworks
  use_frameworks!

  # Pods for GTAHybrid

  publicPods

  target 'GTAHybridTests' do
    inherit! :search_paths
    # Pods for testing
  end

  target 'GTAHybridUITests' do
    inherit! :search_paths
    # Pods for testing
  end

end
