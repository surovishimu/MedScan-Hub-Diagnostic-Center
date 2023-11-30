import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import logo from "../../../public/image/logo.png"

const TestResult = () => {
    const { user } = useAuth()
    const [result, setResult] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axiosSecure.get(`/reportemail?email=${user.email}`);
                setResult(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, [axiosSecure, user.email]);

    console.log(result);
    return (
        <div>
            <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2  mb-10 inline-block">
                Your <span className="font-semibold text-4xl text-amber-500">Test Report</span>
            </h1>
            <div>
                {
                    result.map(res =>
                        <div key={res._id}>

                            <div className="flex justify-around mt-10 border-b-2">
                                <div>
                                    <img className='w-24 h-24' src={logo} alt="" /><a href="/" className="text-orange-500 text-2xl font-bold">MedScan <span className='text-green-500'>Hub</span></a>
                                </div>

                                <div className="text-lg">
                                    <h1><span className="font-semibold">Name:</span> {res.name}</h1>
                                    <h2><span className="font-semibold">Age: </span>{res.age}</h2>
                                    <h2><span className="font-semibold">Weight:</span> {res.weight}kg</h2>
                                    <h2><span className="font-semibold">Blood Group:</span>{res.blood}</h2>
                                    <h2><span className="font-semibold">Gender:</span> {res.gender}</h2>
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <h1 className="text-2xl font-semibold">
                                    {res.testName} Report
                                </h1>

                            </div>
                            <div className="flex justify-around items-center">
                                <div>
                                    <div className="mt-5 ml-10">
                                        <h1><span className="font-semibold">
                                            Glucose:</span> {res.Glucose}</h1>
                                    </div>
                                    <div className="mt-5 ml-10">
                                        <h1><span className="font-semibold">
                                            Creatinine:</span> {res.Creatinine}</h1>
                                    </div>
                                    <div className="mt-5 ml-10">
                                        <h1><span className="font-semibold">
                                            Cholesterol:</span> {res.Cholesterol}</h1>
                                    </div>
                                    <div className="mt-5 ml-10">
                                        <h1><span className="font-semibold">
                                            ALT:</span> {res.ALT}</h1>
                                    </div>
                                    <div className="mt-5 ml-10">
                                        <h1><span className="font-semibold">
                                            MedicalHistory:</span> {res.MedicalHistory}</h1>
                                    </div>
                                    <div className="mt-5 ml-10">
                                        <h1><span className="font-semibold">
                                            MedicalHistory:</span> {res.MedicalHistory}</h1>
                                    </div>
                                    <div className="mt-5 ml-10">
                                        <h1><span className="font-semibold">
                                            Conclusion:</span> {res.Conclusion}</h1>
                                    </div>
                                </div>
                                <div>
                                    <span className="font-semibold">LaboratoryInformation:</span> {res.LaboratoryInformation
                                    }

                                </div>
                            </div>

                            <div className="text-center">
                                Disclaimer : {res.Disclaimer
                                }

                            </div>

                        </div>



                    )
                }
            </div>
        </div>
    );
};

export default TestResult;