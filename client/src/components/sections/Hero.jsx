import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-[8em] pb-[2em] text-center">
      <div className="container-page">
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          Everything you need <br />
          <span className="text-primary">in one place.</span>
        </motion.h1>

        <p className="max-w-[690px] mx-auto mt-6 text-text/80">
          Find sustainable, everyday-essentials without the hassle of hours on
          research. We put the best brands front and center.
        </p>

        <div className="mt-8 mb-10 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="cta">Start Shopping</Link>
          <Link to="/about" className="cta cta-2">Learn More</Link>
        </div>

        <img
          src="/img/Hero-img.jpg"
          alt="Olison Hero"
          className="rounded-2xl w-full max-h-[520px] object-cover"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>
    </section>
  );
}