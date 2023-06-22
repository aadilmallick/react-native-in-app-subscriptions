import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { GOOGLE_REVENUE_CAT_API_KEY } from "@env";
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesOffering,
} from "react-native-purchases";

// go to your offerings in revenue cat and get the id of the monthly subscription product
const typesOfMembership = {
  monthly: "payme1:payme-monthly",
};

const apiKeys = {
  android: GOOGLE_REVENUE_CAT_API_KEY,
  ios: "some_key",
};

export default function useRevenueCat() {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  // look at the list of active subscriptions and see if the user has a monthly subscription
  // const isProMember = customerInfo?.activeSubscriptions.includes(
  //   typesOfMembership.monthly
  // );

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
    // const customerInfoUpdatedListener = Purchases.addPurchaserInfoUpdateListener()
    const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  });

  return { isProMember, currentOffering, customerInfo };
}
