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
    var responseCallback: RCTResponseSenderBlock?
    
    convenience init(_ dic: NSDictionary, webView: WKWebView?, callback: RCTResponseSenderBlock?) {
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
        self.wkWebView = webView
        self.responseCallback = callback
    }
}
