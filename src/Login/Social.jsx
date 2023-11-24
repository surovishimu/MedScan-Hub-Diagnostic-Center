// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Provider/AuthProvide";
// import toast from "react-hot-toast";



const Social = () => {
    // const navigate = useNavigate()
    // const { googleLogin } = useContext(AuthContext);
    // const handleSocialLogin = (media) => {
    //     media()
    //         .then(() => {

    //             toast.success('User logged in successfully');
    //             navigate('/')
    //         })
    //         .catch(error => {
    //             toast.error(error.message)
    //         })
    // }
    // onClick={() => handleSocialLogin(googleLogin)} 

    return (
        <>
            <div className="divider"></div>
            <div className="flex justify-center">
                <button className="btn w-full normal-case btn-outline rounded outline-green-600 hover:bg-green-800 hover:border-none"><img className="h-6" src="https://i.ibb.co/J3yZt7b/google.png" alt="" />Continue with Google
                </button>
            </div>
        </>
    );
};

export default Social;