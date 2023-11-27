import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Recommendations = () => {
    const axiosPublic = useAxiosPublic();
    const [recomms, setRecomm] = useState([]);

    axiosPublic.get('/recommendations')
        .then(response => setRecomm(response.data));

    const carouselSettings = {
        autoPlay: true,
        interval: 3000,
        infiniteLoop: true,
        showThumbs: false,
        legend: false,
    };

    return (
        <div className="mt-16 mb-20">
            <h1 className="text-3xl border-r-4 border-green-700 pr-2  mb-10 inline-block">Wellness
                <span className="text-amber-500 font-semibold"> Tips and Suggestions</span>
            </h1>
            <Carousel {...carouselSettings}>
                {recomms.map((recomm) => (
                    <div
                        className="h-[80vh] w-screen relative"
                        style={{
                            backgroundImage: `url(${recomm.image})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                        key={recomm._id}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                        <div className="absolute inset-0 text-center text-neutral-content flex justify-center items-center  mx-auto  w-3/5">
                            <h1 className="mb-5 text-5xl font-semibold space-y-4 " style={{ lineHeight: '1.5' }}>{recomm.content}</h1>
                        </div>
                    </div>
                ))}
            </Carousel>


        </div>
    );
};

export default Recommendations;
