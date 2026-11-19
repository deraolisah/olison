import { Link } from "react-router-dom";
import cosmeticsImg from "../../assets/dept/cosmetics.jpg";
import groceriesImg from "../../assets/dept/groceries.jpg";
import toiletriesImg from "../../assets/dept/toiletries.jpg";
import fashionImg from "../../assets/dept/fashion.jpg";
import bakeryImg from "../../assets/dept/bakery.jpg";
import drinksImg from "../../assets/dept/drinks.jpg";
import householdImg from "../../assets/dept/household.jpg";
import babyImg from "../../assets/dept/baby.jpg";
import frozenImg from "../../assets/dept/frozen.jpg";
import electronicsImg from "../../assets/dept/electronics.jpg";
import furnitureImg from "../../assets/dept/furniture.jpg";
import gymImg from "../../assets/dept/gym.jpg";

const categories = [
  { slug: "cosmetics", name: "Cosmetics", img: cosmeticsImg },
  { slug: "groceries", name: "Groceries", img: groceriesImg },
  { slug: "toiletries", name: "Toiletries", img: toiletriesImg },
  { slug: "fashion", name: "Fashion", img: fashionImg },
  { slug: "bakery", name: "Bakery", img: bakeryImg },
  { slug: "drinks", name: "Drinks", img: drinksImg },
  { slug: "household", name: "Household", img: householdImg },
  { slug: "baby", name: "Baby", img: babyImg },
  { slug: "frozen", name: "Frozen", img: frozenImg },
  { slug: "electronics", name: "Electronics", img: electronicsImg },
  { slug: "furniture", name: "Furniture", img: furnitureImg },
  { slug: "gym", name: "Gym", img: gymImg },
];

export default function CategoryGrid() {
  return (
    <section className="bg-primary text-bg py-24">
      <div className="container-page">
        <h2 className="text-center text-white">
          Shop <span className="[WebkitTextStroke:0.4px_#FEFAF1] [WebkitTextFillColor:transparent]">by</span> Category
        </h2>
        <p className="text-center mt-2 opacity-70">Looking for something specific?</p>

        <div className="grid grid-cols-2 md:flex md:flex-wrap md:items-center md:justify-center md:max-w-4xl md:mx-auto gap-3 mt-10">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?category=${c.slug}`}
              className="flex items-center gap-3 bg-bg-alt text-text rounded-xl overflow-hidden pr-10
                         hover:bg-secondary transition"
            >
              <img
                src={c.img}
                alt={c.name}
                className="w-14 h-14 object-cover"
                loading="lazy"
              />
              <span className="">{c.name}</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/shop" className="cta cta-3">Shop All</Link>
        </div>
      </div>
    </section>
  );
}