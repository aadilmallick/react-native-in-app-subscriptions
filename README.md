# Revenuecat

## Revenue cat installation

```bash
npx expo install expo-dev-client
npx expo install react-native-purchases
```

## useRevenueCat

## Creating a development build

# Navigation

## Navigation screen typing

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
