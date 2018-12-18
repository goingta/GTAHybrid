//
//  RNBridge.m
//  GTAHybrid
//
//  Created by goingta on 2018/12/14.
//  Copyright © 2018 goingta. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface RCT_EXTERN_MODULE(RNBridge, NSObject) //RCT_EXTERN_MODULE将模块导出到Reac-Native

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_EXTERN_METHOD(command:(NSDictionary *)params)  //RCT_EXTERN_METHOD将方法导出到ReacNative

RCT_EXTERN_METHOD(commandExtension:(NSDictionary *)params callback:(RCTResponseSenderBlock)callback)  //RCT_EXTERN_METHOD将方法导出到ReacNative

@end
