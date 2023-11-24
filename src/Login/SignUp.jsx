import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import loginImage from '../../public/image/loginpage-removebg-preview.png';
import logo from '../../public/image/logo.png'
import Social from './Social';

const SignUp = () => {
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
                                    value={formData.email}

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
