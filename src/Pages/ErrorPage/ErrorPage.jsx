import { Link } from 'react-router-dom';
import errorimg from '../../../public/image/error.png'
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center -space-y-20'>
            <div>
                <img className='' src={errorimg} alt="" />
            </div>
            <div className='text-center'>
                <p className='text-2xl font-semibold text-gray-600'>
                    Sorry, the page you are looking for could not be found.
                </p>
                <Link to={"/"}> <button className="btn hover:bg-green-600 hover:text-black bg-green-900 text-white mt-4 "> <FaHome></FaHome>Go Back to Home</button></Link>
            </div>
        </div>


    );
};

export default ErrorPage;