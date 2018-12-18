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
    @objc public func command(_ params: [String: AnyObject]) -> Void {
        print(params)
    }
}
