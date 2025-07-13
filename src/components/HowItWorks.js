export default function HowItWorks() {
  const steps = ["Browse Events", "Book Tickets", "Enjoy the Experience"];
  return (
    <section className="py-16 px-6 bg-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-10">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center gap-10">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4">
            <p className="text-xl font-bold text-blue-600 mb-2">{i + 1}</p>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
