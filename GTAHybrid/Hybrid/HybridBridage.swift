//
//  HybridBridage.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/17.
//  Copyright © 2018 goingta. All rights reserved.
//

import Foundation

class HybridBridage: NSObject {
    var aInt = 3
    var aStrig = "sss"
    
    @objc func checkJsApi(_ command: Command) {
        print("params \(command.params)")
    }
    
    @objc func getAllApi(_ command: Command) {
        var methodCount:UInt32 = 0
        var result = [String]()
        guard let methodList = class_copyMethodList(HybridBridage.self, &methodCount) else { return }
        //打印方法
        for i in 0..<Int(methodCount) {
            if let method = methodList[i] as? Method {
                result.append(String(_sel:method_getName(method)))
            }
        }
        free(methodList)
        callJSFunction(command, params: result.joined(separator: ","))
    }
    
    func callJSFunction(_ command: Command, params: String) {
        if let callback = command.callbackId {
            //执行相应JS方法
            command.wkWebView?.evaluateJavaScript(callback+"('"+params+"')") { (any, error) in
                if (error != nil) {
                    print("\(String(describing: error))")
                }
            }
            //删除临时用来通信的方法句柄
            command.wkWebView?.evaluateJavaScript("delete window['"+callback+"']") { (any, error) in
                if (error != nil) {
                    print("\(String(describing: error))")
                }
            }
        }
    }
}
