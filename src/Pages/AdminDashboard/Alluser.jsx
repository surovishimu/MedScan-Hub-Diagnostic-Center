import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import toast from "react-hot-toast";
import { GrUserAdmin } from "react-icons/gr";

const Alluser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);

                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user.name}is an Admin Now!`);
                }
            })
    }
    const handleActiveStatus = user => {
        axiosSecure.patch(`/users/blockstatus/${user._id}`)
            .then(res => {
                console.log(res.data);

                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user.name} is Blocked Now`);
                }
            })
    }
    const handleBlockStatus = user => {
        axiosSecure.patch(`/users/activestatus/${user._id}`)
            .then(res => {
                console.log(res.data);

                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user.name} is Active Now`);
                }
            })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-green-200">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>See Info</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <button><GrUserAdmin className="text-2xl text-green-600" /></button>
                                    ) : (
                                        <button onClick={() => handleMakeAdmin(user)} className="">
                                            <FaUsers className="text-2xl text-green-600"></FaUsers>
                                        </button>
                                    )}
                                </td>
                                <td>

                                    {user.status === 'Active' ? <button onClick={() => handleActiveStatus(user)} className="">
                                        Active
                                    </button> :
                                        <button onClick={() => handleBlockStatus(user)} className="">
                                            Blocked
                                        </button>}

                                </td>
                                <td>
                                    <button onClick={() => document.getElementById(`my_modal_${user._id}`).showModal()} className="text-lg text-green-700">
                                        <CiCircleInfo />
                                    </button>
                                    <dialog id={`my_modal_${user._id}`} className="modal">
                                        <div className="modal-box bg-green-200">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <div className="flex md:flex-row flex-col justify-around items-center">
                                                <div>
                                                    <img className="h-32 w-32 rounded-full" src={user.img} alt="" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold  text-slate-700 text-lg">
                                                        Name: <span className=" text-slate-500 font-semibold">{user.name}</span>
                                                    </h3>
                                                    <h3 className="font-bold text-slate-700 text-lg">
                                                        Email: <span className="font-semibold text-slate-500">{user.email}</span>
                                                    </h3>
                                                    <h3 className="font-bold text-slate-700  text-lg">
                                                        Blood Group: <span className="font-semibold text-slate-500">{user.blood}</span>
                                                    </h3>
                                                    <h3 className="font-bold  text-slate-700 text-lg">
                                                        District: <span className="font-semibold text-slate-500">{user.districtName}</span>
                                                    </h3>
                                                    <h3 className="font-bold text-slate-700 text-lg">
                                                        Upazila: <span className="font-semibold text-slate-500">{user.upazilaName}</span>
                                                    </h3>
                                                    <h3 className="font-bold text-slate-700 text-lg">
                                                        Status: <span className="font-semibold text-slate-500">{user.status}</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Alluser;