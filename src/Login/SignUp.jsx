import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../../public/image/loginpage-removebg-preview.png';
import logo from '../../public/image/logo.png'
import Social from './Social';
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, handleUpdateprofile } = useContext(AuthContext);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        avatar: '',
        bloodGroup: '',
        district: '',
        upazila: '',
        password: '',
        confirmPassword: '',
    });

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [allUpazilas, setAllUpazilas] = useState([]);

    useEffect(() => {

        fetch('districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data))
            .catch(error => console.error('Error fetching districts:', error));

        fetch('upazilas.json')
            .then(res => res.json())
            .then(data => {
                setUpazilas(data);
                setAllUpazilas(data);
            })
            .catch(error => console.error('Error fetching upazilas:', error));
    }, []);

    const handleDistrictChange = (selectedDistrictId) => {
        setFormData({
            ...formData,
            district: selectedDistrictId,

        });

        const filteredUpazilas = allUpazilas.filter(upazila => upazila.district_id === selectedDistrictId);
        setUpazilas(filteredUpazilas);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const img = form.avatar.value;
        const blood = form.bloodGroup.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const selectedDistrictId = form.district.value;
        const selectedUpazilaId = form.upazila.value;


        const district = districts.find(d => d.id === selectedDistrictId);
        const upazila = upazilas.find(u => u.id === selectedUpazilaId);

        const districtName = district ? district.name : '';
        const upazilaName = upazila ? upazila.name : '';

        console.log(email, name, img, blood, districtName, upazilaName, password, confirmPassword);



        if (password.length < 6) {
            toast.error('password must be at least 6 carecters');
            return;
        }
        else if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error('Your password should have at least one upper case characters');
            return;
        }
        else if (!/[^a-zA-Z0-9]/.test(password)) {
            toast.error('Your password should have at least one special character');
            return;
        }
        createUser(email, password)
            .then(() => {
                const userInfo = {
                    email,
                    name,
                    img,
                    blood,
                    districtName,
                    upazilaName,
                    status: 'Active'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            handleUpdateprofile(name, img)
                                .then(() => {
                                    toast.success('user created succesfully');
                                    navigate('/')
                                })
                        }
                    })


            }

            )
            .catch(error => toast.error(error.message))


    };

    return (
        <div className='bg-green-100'>

            <div className="flex md:flex-row flex-col min-h-screen  items-center justify-around">
                <div className="md:w-1/2 w-full flex-1  ">
                    <div className='flex  flex-col items-center justify-center pt-5'>
                        <div className='flex flex-col -space-y-3'>
                            <img className='w-24 h-20' src={logo} alt="" />
                        </div>
                        <p className='text-slate-500 md:ml-5 ml-0 md:text-xl text-lg md:text-left text-center '>Join <a href="/" className="text-orange-400 md:text-2xl text-xl font-bold">MedScan <span className='text-green-400 '>Hub</span></a> community to access personalized health reports and stay informed about your well-being. Sign up now to prioritize your health!  </p>
                    </div>
                    <img className='w-full md:mb-80 mb-0 ' src={loginImage} alt="" />
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 flex-1">

                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-3xl text-center text-slate-700 font-bold mb-4">Sign Up</h2>
                        <form className="h-full" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    placeholder="Image URL"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodGroup">
                                    Blood Group
                                </label>
                                <select
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">
                                    District
                                </label>
                                <select
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    name="district"
                                    value={formData.district}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleDistrictChange(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>Select District</option>
                                    {districts.map(district => (
                                        <option key={district.id} value={district.id}>{district.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upazila">
                                    Upazila
                                </label>
                                <select
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    name="upazila"
                                    value={formData.upazila}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Upazila</option>
                                    {upazilas.map(upazila => (
                                        <option key={upazila.id} value={upazila.id}>{upazila.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-6">
                                <button type="submit" className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600 focus:outline-none">Sign Up</button>
                            </div>
                            <p className="text-sm">
                                Already have an account <Link to="/login" className="text-green-700">Login here</Link>
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
};

export default SignUp;


