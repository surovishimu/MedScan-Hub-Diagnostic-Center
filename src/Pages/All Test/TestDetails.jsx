import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TestDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [testDetails, setTestDetails] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

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

    return (
        <div className="flex flex-col md:flex-row justify-between h-screen items-center">
            <div className="flex-1 space-y-10">
                <img className="h-[70vh] w-5/6" src={testDetails.image} alt={testDetails.title} />
            </div>
            <div className="flex-1 space-y-10">
                <h1 className="text-3xl font-bold mb-5">{testDetails.title}</h1>
                <p>{testDetails.description}</p>
                <p className="text-2xl">Price: {testDetails.price} ৳</p>
                <div>
                    <h2 className="text-2xl font-bold mb-3">Select a Date:</h2>
                    <input type="date" value={selectedDate} onChange={handleDateChange} />
                </div>
                {selectedDate && (
                    <div>
                        <h2 className="text-2xl font-bold mb-3">Available Slots for {selectedDate}:</h2>
                        {testDetails.availableDates.some((dateObj) => dateObj.date === selectedDate) ? (
                            <p className="bg-amber-200 w-72 text-center"><span className="text-xl font-bold">
                                {testDetails.availableDates.find((dateObj) => dateObj.date === selectedDate).slots}</span> slots are available for this date. </p>
                        ) : (
                            <p className="text-red-500">No information available for the selected date.</p>
                        )}
                    </div>
                )}
                <button className="btn bg-green-700 hover:bg-green-700 text-white rounded-none uppercase">Book this Test</button>

            </div>
        </div>
    );
};

export default TestDetails;
