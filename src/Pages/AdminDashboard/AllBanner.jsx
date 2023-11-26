
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BiSolidCircle } from "react-icons/bi";
import { FaRegTrashAlt } from 'react-icons/fa';

import { IoMdCheckmark } from "react-icons/io";
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const BannerTable = () => {

    const axiosSecure = useAxiosSecure();
    const { data: banners = [], refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners');
            return res.data;
        }
    })
    const handleDeleteUser = banner => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {

            if (willDelete) {

                axiosSecure.delete(`/banners/${banner._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                        }
                    })
            }
        });
    }
    const handleBannerSelect = banner => {
        axiosSecure.patch(`/banners/activestatus/${banner._id}`)
            .then(res => {
                console.log(res.data);

                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success('Banner added to the home page successfully');
                }
            })
    }



    return (
        <div className=''>
            <div className="overflow-x-auto ">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Banner Image</th>
                            <th>BannerTitle</th>
                            <th>Coupon Code</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map((banner, index) => <tr key={banner._id}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask  w-12 h-12">
                                            <img src={banner.image} alt="" />
                                        </div>
                                    </div>

                                </div>
                            </td>
                            <td >
                                <p className='truncate'>
                                    {banner.title}
                                </p>
                            </td>
                            <td>{banner.
                                couponCodeName}</td>
                            <th>
                                {
                                    banner.isActive == true ? <button className='text-green-600'><IoMdCheckmark /></button> : <button onClick={() => { handleBannerSelect(banner) }} className='text-red-600'><BiSolidCircle /></button>
                                }

                            </th>
                            <th className='grid  grid-cols-2 mt-3'>
                                <button onClick={() => { handleDeleteUser(banner) }} className='text-red-600 text-lg' ><FaRegTrashAlt></FaRegTrashAlt></button>

                            </th>
                        </tr>)}




                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default BannerTable;
