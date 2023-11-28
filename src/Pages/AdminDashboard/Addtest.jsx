import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Addtest = () => {


  const axiosSecure = useAxiosSecure();

  const handleAddTest = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    const price = form.price.value;
    const description = form.description.value;


    const testInfo = {
      image,
      title,
      price,
      description,
      availableDates: [
        {
          "date": "2023-11-30",
          "slots": 3
        },
        {
          "date": "2023-12-01",
          "slots": 3
        },
        {
          "date": "2023-12-02",
          "slots": 3
        },
        {
          "date": "2023-12-03",
          "slots": 3
        },
        {
          "date": "2023-12-04",
          "slots": 3
        },
        {
          "date": "2023-12-05",
          "slots": 3
        },
        {
          "date": "2023-12-06",
          "slots": 3
        },
        {
          "date": "2023-12-07",
          "slots": 3
        },
        {
          "date": "2023-12-08",
          "slots": 3
        },
        {
          "date": "2023-12-09",
          "slots": 3
        }
      ]

    };
    axiosSecure.post('/alltests', testInfo)
      .then(res => {
        if (res.data.insertedId) {
          toast.success('Added test successfully');
          form.reset()
        }
        
      });

  };
  return (
    <div className=" px-20  ">

      <div className="px-10 mb-10 p-5 bg-white rounded-lg shadow-2xl">

        <form onSubmit={handleAddTest} className="">
          <div className="grid  grid-cols-1 gap-4">
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold">
                Image
              </label>
              <input
                required
                type="text"
                id="image"
                name="image"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold">
                Title
              </label>
              <input
                required
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>


            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-bold">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="shortDescription" className="block text-gray-700 font-bold">
                Description
              </label>
              <textarea
                id="shortDescription"
                name="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

          </div>



          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:purple-500 w-full outline-none text-lg"
            >
              Add a Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addtest;
