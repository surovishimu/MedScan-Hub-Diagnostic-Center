import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const Popularpackages = () => {
    const axiosPublic = useAxiosPublic();
    const [packages, setPackages] = useState([]);

    axiosPublic.get('/popularPackages')
        .then(response => setPackages(response.data));

    return (
        <div className="mt-16 ">
            <h1 className="text-3xl border-b-2 border-slate-500 pb-2 mb-10">
                Popular <span className="font-semibold text-4xl">Packages</span>
            </h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 mt-10">
                {
                    packages.map((apackage) => (
                        <div key={apackage._id} className="card  bg-base-100 shadow-xl rounded-sm">
                            <figure>
                                <img className="h-52 w-full" src={apackage.image} alt={apackage.title} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{apackage.title}</h2>
                                <p>{apackage.details.slice(0, 50)}...</p>
                                <p>Price:{apackage.price} ৳</p>
                                <div className="card-actions justify-start">
                                    <Link to={`/package/${apackage._id}`}>
                                        <button className="btn bg-green-700 hover:bg-green-700 text-white rounded-none uppercase">Details</button></Link>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default Popularpackages;