//
//  RNViewController.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/12.
//  Copyright © 2018 goingta. All rights reserved.
//

import Foundation

class RNViewController: UIViewController {
    //MARK: -属性-
    let eventEmitter = GTAEventEmitter()
    var moduleName: String?
    //MARK: -生命周期-
    convenience init(moduleName: String) {
        self.init()
        self.moduleName = moduleName
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.initRNView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.setNavigationBarHidden(true, animated: false)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    //MARK: -内部逻辑方法-
    func initRNView() -> Void{
        let jsCodeLocation:URL!
        
        #if DEBUG && !QA
        if UIDevice.isSimulator() {
            self.moduleName = "Home"
            jsCodeLocation = URL(string: "http://127.0.0.1:8081/index.bundle?platform=ios")
            //                        jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil, fallbackExtension: "js")
        } else {
            // 把IP的改为自己电脑， 就可以支持真机调试
            RCTBundleURLProvider.sharedSettings().setDefaults()
            RCTBundleURLProvider.sharedSettings().jsLocation = "10.0.1.16"
            jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: "main", fallbackExtension: "js")
        }
        #else
        //        jsCodeLocation = Bundle.main.url(forResource: "bundle/main", withExtension: "jsbundle")
        jsCodeLocation = CodePush.bundleURL()
        #endif
        //        eventEmitter.bridge = RCTBridge(bundleURL: jsCodeLocation, moduleProvider: nil, launchOptions: nil)
        //        bridge = RCTBridge(bundleURL: jsCodeLocation, moduleProvider: nil, launchOptions: nil)
        if let module = moduleName {
            let rootView = RCTRootView(
                bundleURL: jsCodeLocation,
                moduleName: module,//这里的名字要和index.js中相同
                initialProperties: nil,
                launchOptions: nil
            )
            eventEmitter.bridge = rootView?.bridge
            view = rootView
        } else {
            assert(moduleName != nil,"请输入RN的moduleName")
        }
    }
}
