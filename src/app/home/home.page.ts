import { Component, OnInit } from '@angular/core';
import { TokenResponse } from '@capacitor-community/stripe/dist/esm/definitions';
import { Plugins } from '@capacitor/core';
import { StripeService } from '../api/stripe.service';
const { Stripe } = Plugins;



 
// import { StripePlugin } from '@capacitor-community/stripe';
// import '@capacitor-community/stripe'; // only if you want web support




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  constructor(
    public ajax: StripeService
  ) {
    
  }
  
  ngOnInit() {
    this.strnewLoad();
  }
  async strnewLoad() {
 
    await Stripe.setPublishableKey({ key: 'pk_test_51IduV0K4u4NGt4AD0Y3ezdwepw9VwQNfSsvQg3pKYiHlptPyWYI0LnOsNPI5sk8oqnw0CQVo3CD5Q4WqgP8GFdEN00JcmrOLb9' });
  }

  async googPay() {
   
    
    
    const { success, token } = await Stripe.payWithGooglePay({
      googlePayOptions: {
        merchantName: 'Merchant',
        currencyCode: 'USD',
        totalPrice: '1.99',
        totalPriceStatus: 'FINAL',
        allowedAuthMethods: [
          'PAN_ONLY',
          'CRYPTOGRAM_3DS',
        ],
        allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
        billingAddressRequired: false,
        shippingAddressRequired: false,
        emailRequired: false,
      },
    });
    if (success) {
      console.log(success);
      
      const { id } = JSON.parse(token.paymentMethodData.tokenizationData.token ) as TokenResponse;
      // Here you must confirming the payment intent (id is tok_...)
     
      console.log(id);

      
    } 
  }



  async goog2() {

    await Stripe.payWithGooglePay({
      googlePayOptions: { // just demo options
        currencyCode: 'USD',
        totalPrice: "2.00",
        totalPriceStatus: 'FINAL',
        allowedAuthMethods: ['PAN_ONLY'],
        allowedCardNetworks: ['VISA'],
      },
    });

  }

  async apple() {
    const { token } = await Stripe.payWithApplePay({
      applePayOptions: {
        merchantId: 'merchant.org.example',
        country: 'US',
        currency: 'USD',
        items: [
          {
            label: 'MacBook',
            amount: 2989,
          },
          {
            label: 'Shipping',
            amount: 4.99,
          },
          // The last item must be the final amount!
          // See: https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916119-total
          {
            label: 'Merchant',
            amount: 2993.99,
          }
        ],
      },
    });
    // The dialog with Apple Pay is now visible to the customer
    try {
      // Here you must confirming the payment intent (token is tok_...)
      // When successful, you show SUCCESS to the client via following line:
      await Stripe.finalizeApplePayTransaction({ success: true });
    } catch (e) {
      // When confirming the payment intent fails you must inform the user, too:
      await Stripe.finalizeApplePayTransaction({ success: false });
    }
  }

  async april() {

    const { success, token } = await Stripe.payWithGooglePay({
      googlePayOptions: {
        merchantName: 'Merchant',
        currencyCode: 'USD',
        totalPrice: '1.99',
        totalPriceStatus: 'FINAL',
        allowedAuthMethods: [
          'PAN_ONLY',
          'CRYPTOGRAM_3DS',
        ],
        allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
        billingAddressRequired: false,
        shippingAddressRequired: false,
        emailRequired: false,
      },
    });
    if (success) {
      console.log(success);
      console.log(success);
     //
      
      
      const { id } = JSON.parse(token.paymentMethodData.tokenizationData.token ) as TokenResponse;
      // Here you must confirming the payment intent (id is tok_...)
      const clientSecret = "";
      console.log(id);
      console.log(token);
      console.log(id);

      this.ajax.stripeGet().subscribe((data) => {
        console.log(data);
      })
      // await Stripe.confirmPaymentIntent({
      //   clientSecret,
      //   fromGooglePay: true,
      // });

     
      
    } 

  }
}
