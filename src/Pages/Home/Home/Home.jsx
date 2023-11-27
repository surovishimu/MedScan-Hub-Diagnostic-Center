import Banner from "../Banner/Banner";
import Popularpackages from "../PopularPackage/Popularpackages";
import Promotions from "../Promotions/Promotions";
import Recommendations from "../Recommendations/Recommendations";


const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <Popularpackages></Popularpackages>
            <Promotions></Promotions>
            <Recommendations></Recommendations>
        </div>
    );
};

export default Home;