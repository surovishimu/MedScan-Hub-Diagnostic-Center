import Banner from "../Banner/Banner";
import Popularpackages from "../PopularPackage/Popularpackages";
import Promotions from "../Promotions/Promotions";


const Home = () => {
    return (
        <div className=""> 
            <Banner></Banner>
            <Popularpackages></Popularpackages>
            <Promotions></Promotions>
        </div>
    );
};

export default Home;