//
//  Command.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/17.
//  Copyright © 2018 goingta. All rights reserved.
//

import Foundation

typealias ResponseCallback = (Any?) -> Void

class Command: NSObject {
    var params: NSDictionary?
    var callbackId: String?
    var methodName: String?
    var wkWebView: WKWebView?
    var responseCallback: ResponseCallback?
    
//    convenience init(_ params: NSDictionary, callbackId: String, methodName: String, responseCallback: @escaping ResponseCallback) {
//        self.init()
//        self.params = params
//        self.callbackId = callbackId
//        self.methodName = methodName
//        self.responseCallback = responseCallback
//    }
    convenience init(_ dic: NSDictionary) {
        self.init()
        if let params = dic["params"] as? NSDictionary {
            self.params = params
        }
        if let callbackId = dic["callbackId"] as? String {
            self.callbackId = callbackId
        }
        if let methodName = dic["method"] as? String {
            self.methodName = methodName
        }
//        self.responseCallback = dic["params"]
    }
}
