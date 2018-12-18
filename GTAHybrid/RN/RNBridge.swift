//
//  RNBridge.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/14.
//  Copyright © 2018 goingta. All rights reserved.
//

import Foundation

@objc(RNBridge) //@objc关键字,用于将方法或对象暴露给OC,以供OC调用访问
class RNBridge: NSObject {
    static let shared: RNBridge = RNBridge()
    
    override init() {
        
    }
    
    /// 和业务有关的命令扩展
    ///
    /// - Parameter command: 命令对象
    @objc public func command(_ params: NSDictionary) -> Void {
        let result = self.execute(dic: params, callback: nil)
        print("execute \(result)")
    }
    
    /// 带回调的方法
    ///
    /// - Parameter command: 命令对象
    @objc public func command(_ params: NSDictionary, callback: @escaping RCTResponseSenderBlock) -> Void {
        let result = self.execute(dic: params, callback: callback)
        print("execute \(result)")
    }
    
    func execute(dic: NSDictionary, callback:RCTResponseSenderBlock?) -> Bool {
        let command = Command.init(dic, webView: nil, callback: callback)
        var ret = true
        guard let methodName = command.methodName else { return ret }
        let hybridObj = HybridBridage.init()
        let selector = NSSelectorFromString(methodName)
        let selectorWithParams = NSSelectorFromString("\(methodName):")
        if hybridObj.responds(to: selector) {
            hybridObj.perform(selector)
        } else if hybridObj.responds(to: selectorWithParams) {
            hybridObj.perform(selectorWithParams, with: command, afterDelay: 0)
        } else {
            print("ERROR: Method \(String(describing: methodName)) not defined")
            ret = false
        }
        return ret
    }
}
