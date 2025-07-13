import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-blue-600 text-white py-20 px-6 text-center">
      <div className="text-3xl font-bold underline text-blue-600">
        Hello Tailwind!
      </div>

      <h1 className="text-4xl font-bold mb-4">Book Events Seamlessly</h1>
      <p className="text-lg mb-6">
        Discover, plan, and book your next event hassle-free.
      </p>
      <button
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
        onClick={() => navigate("/events")}
      >
        Explore Events
      </button>
    </section>
  );
}
