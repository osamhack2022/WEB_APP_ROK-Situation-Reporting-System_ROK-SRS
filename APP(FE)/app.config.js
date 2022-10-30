import "dotenv/config";

export default {
  expo: {
    name: "RokSrs",
    slug: "roksrs",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/logo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./src/assets/images/logo.png",
      resizeMode: "contain",
      backgroundColor: "#FFFFFF",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.gudmin0526.roksrs",
      buildNumber: "1.0.0",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/logo.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.gudmin0526.roksrs",
      versionCode: 1,
    },
    web: {
      favicon: "./src/assets/images/logo.png",
    },
    extra: {
      eas: {
        projectId: "255449b4-7dc8-430e-87c8-42b409a70f5e",
      },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      appPublicBackendRoot: process.env.APP_PUBLIC_BACKEND_ROOT,
    },
  },
};
