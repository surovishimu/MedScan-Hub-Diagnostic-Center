

const Promotions = () => {
    return (
        <div className="mt-16">
            <h1 className="text-3xl text-right border-r-4 border-green-700 pr-2  mb-10  inline-block">
                Current <span className="font-semibold text-4xl text-amber-500">Promotions </span>
            </h1>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                <div className="card  bg-base-100 shadow-xl image-full">
                    <figure><img src="https://www.swaconhospital.com/wp-content/uploads/2019/09/34-5-reasons-why-you-need-a-regular-checkup-feat-1080x600.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Special Offer: Health Checkup</h2>
                        <p className="text-lg">Avail our special health checkup package at a discounted price.</p>
                        <p className=" ">Get <span className="text-2xl font-bold text-green-500">20%</span> Discount</p>
                        <p>Coupon Code : <span className="underline">SPECIAL20</span></p>

                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl image-full">
                    <figure><img src="https://medlineplus.gov/images/WomensHealthCheckup_Share.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Free Consultation with Doctors</h2>
                        <p className="text-lg">Get a free consultation with our experienced doctors on your first visit.</p>


                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl image-full">
                    <figure><img src="https://mediversity.com/wp-content/uploads/2022/05/istockphoto-692381776-612x612-1.jpeg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Family Health Special</h2>
                        <p className="text-lg">Prioritize your {"family's"} health with our Family Health Special promotion. Book health checkups for the whole family and enjoy discounted rates.</p>
                        <p className=" ">Get <span className="text-2xl font-bold text-green-500">15%</span> Discount</p>
                        <p>Coupon Code : <span className="underline"> FAMILY15</span></p>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Promotions;