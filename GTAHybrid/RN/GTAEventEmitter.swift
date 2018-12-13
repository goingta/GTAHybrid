//
//  GTAEventEmitter.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/12.
//  Copyright © 2018 goingta. All rights reserved.
//

import Foundation

@objc(GTAEventEmitter) //@objc关键字,用于将方法或对象暴露给OC,以供OC调用访问
public class GTAEventEmitter: RCTEventEmitter {
    public static var sharedInstance = GTAEventEmitter()
    //MARK: -生命周期-
    override public init() {
        super.init()
        self.registerNotification()
    }
    
    deinit {
        self.unRegisterNotification()
    }
    
    override public func supportedEvents() -> [String]! {
        return ["RNNoti_loginSuccess", "RNNoti_logout", "RNNoti_doneQuestionnaire"]
    }
    
    //MARK: -逻辑方法-
    func registerNotification () {
//        NotificationCenter.default.addObserver(self, selector: #selector(loginSuccess), name: NSNotification.Name.init(notiLogin), object: nil)
//        NotificationCenter.default.addObserver(self, selector: #selector(logout), name: NSNotification.Name.init(notiLogout), object: nil)
    }
    
    func unRegisterNotification() {
        NotificationCenter.default.removeObserver(self)
    }
    
    class func dispatch(name: String, body: Any?) {
        if (GTAEventEmitter.sharedInstance.bridge != nil) {
            GTAEventEmitter.sharedInstance.sendEvent(withName: name, body: body)
        }
    }
    
    @objc func loginSuccess() {
        if (self.bridge != nil) {
            self.sendEvent(withName: "RNNoti_loginSuccess", body: nil)
        }
    }
    
    @objc func logout() {
        if (self.bridge != nil) {
            self.sendEvent(withName: "RNNoti_logout", body: nil)
        }
    }
}
