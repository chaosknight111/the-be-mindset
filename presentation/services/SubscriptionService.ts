import {Platform} from 'react-native';
import {action} from 'mobx';
import RNIap, {Purchase, PurchaseError} from 'react-native-iap';
import ISubscriptionService from './ISubscriptionService';
import Subscription, {SubscriptionType} from 'entities/Subscription';
import {state} from 'data/store';
import ProductsId, {ProductId} from 'resources/ProductsId';
import IAnalyticsTracker from 'domain/analytics/IAnalyticsTracker';
import {Iap} from 'data/iap';

type PurchaseInfo = {
  productId: string;
  interval: {
    minutes: number;
    hours: number;
    days: number;
    months: number;
  };
  tag: Purchase;
};

export default class SubscriptionService implements ISubscriptionService {
  private isInitialized = false;

  constructor(
    private readonly iap: Iap,
    private readonly analyticsTracker: IAnalyticsTracker,
  ) {}

  initialize() {
    if (!this.isInitialized) {
      this.iap.purchaseUpdatedListener(this.onPurchaseUpdated.bind(this));
      this.iap.purchaseErrorListener(this.onErrorOccurred.bind(this));

      this.isInitialized = true;
    }
  }

  private async onPurchaseUpdated(purchase: Purchase) {
    if (Platform.OS === 'ios') {
      if (purchase.transactionId) {
        await this.iap.finishTransactionIOS(purchase.transactionId);
      }
    } else if (Platform.OS === 'android') {
      if (purchase.purchaseToken) {
        await this.iap.acknowledgePurchaseAndroid(purchase.purchaseToken);
      }
    }

    const result = SubscriptionService.checkPurchase(
      SubscriptionService.preparePurchase(purchase),
    );

    if (result) {
      SubscriptionService.setSelectedSubscription(result.subscriptionType);

      await this.analyticsTracker.trackSubscription({
        key: 'payed',
        subscription: result.subscriptionType,
        rawPurchase: purchase,
      });
    }
  }

  private async onErrorOccurred(error: PurchaseError) {
    console.log(error);

    await this.analyticsTracker.trackSubscription({
      key: 'error',
      errorMessage: error.message,
      errorCode: error.code,
      rawError: error,
    });

    await this.restoreSubscriptions();
  }

  async restoreSubscriptions() {
    await this.iap.initConnection();

    const products = {
      lifelong: await this.getProduct(
        SubscriptionService.getProductId(SubscriptionType.lifelong),
      ),
      monthly: await SubscriptionService.getSubscription(
        SubscriptionService.getProductId(SubscriptionType.monthly),
      ),
      yearlyWithTrial: await SubscriptionService.getSubscription(
        SubscriptionService.getProductId(SubscriptionType.yearlyWithTrial),
      ),
      yearlyOld: await SubscriptionService.getSubscription(
        SubscriptionService.getProductId(SubscriptionType.yearlyOld),
      ),
    };

    const subscriptions: Subscription[] = [
      {
        subscriptionType: SubscriptionType.lifelong,
        localizedPrice: products.lifelong.localizedPrice,
        description: products.lifelong.description,
      },
      {
        subscriptionType: SubscriptionType.yearlyWithTrial,
        localizedPrice: products.yearlyWithTrial.localizedPrice,
        description: products.yearlyWithTrial.description,
      },
      {
        subscriptionType: SubscriptionType.monthly,
        localizedPrice: products.monthly.localizedPrice,
        description: products.monthly.description,
      },
    ];
    SubscriptionService.setSubscriptions(subscriptions);

    await this.restorePurchases();

    await this.iap.endConnectionAndroid();
  }

  @action static setSubscriptions(subscriptions: Subscription[]) {
    state.subscriptions = subscriptions;
  }

  async buySubscription(type: SubscriptionType) {
    const productId = SubscriptionService.getProductId(type);

    await this.iap.initConnection();

    switch (type) {
      case SubscriptionType.monthly:
      case SubscriptionType.yearlyWithTrial:
      case SubscriptionType.yearlyOld:
        await RNIap.requestSubscription(productId, false);
        break;
      case SubscriptionType.lifelong:
        await RNIap.requestPurchase(productId, false);
        break;
    }

    await RNIap.endConnectionAndroid();
  }

