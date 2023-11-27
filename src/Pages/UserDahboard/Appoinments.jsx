
import swal from "sweetalert";
import useReservation from "../../Hooks/useReservation";
import { MdOutlineCancel } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Appointments = () => {
    const [reservations, refetchReservations] = useReservation();
    const axiosSecure = useAxiosSecure();

    const handleCancellation = (reservation) => {
        swal({
            title: "Are you sure?",
            text: "Do you want to cancel?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axiosSecure
                    .delete(`/reservations/${reservation._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetchReservations();
                            swal("Your appointment has been canceled successfully", {
                                icon: "success",
                            });
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
            <h1 className="text-3xl border-r-4 border-green-700 pr-2  mb-10 inline-block">
                Your Upcoming <span className="font-semibold text-4xl text-amber-500">Appointments</span>
            </h1>

            {reservations.length === 0 ? (
                <p className="text-center text-2xl mt-4">You have no upcoming appointments.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th>#</th>
                                <th>Test Name</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Cancel Appointments</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {reservations.map((aReservation, index) => (
                                <tr key={aReservation._id} className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{aReservation.name}</td>
                                    <td>{aReservation.keydetail}</td>
                                    <td>{aReservation.date}</td>
                                    <td>{aReservation.time}</td>
                                    <td className="text-center">
                                        <button onClick={() => handleCancellation(aReservation)}>
                                            <MdOutlineCancel className="text-xl text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Appointments;
