import { Helmet } from "react-helmet-async";


const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>
                    MedScan Hub | About
                </title>
            </Helmet>
            <div className="mt-10">
                <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2  mb-10 inline-block ml-10">
                    The New Way to <span className="font-semibold text-4xl text-amber-500">Healthy Life</span>
                </h1>
                <p className="text-xl w-5/6 ml-10">
                    <a href="/" className="text-orange-300 text-lg font-bold">MedScan <span className='text-green-300'>Hub</span></a> is committed to render the possible standard service to the people of the country at an affordable cost. This will definitely reduce the burden of the government and will make the path of {"Health for all"}.
                </p>

                <div className="flex lg:flex-row md:flex-col flex-col gap-10 mt-10 mb-5 p-10 bg-slate-200 h-[70vh]">
                    <div className="flex-1">
                        <img src="https://content.jdmagicbox.com/comp/delhi/i9/011pxx11.xx11.210609093122.e2i9/catalogue/ck-birla-hospital-punjabi-bagh-delhi-hospitals-7u48urb5aa.jpg" alt="" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2  mb-10 inline-block">
                            Who<span className="font-semibold text-4xl text-amber-500"> We Are </span>
                        </h1>
                        <p>
                            <a href="/" className="text-orange-300 text-lg font-bold">MedScan <span className='text-green-300'>Hub</span></a> Diagnostic Centre Ltd. is an advanced Centre for diagnostic and medical services. It is one of the prestigious diagnostic complexes of Bangladesh which started its activities in 1983. Popular Diagnostic Centre Ltd. is the largest diagnostic services provider organization in private sector of the country. It is been pioneer in introducing world latest medical equipments and advanced technology to provide round the clock medical investigations and consultancy services. <br />
                            <br />

                            LEGAL STATUS Popular Diagnostic Centre Ltd. is a private limited company registered with the Ministry of Health & Family Welfare, People’s Republic Govt. of Bangladesh having License No. 1275 &688 & Trade License Number TRAD/DSCC/211718/2019
                        </p>
                    </div>
                </div>


                <div className="flex lg:flex-row md:flex-col flex-col gap-10 mt-28 mb-5 px-10">
                    <div className="flex-1 md:mt-0 mt-96">
                        <div className="collapse collapse-plus  p-5">
                            <input className="" type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">
                                Our Goal
                            </div>
                            <div className="collapse-content">
                                <p>To establish a referral Diagnostic and Medical Services Centre.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus  px-5">
                            <input type="radio" name="my-accordion-3" checked="checked" />
                            <div className="collapse-title text-xl font-medium">
                                Our Objective
                            </div>
                            <div className="collapse-content">
                                <ul className="list-disc">
                                    <li>To render the world standard diagnostic service to the people of the country at an affordable cost and in turn to limit the outflow of the patient abroad at the expense of heard earn foreign currency by providing quality diagnostic services.</li>
                                    <li>
                                        Out door basis treatment by renowned General Practitioners, Consultants and Professors in different medical fields.
                                    </li>
                                    <li>
                                        To promote Health Education & Medical Services.
                                    </li>
                                    <li>Day care Centre for follow-up cardiac renal and oncology patients.</li>
                                    <li>
                                        To build a full fledged specialized (Tertiary) Hospital.
                                    </li>
                                    <li>
                                        Set up Satellite collection Centre.
                                    </li>

                                </ul>
                            </div>
                        </div>


                    </div>
                    <div className="flex-1">
                        <img src="https://www.populardiagnostic.com/public/porto/img/aboutus01.jpg" alt="" />
                    </div>
                </div>


                <div className="mt-20">
                    <h1 className="text-3xl text-slate-600 border-r-4 border-green-700 pr-2  mb-10 inline-block">
                        Message From <span className="font-semibold text-4xl text-amber-500">Chairman</span>
                    </h1>


                    <div className="flex lg:flex-row md:flex-col flex-col gap-10  mb-5 px-10 items-center justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold">
                                Late Tahera Akhter
                            </h1>
                            <p className="text-green-700 font-bold mb-10 ">
                                CHAIRMAN
                            </p>


                            <p className="text-xl text-slate-500">
                                After the liberation war, the health sector of Bangladesh was completely deprived due to various political instability and uncertainity. Unfortunately a significant number of people of this country died on that time only because of incomplete diagnosis of disease and lack of better treatment. When the sufferings were beyond the limit, at that time we established Popular Diagnostic Centre Ltd. in Elephant Road, Dhaka. Our goal was to ensure modern treatment facilities for the mass people of the country.
                            </p>



                        </div>
                        <div className="">
                            <img src="https://www.populardiagnostic.com/public/porto/img/chairman.png" alt="" />
                        </div>
                    </div>
                </div>
            </div></>
    );
};

export default AboutUs;