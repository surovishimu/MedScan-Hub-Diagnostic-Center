import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
const Report = () => {
    const { id } = useParams();
    const uniqueLink = uuidv4();
    const axiosSecure = useAxiosSecure();
    const [reservations, setReservations] = useState({});
    const [test, setTest] = useState({});

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axiosSecure.get(`/reservationsemail/${id}`);
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, [axiosSecure, id]);
    console.log(reservations);
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axiosSecure.get(`/testemail/${id}`);
                setTest(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, [axiosSecure, id]);
    console.log(test);

    const handleReport = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
       
        const gender = form.gender.value;
        const testName = form.testName.value;
        const testDate = form.testdate.value;
        const Glucose = form.glucose.value;
        const Creatinine = form.creatinine.value;
        const Cholesterol = form.cholesterol.value;
        const ALT = form.alt.value;
        const MedicalHistory = form.medicalhistory.value;
        const Conclusion = form.Conclusion.value;
        const LaboratoryInformation = form.LaboratoryInformation.value;
        const Disclaimer = form.Disclaimer.value;


        const testInfo = {
            name, gender, testName, testDate, Glucose, Creatinine, Cholesterol, ALT, MedicalHistory, Conclusion, LaboratoryInformation, Disclaimer, email: reservations.email,
            uniqueLink,
        }

        axiosSecure.post('/report', testInfo)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset()
                    toast.success('Report created successfully');

                }
            });
    }

    return (
        <div>
            <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2  mb-10 inline-block">
                Make a <span className="font-semibold text-4xl text-amber-500">Report</span>
            </h1>
            <form className="" onSubmit={handleReport} >
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold">
                            Name
                        </label>
                        <input
                            defaultValue={test.userName}
                            required
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                
                 
                    
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-gray-700 font-bold">
                            Gender
                        </label>
                        <select
                            required
                            id="gender"
                            name="gender"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"

                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="testName" className="block text-gray-700 font-bold">
                            Test Name
                        </label>
                        <input
                            defaultValue={test.testName}
                            required
                            type="text"
                            id="testName"
                            name="testName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="trstdate" className="block text-gray-700 font-bold">
                            Test Date
                        </label>
                        <input
                            defaultValue={test.date}
                            required
                            type="date"
                            id="trstdate"
                            name="testdate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="glucose" className="block text-gray-700 font-bold">
                            Glucose
                        </label>
                        <select
                            required
                            id="glucose"
                            name="glucose"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"

                        >
                            <option value="" disabled>Select Glucose Level</option>
                            <option value="normal">Normal (70-100 mg/dL)</option>
                            <option value="elevated">Elevated (101-125 mg/dL)</option>
                            <option value="high">High (126 mg/dL and above)</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="creatinine" className="block text-gray-700 font-bold">
                            Creatinine
                        </label>
                        <select
                            required
                            id="creatinine"
                            name="creatinine"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"

                        >
                            <option value="" disabled>Select Creatinine Level</option>
                            <option value="normal">Normal (0.6-1.2 mg/dL)</option>
                            <option value="mild-elevation">Mild Elevation (1.3-1.7 mg/dL)</option>
                            <option value="moderate-elevation">Moderate Elevation (1.8-2.5 mg/dL)</option>
                            <option value="severe-elevation">Severe Elevation (2.6 mg/dL and above)</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cholesterol" className="block text-gray-700 font-bold">
                            Cholesterol
                        </label>
                        <select
                            required
                            id="cholesterol"
                            name="cholesterol"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"

                        >
                            <option value="" disabled>Select Cholesterol Level</option>
                            <option value="normal">Normal (less than 200 mg/dL)</option>
                            <option value="borderline-high">Borderline High (200-239 mg/dL)</option>
                            <option value="high">High (240 mg/dL and above)</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ALT" className="block text-gray-700 font-bold">
                            ALT
                        </label>
                        <select
                            required
                            id="alt"
                            name="alt"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"

                        >
                            <option value="" disabled>Select ALT Level</option>
                            <option value="normal">Normal (7-56 U/L)</option>
                            <option value="mild-elevation">Mild Elevation (57-100 U/L)</option>
                            <option value="moderate-elevation">Moderate Elevation (101-200 U/L)</option>
                            <option value="severe-elevation">Severe Elevation (201 U/L and above)</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="medicalhistory" className="block text-gray-700 font-bold">
                            Medical History
                        </label>
                        <textarea
                            required
                            type="text"
                            id="medicalhistory"
                            name="medicalhistory"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Conclusion" className="block text-gray-700 font-bold">
                            Conclusion
                        </label>
                        <textarea
                            required
                            type="text"
                            id="Conclusion"
                            name="Conclusion"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="LaboratoryInformation" className="block text-gray-700 font-bold">
                            Laboratory Information
                        </label>
                        <textarea
                            required
                            type="text"
                            id="LaboratoryInformation"
                            name="LaboratoryInformation"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Disclaimer" className="block text-gray-700 font-bold">
                            Disclaimer
                        </label>
                        <textarea
                            required
                            type="text"
                            id="Disclaimer"
                            name="Disclaimer"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>


                </div>



                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:purple-500 w-full outline-none text-lg"
                    >
                        Send Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Report;