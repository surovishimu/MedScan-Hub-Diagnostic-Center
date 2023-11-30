import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = ({ totalPrice }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const applyPromoCode = () => {
        if (promoCode === 'MEDSCAN2023') {
            const discountAmount = totalPrice * 0.05; // 5% discount
            setDiscount(discountAmount);
            setError('');
        } else {
            setDiscount(0);
            setError('Invalid promo code');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error');
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
            }
        }
    };

    return (
        <div className="h-screen">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="mt-4">
                    <label htmlFor="promoCode" className="block text-gray-700 font-bold">
                        Promo Code
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            id="promoCode"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={applyPromoCode}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Apply
                        </button>
                    </div>
                    <p className="text-red-600 mt-2">{error}</p>
                </div>
                <button
                    className="btn-success btn text-white mt-5 w-full"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
                <div className="mt-4">
                    <p className="text-green-600">Total Price : ${totalPrice}</p>
                    {discount > 0 && <p className="text-green-600">Total Price after Discount: ${totalPrice - discount}</p>}
                    {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
                </div>
            </form>
        </div>

    );
};

export default CheckoutForm;
