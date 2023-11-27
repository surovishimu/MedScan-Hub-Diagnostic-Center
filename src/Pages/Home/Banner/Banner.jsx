import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const Banner = () => {
    const [activeBanner, setActiveBanner] = useState(null);
    const axiosPublic = useAxiosPublic();

    axiosPublic.get('/banners/active')
        .then(response => setActiveBanner(response.data));

    return (
        <div>
            {activeBanner && (
                <div
                    className="relative h-[80vh] bg-cover bg-center flex md:flex-row flex-col items-center justify-around  "
                    style={{ backgroundImage: `url(${activeBanner.image})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="text-slate-200 relative z-10 md:w-6/12 w-full text-center md:text-left space-y-5">
                        <h1 data-aos="fade-right"
                            data-aos-duration="3000" className="text-2xl mb-2">Happy to see you healthy</h1>
                        <h1 data-aos="fade-right"
                            data-aos-duration="3000" className="text-4xl font-bold">{activeBanner.title}</h1>
                        <p data-aos="fade-right"
                            data-aos-duration="3000" className="text-xl mt-2">{activeBanner.description}</p>
                        <div data-aos="zoom-in-up" data-aos-duration="3000">
                            <Link to={'/alltest'}>
                            <button className="bg-green-600 btn text-slate-200 py-2 px-4 rounded mt-4 font-semibold w-44 text-lg outline-none border-none hover:bg-green-600">
                                All Test <BiRightArrowAlt className="inline text-xl" />
                            </button></Link>
                        </div>
                    </div>



                    <div data-aos="zoom-in-left" data-aos-duration="3000" className="relative z-10  md:ml-24 mt-4 md:mt-0   border-l-4 space-x-3 ">

                        <h1 className="text-white font-bold text-3xl ml-2">
                            GET <span className="text-5xl font-bold md:text-green-800 text-white">{activeBanner.discountRate}%</span> OFF
                        </h1>
                        <h1 className="  font-bold bg-green-800 text-slate-300 text-center">
                            <span className="text-sm text-white">VOUCHER CODE</span> <br />
                            <span className="text-xl font-bold  ">{activeBanner.couponCodeName}</span>
                        </h1>

                    </div>


                </div>
            )}
        </div>
    );
};

export default Banner;
