import { useRef, useState } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Addbanner = () => {
    const formRef = useRef(null);
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        title: '',
        description: '',
        couponCodeName: '',
        discountRate: 0,
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleImageUpload = async () => {
        const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_Key;
        const formDataImgbb = new FormData();
        formDataImgbb.append('image', formData.image);

        try {
            const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formDataImgbb);
            const imgUrl = imgbbResponse.data.data.url;
            return imgUrl;
        } catch (error) {
            console.error('Error uploading image to imgbb:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;

        const title = form.title.value;
        const description = form.description.value;
        const couponCodeName = form.couponCodeName.value;
        const discountRate = form.discountRate.value;
        console.log(name, title, description, couponCodeName, discountRate);
        try {
            const imageUrl = await handleImageUpload();

            const bannerInfo = {
                name,
                image: imageUrl,
                title,
                description,
                couponCodeName,
                discountRate,
                isActive: false,
            };

            await axiosSecure.post('/banners', bannerInfo);
            setFormData({
                name: '',
                title: '',
                description: '',
                couponCodeName: '',
                discountRate: '',
            });
            formRef.current.reset();

            toast.success('Banner created successfully');


        } catch (error) {
            console.error('Error creating banner:', error);
            toast.error('Failed to create the banner. Please try again.');
        }


    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-5 text-center ">Add a Banner</h1>
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className=" mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Banner Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Banner Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>
                <div className="mb-4 ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountRate">
                        Discount Rate
                    </label>
                    <input
                        type="number"
                        id="discountRate"
                        name="discountRate"
                        value={formData.discountRate}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="couponCodeName">
                        Coupon Code Name
                    </label>
                    <input
                        type="text"
                        id="couponCodeName"
                        name="couponCodeName"
                        value={formData.couponCodeName}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>

                <div className="mb-4 col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Banner Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-2 rounded-md w-full"
                    />
                </div>





                <div className="mb-6 col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Banner Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>

                <div className="mb-6 col-span-2">
                    <button
                        type="submit"
                        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                    >
                        Save Banner
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Addbanner;
