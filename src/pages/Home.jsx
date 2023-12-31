import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  {
    /* Import function dispatch to set the trainer name */
  }

  const dispatch = useDispatch();

  {
    /* Import function navigate */
  }

  const navigate = useNavigate();

  {
    /*Function handleSubmit: to get the name of the user in the form */
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainerName(event.target.user.value));
    navigate("/pokedex");
  };

  return (
    <main className="">
      <section className="h-screen grid grid-rows-[1fr_auto]">
        <div className="">
          <div className="relative flex justify-center mt-10 mb-36">
            <img src="/images/pokedexTitle.svg" alt="" />
          </div>
          <h3 className="text-red-600 text-center text-3xl not-italic font-bold">
            Howdy pokemon trainer
          </h3>
          <p className="text-gray-800 text-center text-1xl not-italic font-medium">
            Could you give me your name?
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center p-2 mt-4 mb-4"
          >
            <input
              className="shadow hover:shadow-lg px-2"
              name="user"
              type="text"
              placeholder="your name..."
            />
            <button className="bg-red-600 flex px-6 py-2 items-center text-white">
              Let's go!!
            </button>
          </form>
        </div>
        <footer className="bg-[url('/footer.svg')] bg-cover bg-center h-[200px]"></footer>
      </section>

    </main>
  );
};
export default Home;
