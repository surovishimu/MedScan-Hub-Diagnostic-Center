import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



const UpdateTest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [testDetails, setTestDetails] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`/alltests/${id}`);
                setTestDetails(response.data);
            } catch (error) {
                console.error("Error fetching test details:", error);
            }
        };

        fetchData();
    }, [axiosSecure, id]);
    console.log(testDetails);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const image = form.image.value;
        const title = form.title.value;
        const price = form.price.value;
        const description = form.description.value;

        const testInfo = {
            image,
            title,
            price,
            description
        }

        axiosSecure.patch(`/alltests/${id}`, testInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {

                    toast.success('Updated test successfully');
                    setTestDetails((prevDetails) => ({ ...prevDetails, ...testInfo }));
                } else {
                    toast.error('Failed to update test');
                }
                form.reset()
            })



    }
    return (
        <div>
            <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2  mb-10 inline-block">
                Update a <span className="font-semibold text-4xl text-amber-500">Test</span>
            </h1>
            <form className="" onSubmit={handleUpdate}>
                <div className="grid  grid-cols-1 gap-4">
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-bold">
                            Image
                        </label>
                        <input
                            defaultValue={testDetails.image}
                            required
                            type="text"
                            id="image"
                            name="image"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold">
                            Title
                        </label>
                        <input
                            defaultValue={testDetails.title}
                            required
                            type="text"
                            id="title"
                            name="title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-bold">
                            Price
                        </label>
                        <input

                            type="number"
                            id="price"
                            name="price"
                            defaultValue={testDetails.price}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="shortDescription" className="block text-gray-700 font-bold">
                            Description
                        </label>
                        <textarea
                            defaultValue={testDetails.description}
                            id="shortDescription"
                            name="description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>

                </div>



                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:purple-500 w-full outline-none text-lg"
                    >
                        Update Test
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTest;