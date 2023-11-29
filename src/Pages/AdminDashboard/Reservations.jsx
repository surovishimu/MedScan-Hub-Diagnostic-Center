import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import swal from "sweetalert";


const Reservations = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [reservations, SetReservation] = useState([]);

    console.log(reservations);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`/reservations/${id}`);
                SetReservation(response.data);
            } catch (error) {
                console.error("Error fetching test details:", error);
            }
        };

        fetchData();
    }, [axiosSecure, id]);
    console.log(reservations);


    const handleDelete = (reservations) => {
        swal({
            title: "Are you sure?",
            text: "You want to cancel this reservation?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axiosSecure.delete(`/reservations/${reservations._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {

                            swal("Reservation cancelled successfully", {
                                icon: "success",
                            });
                            SetReservation((prevReservations) => prevReservations.filter((t) => t._id !== reservations._id));
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
                Reservation For <span className="font-semibold text-4xl text-amber-500">This Test</span>
            </h1>

            {
                reservations.length > 0 ? (<div className="overflow-x-auto">
                    <table className="table table-zebra w-full bg-green-200">
                        {/* head */}
                        <thead>
                            <tr className="">

                                <th>#</th>
                                <th>Patient Name</th>
                                <th>Email</th>
                                <th>Test Name</th>
                                <th>Total Bill</th>
                                <th>Report</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => (
                                <tr key={reservation._id}>

                                    <td>
                                        {index + 1}
                                    </td>
                                    <td className="font-semibold">
                                        {reservation.userName}
                                    </td>
                                    <td className="font-semibold">
                                        {reservation.email}
                                    </td>
                                    <td className="font-semibold">
                                        {reservation.testName}
                                    </td>
                                    <td className="font-semibold">
                                        {reservation.price}
                                    </td>
                                    <td className="font-semibold">
                                        {reservation.report}
                                    </td>
                                    <td className="font-semibold">
                                        <button onClick={() => { handleDelete(reservation) }} className="btn btn-sm btn-ghost">
                                            Cancel Reservation
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>


                    </table>
                </div>)
                    :
                    (<p>No reservation found</p>)
            }


        </div>
    );
};

export default Reservations;