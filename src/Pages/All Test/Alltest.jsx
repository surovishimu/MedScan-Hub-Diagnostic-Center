import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const Alltest = () => {
    const axiosPublic = useAxiosPublic();
    const [tests, setTests] = useState([])
    console.log(tests);
    useEffect(() => {
        
        axiosPublic.get('/alltests')
            .then(res => setTests(res.data))
            .catch(error => console.error("Error fetching data:", error));
    }, [axiosPublic]);



    return (
        <div className="mt-5">
            <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2  mb-10 inline-block">
                Explore Our <span className="font-semibold text-4xl text-amber-500">Test Options</span>
            </h1>
            <p className="text-slate-600 font-semibold text-lg w-3/5 mx-auto text-center">
                A regular health check is your significant protection against common diseases. <span className="text-2xl text-amber-500">MedScan Hub</span> Diagnostic Centre Ltd. is an accurate, innovative, and reliable center and is a welcoming place for all patients interested in undergoing a comprehensive medical checkup.
            </p>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-10">
                {
                    tests.map(test =>
                        <div key={test._id} className="card  bg-base-100 shadow-2xl rounded-sm mt-16 flex flex-col-reverse pb-5">
                            <figure className="px-10 pt-10">
                                <img src={test.image} alt="Shoes" className="rounded-sm h-40 w-full" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{test.title}</h2>
                                <p>{test.description.slice(0, 50)}..</p>
                                <div className="card-actions">
                                    <Link to={`/alltests/${test._id}`}>
                                        <button className="btn bg-green-700 hover:bg-green-700 text-white rounded-none uppercase">See Details</button></Link>
                                </div>
                            </div>
                        </div>)

                }
            </div>
        </div>
    );
};

export default Alltest;