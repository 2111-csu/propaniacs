import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { callApi } from "../axios-services";
import "./style_assets/payment.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "yellow" },
    },
    invalid: {
      color: "red",
    },
  },
};

export default function PaymentForm({ token, orderId, setCart }) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const completeOrder = await callApi({
      url: `/api/payment/${orderId}`,
      method: "PATCH",
      token,
      data: {
        status: "completed",
      },
    });
    console.log(completeOrder, "clicked = Complete Order");
    setCart([]);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await callApi({
          url: `/api/payment`,
          method: "POST",
          token,
          data: {
            amount: 1000,
            id,
          },
        });
        console.log(response, "response from payment");
        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.error(error, "Payment Error");
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2> Thank you for choosing Strick-Land Propane!</h2>
        </div>
      )}
    </>
  );
}
// const stripePromise = loadStripe(
//   "pk_test_51KwrdhDpvRAdcMotWgYznOcLGPqH3hxmCWkyOmHfyDXCRLNMarMbSbL051E8d7gSzpaQSCHG1Dnj4DbwbPyj8beu00ZvRFH4Sx"
// );

// export default PaymentForm = () => (
//   <Elements stripe={stripePromise}>
//     <Payment />
//   </Elements>
// );
