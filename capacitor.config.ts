import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.backrrr',
  appName: 'backrrr',
  webDir: 'dist',
  plugins: {
    BackgroundMode: {
      ios: {
        batteryMonitoringEnabled: true,
        preventSuspend: true
      },
      android: {
        notificationTitle: "App is running in background",
        notificationText: "Tap to open the app"
      }
    }
  }
};

export default config;
