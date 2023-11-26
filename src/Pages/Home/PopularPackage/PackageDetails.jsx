import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";


const PackageDetails = () => {
    const { id } = useParams();

    const axiosPublic = useAxiosPublic();
    const [packageDetails, setPackageDetails] = useState(null);

    axiosPublic.get(`/popularPackages/${id}`)
        .then(response => setPackageDetails(response.data))
    if (!packageDetails) {
        return <p>Loading...</p>
    }
    return (
        <div className="flex flex-col md:flex-row justify-between h-screen items-center ">
            <div className="flex-1 space-y-10 ">
                <img className=" h-[70vh] w-5/6" src={packageDetails.image} alt="" />
            </div>
            <div className="flex-1 space-y-10">
                <h1 className="text-3xl font-bold mb-5">{packageDetails.title}</h1>
                <p>{packageDetails.details}</p>
                <p className="text-2xl">Price: {packageDetails.price} ৳</p>
                {/* Add other details as needed */}
            </div>
        </div>

    );
};

export default PackageDetails;