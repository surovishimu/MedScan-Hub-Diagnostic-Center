import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";



const TestDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [testDetails, setTestDetails] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
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

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    if (!testDetails) {
        return <p>Loading...</p>;
    }

    const handleReservation = () => {
        if (!selectedDate) {
            toast.error('Please select a date before booking.');
            return;
        }

        const selectedDateObj = testDetails.availableDates.find(
            (dateObj) => dateObj.date === selectedDate
        );

        if (!selectedDateObj) {
            toast.error('Selected date is not available for booking.');
            return;
        }

        if (user && user.email) {
            const reservationInfo = {
                reserveID: testDetails._id,
                email: user.email,
                name: testDetails.title,
                image: testDetails.image,
                keydetail: testDetails.description,
                time: "8.00 am - 11.00 am",
                date: selectedDate || "",
                price: testDetails.price
            };

            axiosSecure.post('/reservations', reservationInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        navigate(`/userdashboard/payment/${testDetails._id}`);
                    }
                });
        } else {
            navigate('/login', { state: { from: location } });
            toast.error('Please Login for booking a Test');
        }
    };


    return (
        <div className="flex flex-col md:flex-row justify-between h-screen items-center lg:mb-0 md:mb-0 mb-64 p-10">
            <div className="flex-1 space-y-10">
                <img className="h-[70vh] w-5/6" src={testDetails.image} alt={testDetails.title} />
            </div>
            <div className="flex-1 space-y-10">
                <h1 className="text-3xl font-bold mb-5">{testDetails.title}</h1>
                <p>{testDetails.description}</p>
                <p className="text-2xl">Price: {testDetails.price} ৳</p>
                <div>
                    <h2 className="text-2xl font-bold mb-3">Select a Date:</h2>
                    <input className="mb-2" type="date" value={selectedDate} onChange={handleDateChange} />
                </div>
                {selectedDate && (
                    <div>
                        <h2 className="text-2xl font-bold mb-3">Available Slots for {selectedDate}:</h2>
                        {testDetails.availableDates.some((dateObj) => dateObj.date === selectedDate) ? (
                            <p className="bg-amber-200 w-72 text-center mb-4"><span className="text-xl font-bold ">
                                {testDetails.availableDates.find((dateObj) => dateObj.date === selectedDate).slots}</span> slots are available for this date. </p>
                        ) : (
                            <p className="text-red-500 ">No information available for the selected date.</p>
                        )}
                    </div>
                )}

                <button onClick={handleReservation} className="btn bg-green-700 hover:bg-green-700 text-white rounded-none uppercase">Book this Test</button>


            </div>
        </div>
    );
};

export default TestDetails;
