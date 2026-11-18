export default function Contact() {
  return (
    <section className="py-24">
      <div className="container-page max-w-250">
        <h1 className="text-center text-[3.5rem] text-primary">Visit Us</h1>
        <p className="text-center text-text/70 mt-2">
          Come say hello or drop us an email
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="card">
            <h3 className="text-xl mb-2">Head Office</h3>
            <p className="text-sm text-text/70">
              No. 38 Mbonu Street, D-line,<br />
              Port-Harcourt. Rivers State. Nigeria.
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl mb-2">Branch Office</h3>
            <p className="text-sm text-text/70">
              Ada-George Road, by Gateway Junction,<br />
              Elioparanwa, Port-Harcourt.
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl mb-2">Call Us</h3>
            <a href="tel:0803312620" className="text-primary font-semibold">
              0803 312 620
            </a>
          </div>
          <div className="card">
            <h3 className="text-xl mb-2">Email</h3>
            <a
              href="mailto:olisonsuperstores@gmail.com"
              className="text-primary font-semibold break-all"
            >
              olisonsuperstores@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}