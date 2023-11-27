import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [testDetails, setTestDetails] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/alltests/${id}`);
                setTestDetails(response.data);
            } catch (error) {
                // Handle error (e.g., show an error message)
                console.error("Error fetching test details:", error);
            }
        };

        fetchData();
    }, [axiosPublic, id]);
    
    return (

        <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={testDetails?.price}/>
        </Elements>

    );
};

export default Payment;