export default function Features() {
  return (
    <section className="py-16 px-6 bg-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-10">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
          <p>Book your favorite events in just a few clicks.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
          <p>Pay safely through trusted payment gateways.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Verified Listings</h3>
          <p>All events are reviewed and approved.</p>
        </div>
      </div>
    </section>
  );
}
