export default function About() {
  return (
    <section className="py-24">
      <div className="container-page text-center">
        <h1 className="text-[4rem] md:text-[5rem] text-primary">
          About Olison
        </h1>
        <p className="max-w-[720px] mx-auto mt-6 text-text/80">
          Olison Super Stores is a large-scaled retail store operated on a
          cashier-service basis in Port-Harcourt, Rivers State. We sell
          groceries, provisions, drinks & wines, cosmetics, baby/dairy products,
          and household items at fair prices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          {[
            { title: "Our Mission", body: "To make quality, everyday essentials accessible to every Nigerian household." },
            { title: "Our Vision", body: "To become the most trusted retail brand in Nigeria." },
            { title: "Our Values", body: "Integrity, quality, variety and customer-first service." },
          ].map((c) => (
            <div key={c.title} className="card">
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-text/70">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}