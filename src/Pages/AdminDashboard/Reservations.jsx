import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const Reservations = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axiosSecure.get(`/reservations/${id}`);
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, [axiosSecure, id]);

    const handleDelete = (reservation) => {
        swal({
            title: "Are you sure?",
            text: "You want to cancel this reservation?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axiosSecure.delete(`/reservations/${reservation._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            swal("Reservation cancelled successfully", {
                                icon: "success",
                            });
                            setReservations((prevReservations) => prevReservations.filter((r) => r._id !== reservation._id));
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

    const filteredReservations = reservations.filter((reservation) =>
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2 mb-10 inline-block">
                Reservation For <span className="font-semibold text-4xl text-amber-500">This Test</span>
            </h1>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '8px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginRight: '8px',
                        flex: '1',
                    }}
                />
                <button onClick={() => setSearchTerm('')} className="btn btn-sm btn-ghost">
                    Clear
                </button>
            </div>


            {filteredReservations.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full bg-green-200">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient Name</th>
                                <th>Email</th>
                                <th>Test Name</th>
                                <th>Total Bill</th>
                                <th>Report</th>
                                <th>Cancel Reservation</th>
                                <th>Send Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReservations.map((reservation, index) => (
                                <tr key={reservation._id}>
                                    <td>{index + 1}</td>
                                    <td className="font-semibold">{reservation.userName}</td>
                                    <td className="font-semibold">{reservation.email}</td>
                                    <td className="font-semibold">{reservation.testName}</td>
                                    <td className="font-semibold">{reservation.price}</td>
                                    <td className="font-semibold">{reservation.report}</td>
                                    <td className="font-semibold">
                                        <button onClick={() => handleDelete(reservation)} className="btn btn-sm btn-ghost">
                                            Cancel
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/admindashboard/report/${reservation._id}`}>
                                            <button className="btn btn-sm btn-ghost">
                                                Send
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No reservation found</p>
            )}
        </div>
    );
};

export default Reservations;
