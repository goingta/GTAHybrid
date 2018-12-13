//
//  UIDevice+Extension.swift
//  DoctorHealth
//
//  Created by goingta on 2018/11/16.
//  Copyright © 2018 doctorworker. All rights reserved.
//

import Foundation

extension UIDevice {
    
    class func isSimulator() -> Bool {
        var isSim = false
        #if arch(i386) || arch(x86_64)
        isSim = true
        #endif
        return isSim
    }
}
