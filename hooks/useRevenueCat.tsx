import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { GOOGLE_REVENUE_CAT_API_KEY } from "@env";
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesOffering,
} from "react-native-purchases";

const typesOfMembership = {
  monthly: "payme",
};

const apiKeys = {
  android: GOOGLE_REVENUE_CAT_API_KEY,
  ios: "some_key",
};

export default function useRevenueCat() {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  const isProMember = customerInfo?.activeSubscriptions.includes(
    typesOfMembership["monthly"]
  );

  // console.warn(currentOffering);
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
