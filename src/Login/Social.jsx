import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";



const Social = () => {
    const navigate = useNavigate()
    const { googleLogin } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const handleSocialLogin = () => {
        googleLogin()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayname,
                    img: result.user?.photoURL,
                    status: 'Active'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })

            })
            .catch(error => {
                toast.error(error.message)
            })
    }


    return (
        <>
            <div className="divider"></div>
            <div className="flex justify-center">
                <button onClick={handleSocialLogin} className="btn w-full normal-case btn-outline rounded outline-green-600 hover:bg-green-800 hover:border-none"><img className="h-6" src="https://i.ibb.co/J3yZt7b/google.png" alt="" />Continue with Google
                </button>
            </div>
        </>
    );
};

export default Social;