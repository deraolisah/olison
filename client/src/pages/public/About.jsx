import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryGrid from "../../components/about/CategoryGrid";
import hero from "../../assets/hero.jpg";

import why1 from "../../assets/why-1.png";
import why2 from "../../assets/why-2.png";
import why3 from "../../assets/why-3.png";

const why = [
  {
    img: why1,
    title: "ETHICAL TRADING",
    desc: "We are committed to responsible trading habits as it's an important objective for our company. We ensure our commitments are fulfilled.",
  },
  {
    img: why2,
    title: "QUALITY SERVICE",
    desc: "We pride ourselves on delivering great products and services to our customers every day, which in-turn, plays an important role in contributing to the development of our business and the society.",
  },
  {
    img: why3,
    title: "VARIETY",
    desc: "As one of the leading retailers in Nigeria, providing quality products at fair prices is our goal. Customers continue to rate us over our competitors on product variety, and quality.",
  },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="pt-24 text-center">
        <div className="container-page">
          <motion.h1
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl leading-tight font-serif"
          >
            Everything you need <br />
            <span className="text-primary">in one place.</span>
          </motion.h1>

          <p className="max-w-172.5 mx-auto mt-6 text-text/80">
            Find sustainable, everyday-essentials without the hassle of hours
            on research. We put the best brands front and center. So you'd get
            the best items you're looking for.
          </p>

          <div className="mt-6.5 mb-10 flex flex-wrap justify-center gap-3">
            <Link to="/" className="cta">Start Shopping</Link>
            <Link to="/about" className="cta cta-2 hidden md:flex">Learn More</Link>
          </div>

          <img
            src={hero}
            alt="Olison Store"
            className="rounded-2xl w-full max-h-130 object-cover
                       mask-[linear-gradient(white,transparent)]
                       [-webkit-mask-image:linear-gradient(white,transparent)]
                       border border-black/50 shadow-lg shadow-black/5
                       "
          />
        </div>
      </section>

      {/* WHY */}
      <section className="bg-bg-alt border-y border-black/5 py-24">
        <div className="container-page">
          <h2 className="text-center">
            <span className="[WebkitTextStroke:0.4px_#420235] [WebkitTextFillColor:transparent]">Why</span> Pick Olison?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {why.map((w) => (
              <div key={w.title} className="flex flex-col gap-4">
                <img src={w.img} alt="" className="w-16 h-16 object-contain" />
                <h4 className="font-bold tracking-wide">{w.title}</h4>
                <p className="text-sm text-text/70">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 text-center">
        <div className="container-page">
          <h2>About Olison Super Stores</h2>
          <p className="max-w-180 mx-auto mt-4 text-text/80">
            We are a large scaled retail store operated on a cashier-service
            basis, selling groceries, provisions, drinks & wines, cosmetics,
            baby/dairy products, and an assortment of household items…
          </p>
          <div className="w-full max-w-200 h-55 bg-black/5 rounded-xl mx-auto mt-8" />
        </div>
      </section>

      {/* CATEGORIES */}
      <CategoryGrid />

      <div className="container-page grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
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

      {/* INFO */}
      <section className="py-24">
        <div className="container-page max-w-300">
          <h2 className="text-center">More Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <div className="md:text-right md:items-end flex flex-col gap-4">
              <h3 className="text-[2.2rem]">Our Locations</h3>
              <p className="text-sm text-text/80">
                <b>Head Office:</b> <br />
                No. 38 Mbonu Street, D-line, <br />
                Port-Harcourt. Rivers State. Nigeria.

                <span className="my-3.5 flex"></span>

                <b>Branch Office:</b> <br />
                Ada-George Road, by Gateway Junction, Elioparanwa, <br />
                Port-Harcourt. Rivers State. Nigeria.
              </p>
              <a className="cta" href="https://maps.google.com" target="_blank" rel="noreferrer">
                Get Directions
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[2.2rem]">Hours Open</h3>
              <p className="text-sm text-text/80 leading-loose">
                <b>Tue:</b> 8:00 am – 8:00 pm <br />
                <b>Mon:</b> 8:00 am – 8:00 pm <br />
                <b>Wed:</b> 8:00 am – 8:00 pm <br />
                <b>Thu:</b> 8:00 am – 8:00 pm <br />
                <b>Fri:</b> 8:00 am – 8:00 pm <br />
                <b>Sat:</b> 8:00 am – 8:00 pm <br />
                {/* <b>Sun:</b> Closed */}
              </p>
              <Link to="/contact" className="cta self-start">View Schedule</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}