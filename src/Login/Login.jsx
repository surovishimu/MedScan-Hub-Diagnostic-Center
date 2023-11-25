import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../../public/image/loginpage-removebg-preview.png';
import logo from '../../public/image/logo.png'
import Social from './Social';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {

    const { signIn } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signIn(email, password)

            .then(() => {
                toast.success(
                    "Loged in successfully",
                    {
                        duration: 6000,
                    }
                );
                navigate(location?.state ? location?.state : '/')

            })
            .catch(error => toast.error(error.message))

    }
    return (
        <div className='bg-green-100'>
            <div className='flex md:flex-row flex-col items-center justify-center pt-5'>
                <div className='flex flex-col -space-y-3'>
                    <img className='w-24 h-20' src={logo} alt="" />
                </div>
                <p className='text-slate-500 md:text-2xl text-lg md:text-left text-center '> Hello again! Thank you for choosing <a href="/" className="text-orange-400 md:text-3xl text-xl font-bold">MedScan <span className='text-green-400 '>Hub.</span></a> {"Let's"} continue your health journey together.</p>
            </div>
            <div className="flex md:flex-row flex-col min-h-screen  items-center justify-around">
                <div className="md:w-1/2 w-full flex-1  ">

                    <img className='w-full' src={loginImage} alt="" />
                </div>


                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 flex-1">

                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-3xl text-center text-slate-700 font-bold mb-4">Login</h2>
                        <form onSubmit={handleLogin} className='p-5'>
                            <div className="mb-4">
                                <input type="email" placeholder="Email" name='email' className="w-full p-2 border rounded focus:outline-none focus:border-green-700" />
                            </div>
                            <div className="mb-4">
                                <input type="password" placeholder="Password"  name='password' className="w-full p-2 border rounded focus:outline-none focus:border-green-700" />
                            </div>
                            <div className="mb-6">
                                <button type="submit" className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600 focus:outline-none">Login</button>
                            </div>
                            <p className="text-sm">
                                {"Don't"} have an account? <Link to="/signup" className="text-green-700">Sign up here</Link>
                            </p>

                        </form>
                        <div className="mt-4">

                            <Social></Social>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