  @action static setSelectedSubscription(type: SubscriptionType | undefined) {
    state.selectedSubscription = type;
  }

  async getProduct(productId: string) {
    const products = await this.iap.getProducts([productId]);
    const product = products.find((p) => p.productId === productId);
    if (!product) throw Error('Product not found');
    return product;
  }

  static async getSubscription(productId: string) {
    const products = await RNIap.getSubscriptions([productId]);
    const product = products.find((p) => p.productId === productId);
    if (!product) throw Error('Subscription not found');
    return product;
  }

  static preparePurchase(purchase: Purchase): PurchaseInfo {
    const nowMillis = Date.now();
    const differenceMillis = nowMillis - purchase.transactionDate;

    const minutes = differenceMillis / 1000 / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 31;

    return {
      productId: purchase.productId,
      interval: {
        minutes,
        hours,
        days,
        months,
      },
      tag: purchase,
    };
  }

  static testPurchaseExpiry({
    productId,
    interval: {months, minutes, hours},
  }: PurchaseInfo) {
    if (__DEV__) {
      switch (productId) {
        case SubscriptionService.selectProductId(ProductsId.monthly):
          return minutes < 6;
        case SubscriptionService.selectProductId(ProductsId.yearlyOld):
        case SubscriptionService.selectProductId(ProductsId.yearlyWithTrial):
          return hours < 1;
      }
    }

    switch (productId) {
      case SubscriptionService.selectProductId(ProductsId.monthly):
        return months <= 1;
      case SubscriptionService.selectProductId(ProductsId.yearlyOld):
      case SubscriptionService.selectProductId(ProductsId.yearlyWithTrial):
        return months <= 12;
    }

    return true;
  }

  async restorePurchases() {
    const purchases = (await this.iap.getAvailablePurchases()).map(
      SubscriptionService.preparePurchase,
    );

    let subscriptionType: SubscriptionType | undefined;

    for (let i = 0; i < purchases.length; i += 1) {
      const purchase = purchases[i];
      const result = SubscriptionService.checkPurchase(purchase);
      if (result) {
        subscriptionType = result.subscriptionType;
        break;
      }
    }

    SubscriptionService.setSelectedSubscription(subscriptionType);

    await this.analyticsTracker.trackSubscription({
      key: 'purchasesRestored',
      selectedSubscription: subscriptionType,
      rawPurchases: {purchases},
    });
  }

  private static checkPurchase(
    purchaseInfo: PurchaseInfo,
  ): {purchaseInfo: PurchaseInfo; subscriptionType: SubscriptionType} | undefined {
    if (__DEV__) {
      if (!SubscriptionService.testPurchaseExpiry(purchaseInfo)) return undefined;
    }

    let subscriptionType: SubscriptionType;

    const {productId} = purchaseInfo;

    switch (productId) {
      case SubscriptionService.selectProductId(ProductsId.monthly):
        subscriptionType = SubscriptionType.monthly;
        break;
      case SubscriptionService.selectProductId(ProductsId.yearlyWithTrial):
        subscriptionType = SubscriptionType.yearlyWithTrial;
        break;
      case SubscriptionService.selectProductId(ProductsId.lifelong):
        subscriptionType = SubscriptionType.lifelong;
        break;
      case SubscriptionService.selectProductId(ProductsId.yearlyOld):
        subscriptionType = SubscriptionType.yearlyOld;
        break;
      default:
        return undefined;
    }

    return {
      purchaseInfo,
      subscriptionType,
    };
  }

  static getProductId(type: SubscriptionType) {
    switch (type) {
      case SubscriptionType.monthly:
        return SubscriptionService.selectProductId(ProductsId.monthly);
      case SubscriptionType.yearlyWithTrial:
        return SubscriptionService.selectProductId(ProductsId.yearlyWithTrial);
      case SubscriptionType.lifelong:
        return SubscriptionService.selectProductId(ProductsId.lifelong);
      case SubscriptionType.yearlyOld:
        return SubscriptionService.selectProductId(ProductsId.yearlyOld);
    }
  }

  static selectProductId(productId: ProductId) {
    return Platform.select({
      android: productId.android,
      ios: productId.iOS,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getSelectedSubscription() {
    return state.subscriptions.find(
      (s) => s.subscriptionType === state.selectedSubscription,
    );
  }
}
