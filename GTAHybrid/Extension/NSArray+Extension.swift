//
//  NSArray+Extension.swift
//  GTAHybrid
//
//  Created by goingta on 2018/12/18.
//  Copyright © 2018 goingta. All rights reserved.
//

import Foundation

extension NSArray {
    /// 字典转JSON字符串
    ///
    /// - Returns: JSON字符串
    public func toString() -> String {
        guard JSONSerialization.isValidJSONObject(self) else {
            return ""
        }
        if let jsonData = try? JSONSerialization.data(withJSONObject: self, options: JSONSerialization.WritingOptions.prettyPrinted) {
            if let strJson = String(data: jsonData, encoding: .utf8) {
                return strJson
            }
        }
        return ""
    }
}
