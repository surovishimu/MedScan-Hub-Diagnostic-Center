import { useEffect, useState } from "react";
import { FaCalendar, FaEdit, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";




const AlltestList = () => {
    const axiosSecure = useAxiosSecure();

    const [tests, setTests] = useState([])
    console.log(tests);
    useEffect(() => {

        axiosSecure.get('/alltests')
            .then(res => setTests(res.data))
            .catch(error => console.error("Error fetching data:", error));
    }, [axiosSecure]);


    const handleDelete = (test) => {
        swal({
            title: "Are you sure?",
            text: "Do you want to Delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axiosSecure.delete(`/alltests/${test._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {

                            swal("Your appointment has been canceled successfully", {
                                icon: "success",
                            });
                            setTests((prevTests) => prevTests.filter((t) => t._id !== test._id));
                        }
                    })
                    .catch((error) => {
                        console.error("Error cancelling appointment:", error);
                        swal("An error occurred while cancelling the appointment. Please try again.", {
                            icon: "error",
                        });
                    });
            }
        });
    };
    return (
        <div>
            <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2  mb-10 inline-block">
                Explore Our <span className="font-semibold text-4xl text-amber-500">Test Options</span>
            </h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-green-200">
                    {/* head */}
                    <thead>
                        <tr className="">

                            <th>#</th>
                            <th>Test Name</th>
                            <th>Price</th>
                            <th>Reservations</th>
                            <th className="">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((test, index) => (
                            <tr key={test._id}>

                                <td>
                                    {index + 1}
                                </td>
                                <td className="font-semibold">
                                    {test.title}
                                </td>
                                <td className="font-semibold">{test.price}$</td>
                                <Link to={`/admindashboard/reservation/${test._id}`}>
                                    <th>
                                        <button className="btn btn-ghost text-lg"><FaCalendar></FaCalendar></button>
                                    </th></Link>
                                <th>
                                    <button onClick={() => { handleDelete(test) }} className="btn btn-ghost text-lg"><FaTrashAlt></FaTrashAlt></button>
                                    <Link to={`/admindashboard/testlist/${test._id}`}>
                                        <button className="btn btn-ghost text-lg"><FaEdit></FaEdit></button></Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AlltestList;