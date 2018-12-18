//
//  String+Extension.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/18.
//  Copyright © 2018 goingta. All rights reserved.
//

import Foundation

extension String {
    /// 从String中截取出参数
    var urlParameters: [String: AnyObject]? {
        // 截取是否有参数
        guard let urlComponents = NSURLComponents(string: self), let queryItems = urlComponents.queryItems else {
            return nil
        }
        // 参数字典
        var parameters = [String: AnyObject]()
        
        // 遍历参数
        queryItems.forEach({ (item) in
            
            // 判断参数是否是数组
            if let existValue = parameters[item.name], let value = item.value {
                // 已存在的值，生成数组
                if var existValue = existValue as? [AnyObject] {
                    
                    existValue.append(value as AnyObject)
                } else {
                    parameters[item.name] = [existValue, value] as AnyObject
                }
                
            } else {
                
                parameters[item.name] = item.value as AnyObject
            }
        })
        
        return parameters
    }
    
    var urlParametersToDic: NSDictionary {
        var queryStrings = [String: String]()
        for pair in self.components(separatedBy: "&") {
            
            let key = pair.components(separatedBy: "=")[0]
            
            let value = pair
                .components(separatedBy:"=")[1]
                .replacingOccurrences(of: "+", with: " ")
                .removingPercentEncoding ?? ""
            
            queryStrings[key] = value
        }
        return queryStrings as NSDictionary
    }
}
