//
//  GTAEventEmitter.m
//  GTAHybrid
//
//  Created by goingta on 2018/12/12.
//  Copyright © 2018 goingta. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(GTAEventEmitter, RCTEventEmitter) //RCT_EXTERN_MODULE将模块导出到Reac-Native
+ (id)allocWithZone:(NSZone *)zone {
    static GTAEventEmitter *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}
- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}
RCT_EXTERN_METHOD(supportedEvents)
@end
