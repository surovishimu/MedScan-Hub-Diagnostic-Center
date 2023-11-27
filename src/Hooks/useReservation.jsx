import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useReservation = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: reservation = [] } = useQuery({
        queryKey: ['reservation', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservations?email=${user.email}`);
            return res.data;
        }
    })

    return [reservation, refetch]
};

export default useReservation;