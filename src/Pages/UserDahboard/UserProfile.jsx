
import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [userData, setUserData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [allUpazilas, setAllUpazilas] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); // Added state for the selected file
    const [imageUrl, setImageUrl] = useState(null); // Added state for the uploaded image URL

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.email) {
            axiosSecure.get(`/usersemail?email=${user.email}`)
                .then(res => {
                    const firstUser = res.data[0];
                    setUserData(firstUser);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [axiosSecure, user]);

    useEffect(() => {
        fetch('http://localhost:5000/alldistrict')
            .then(res => res.json())
            .then(data => setDistricts(data))
            .catch(error => console.error('Error fetching districts:', error));

        fetch('http://localhost:5000/allupazila')
            .then(res => res.json())
            .then(data => {
                setUpazilas(data);
                setAllUpazilas(data);
            })
            .catch(error => console.error('Error fetching upazilas:', error));
    }, []);

    const handleEditProfile = () => {
        setIsEditable(true);
        setEditedUser({
            name: userData.name || '',
            email: userData.email || '',
            blood: userData.blood || '',
            districtName: userData.districtName || '',
            upazilaName: userData.upazilaName || '',
        });
    };

    const handleCancelEdit = () => {
        setIsEditable(false);
        setEditedUser({});
    };

    const handleSaveChanges = () => {
        // Upload image if a file is selected
        if (selectedFile) {
            uploadImage(selectedFile);
        } else {
            // If no image is selected, update the user data
            updateUserData();
        }
    };

    const updateUserData = () => {
        axiosSecure.put(`/usersemail/${user.email}`, editedUser)
            .then(res => {
                if (res.data.success) {
                    setIsEditable(false);
                    setEditedUser({});
                    toast.success('Your Profile Updated Successfully');
                    setUserData(editedUser);
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        // Set the selected file when the input file changes
        setSelectedFile(e.target.files[0]);
    };
    const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_Key;
    const uploadImage = async (file) => {
        // Upload the image to imgbb
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                // Set the uploaded image URL
                setImageUrl(data.data.url);
                // Update user data with the uploaded image URL
                updateUserDataWithImage(data.data.url);
            } else {
                toast.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Image upload failed');
        }
    };

    const updateUserDataWithImage = (imageUrl) => {
        const updatedUser = { ...editedUser, img: imageUrl };
        axiosSecure.put(`/usersemail/${user.email}`, updatedUser)
            .then(res => {
                if (res.data.success) {
                    setIsEditable(false);
                    setEditedUser({});
                    toast.success('Your Profile Updated Successfully');
                    setUserData(updatedUser);
                }
            })
            .catch(error => {
                console.error('Error updating profile with image:', error);
            });
    };


    return (
        <div className="flex flex-col md:flex-row items-center">

            <div className="md:w-1/3 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar"></label>
                <img src={imageUrl || user.photoURL} alt="User" className="w-44 h-44" />
                {isEditable && (
                    <div>
                        <input
                            type="file"
                            className="mt-2"
                            placeholder="Change Photo"
                            name="avatar"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                )}
            </div>

            <div className="md:w-2/3 max-w-md w-full">
                <h1 className="text-3xl font-bold mb-4">My Profile</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name: {isEditable ? (
                                <input
                                    type="text"
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    name="name"
                                    value={editedUser.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                userData.name
                            )}
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email: {isEditable ? (
                                <input
                                    disabled
                                    type="email"
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                userData.email
                            )}
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Blood Group: {isEditable ? (
                                <input
                                    type="text"
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    name="blood"
                                    value={editedUser.blood}
                                    onChange={handleChange}
                                />
                            ) : (
                                userData.blood
                            )}
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="districtName">
                            District: {isEditable ? (
                                <select
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    name="districtName"
                                    value={editedUser.districtName}
                                    onChange={handleChange}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district) => (
                                        <option key={district._id} value={district.name}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                userData.districtName
                            )}
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upazilaName">
                            Upazila: {isEditable ? (
                                <select
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                    name="upazilaName"
                                    value={editedUser.upazilaName}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Upazila</option>
                                    {upazilas.map((upazila) => (
                                        <option key={upazila.id} value={upazila.name}>
                                            {upazila.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                userData.upazilaName
                            )}
                        </label>
                    </div>


                    {/* Edit Profile Button */}
                    <div className="mb-6">
                        {!isEditable && (
                            <button
                                type="button"
                                className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600 focus:outline-none"
                                onClick={handleEditProfile}
                            >
                                Edit Profile
                            </button>
                        )}
                        {isEditable && (
                            <>
                                <button
                                    type="button"
                                    className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600 focus:outline-none"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-400 focus:outline-none mt-2"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UserProfile;