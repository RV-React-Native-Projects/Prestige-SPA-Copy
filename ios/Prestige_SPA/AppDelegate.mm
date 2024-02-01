#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>
#import "RNSplashScreen.h" 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Prestige_SPA";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [GMSServices provideAPIKey:@"AIzaSyB8lC76Arjr09WP2d4h01xJ8-plROGm4vk"];
  // [RNSplashScreen show];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
