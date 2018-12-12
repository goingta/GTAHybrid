//
//  WKWebViewController.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/12.
//  Copyright © 2018 goingta. All rights reserved.
//

import UIKit
import WebKit

class WKWebViewController: UIViewController,WKScriptMessageHandler,WKUIDelegate,WKNavigationDelegate {
    var wkWebView: WKWebView!
    
    override func viewDidLoad() {
        self.title = "GTAHybrid"
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
        self.navigationItem.rightBarButtonItem = item
    }
    
    @objc func refresh() {
        wkWebView.reload()
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
        if url?.scheme == "gtahybrid" {
            if let action: String = url?.host {
                print("action: \(action)")
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
                let action: String = (dic["action"] as AnyObject).description
                print("action: \(action)")
                
                if let params: NSDictionary = (dic["params"] as? NSDictionary) {
                    print("params: \(params)")
                } else if let params: String = (dic["params"] as AnyObject).description {
                    print("params: \(params)")
                }
            }
        default: break
        }
        
    }
}
