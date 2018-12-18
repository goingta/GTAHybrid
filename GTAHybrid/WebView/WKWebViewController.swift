//
//  WKWebViewController.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/12.
//  Copyright © 2018 goingta. All rights reserved.
//

import UIKit
import WebKit
import Toast_Swift

class WKWebViewController: UIViewController,WKScriptMessageHandler,WKUIDelegate,WKNavigationDelegate {
    var wkWebView: WKWebView!

    override func viewDidLoad() {
        self.title = "WKWebView"
        self.initUI()
    }
    
    func initUI() {
        let config = WKWebViewConfiguration.init()
        let controller = WKUserContentController.init()
        controller.add(self, name: "hybridHandle")
        config.userContentController = controller
        wkWebView = WKWebView.init(frame: self.view.frame, configuration: config)
        wkWebView.uiDelegate = self
        wkWebView.navigationDelegate = self
        wkWebView.load(URLRequest.init(url: URL.init(string: "http://127.0.0.1:10086/")!))
        self.view.addSubview(wkWebView)
        
        let item = UIBarButtonItem(title: "刷新", style: .plain, target: self, action: #selector(refresh))
        self.tabBarController?.navigationItem.rightBarButtonItem = item
//        self.navigationItem.rightBarButtonItem = item
    }
    
    @objc func refresh() {
        wkWebView.reload()
    }
    
    func swiftClassFromString(className: String) -> AnyObject.Type? {
        let clsName = Bundle.main.infoDictionary!["CFBundleName"] as! String + "." + className
        return NSClassFromString(clsName)
    }
    
    func apiClassName() -> String {
        return "HybridBridage"
    }
    
    func execute(dic: NSDictionary) -> Bool {
        let command = Command.init(dic, webView: wkWebView, callback: nil)
        var ret = true
        guard let hybridClass:NSObject.Type = self.swiftClassFromString(className: self.apiClassName()) as? NSObject.Type else { return ret}
        guard let methodName = command.methodName else { return ret }
        let hybridObj = hybridClass.init()
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

extension WKWebViewController {
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        let title = NSLocalizedString("OK", comment: "OK Button")
        let ok = UIAlertAction(title: title, style: .default) { (action: UIAlertAction) -> Void in
            alert.dismiss(animated: true, completion: nil)
        }
        alert.addAction(ok)
        present(alert, animated: true)
        completionHandler()
    }
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let url = navigationAction.request.url
        if url?.scheme == "gtahybrid", let host = url?.host {
            if host == "action",let dic = url?.query?.urlParametersToDic {
                let result = self.execute(dic: dic)
                print("execute \(result)")
                decisionHandler(.cancel)
                return
            }
        }
        decisionHandler(.allow)
    }
    
    open func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
        switch message.name {
        case "hybridHandle":
            //多个参数
            if let dic = message.body as? NSDictionary {
                let result = self.execute(dic: dic)
                print("execute \(result)")
            }
        default: break
        }
        
    }
}
