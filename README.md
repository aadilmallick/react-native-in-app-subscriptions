# Revenuecat

## Revenue cat installation

```bash
npx expo install expo-dev-client
npx expo install react-native-purchases
```

## useRevenueCat

```javascript
import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { GOOGLE_REVENUE_CAT_API_KEY } from "@env";
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesOffering,
} from "react-native-purchases";

const apiKeys = {
  android: GOOGLE_REVENUE_CAT_API_KEY,
  ios: "some_key",
};

export default function useRevenueCat() {
  const [currentOffering, setCurrentOffering] =
    (useState < PurchasesOffering) | (null > null);
  const [customerInfo, setCustomerInfo] =
    (useState < CustomerInfo) | (null > null);

  // check the entitlements to see if the user has the pro membership
  const isProMember = customerInfo?.entitlements?.active?.pro?.isActive;

  useEffect(() => {
    async function initPurchases() {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);

      if (Platform.OS === "ios") {
        await Purchases.configure({ apiKey: apiKeys.ios });
      } else {
        await Purchases.configure({ apiKey: apiKeys.android });
      }

      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();

      setCurrentOffering(offerings.current);
      setCustomerInfo(customerInfo);
    }

    initPurchases().catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(customerInfoUpdated);
    };
  }, []);

  return { isProMember, currentOffering, customerInfo };
}
```

## Creating a development build

Since the react-native-purchases library is incompatible with expo go, we have to create a development build to test our in-app purchases. A development build allows us to debug the app from our IDE, while still being a native app.

This is because of the the `developmentClient` key, which if true, allows us to run a dev client server while running the app on our phone. This is what allows us to debug the app from our IDE.

```json
"build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "apk"
      }
    },
}
```

To start a dev server, run the `npx expo start --dev-client` command.

# Navigation

## Navigation screen typing

We can type our navigation screens so that we have type checking intellisense for our screen name so we don't accidentally enter in the wrong screen name.

1. For the root navigation of your app, define all the screens that exist in your app. Set each screen name as a key, and set their value to the route params they expect, but you can set them to `undefined` at first.

```javascript
export type RootStackParamList = {
  Home: undefined;
  Paywall: undefined;
  DemoScreen: undefined;
  Subscription: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
```

2. In your screen implementations, create a new type based off the root navigation type for typing intellsisense for the `useNavigation()` hook.

```javascript
export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
}
```

# Other

## Rendering nested components

When you define a component inside another component, You can't use angled bracket syntax to render it. You have to invoke the JSX like a function.

```javascript
const App = () => {
  const LockedIcon = () => {
    return (
      <View
        className="absolute right-4 rotate-12 justify-center items-center"
        style={{ top: "20%" }}
      >
        <Ionicons name="lock-closed" size={30} color="white" />
        <Text className="text-white text-center">Pro Only</Text>
      </View>
    );
  };

  return <View>{LockedIcon()}</View>;
};
```

## Icon Ionicons typing

Ever wanted type intellisense for your Ionicons icon without directly rendering it? The `keyof typeof Ionicons.glyphMap` will give you all the available icons you can use as a literal typing.

```javascript
interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
}
```

```javascript
const IconButton = ({ icon }: IconButtonProps) => {
  return (
    <TouchableOpacity>
      <Ionicons name={icon} size={30} color="white" />
    </TouchableOpacity>
  );
};
```

- The `name` prop on the icon has a type of `keyof typeof Ionicons.glyphMap`.

# Nativewind

## Another styling quirk

```javascript
/* ? Ok, I found out what the problem was. Anytime I use a literal tailwind styling 
    value using the [] bracket notation, I can't do it if it requires referencing a variable. 
    Instead, I have to use the `style` prop. I can only do dynamic logic if what's being returned 
    is an actual classname, not a literal tailwind styling. 
    */
const styleClass = `justify-center items-center py-4 px-4 rounded-lg relative ${
  vertical ? "flex-col flex-[0.45]" : "flex-row mb-2 space-x-4"
}`;
```
