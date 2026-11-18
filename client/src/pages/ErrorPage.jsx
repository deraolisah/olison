import { Link } from "react-router-dom";

export default function ErrorPage() {
  
  return (
    <section className="py-32 text-center">
      <h1 className="text-[8rem] font-serif text-primary leading-none">404</h1>
      <p className="text-text/70 mt-2">This page doesn't exist.</p>
      <Link to="/" className="cta mt-8 inline-flex">Back home</Link>
    </section>
  );
}