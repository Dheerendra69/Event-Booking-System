const events = [
  { name: "Music Fest 2025", date: "July 20", location: "Delhi" },
  { name: "Tech Conference", date: "Aug 5", location: "Bengaluru" },
  { name: "Startup Pitch Night", date: "Aug 12", location: "Mumbai" }
];

export default function PopularEvents() {
  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-2xl font-bold mb-10">Popular Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold">{event.name}</h3>
            <p>{event.date}</p>
            <p className="text-sm text-gray-500">{event.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
