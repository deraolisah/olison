
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   ShoppingBag,
//   Menu,
//   UserRound,
//   SlidersHorizontal
// } from "lucide-react";
// import { Link, useSearchParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { selectCartCount, toggleCart } from "../../redux/slices/cartSlice";

// export default function Header({ onMenuClick, onFilterClick }) {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();
  
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

//   const count = useSelector(selectCartCount);
//   const dispatch = useDispatch();



//   const [searchParams, setSearchParams] = useSearchParams();
//   const urlSearch = searchParams.get("search") || "";

//   // Initialize from URL, and re-sync when URL changes externally
//   useEffect(() => {
//     setSearch(urlSearch);
//   }, [urlSearch]);


//   const handleSearch = (e) => {
//     e.preventDefault();
//     const query = search.trim();
//     if (!query) {
//       searchParams.delete("search");
//       setSearchParams(searchParams);
//       navigate("/");
//       return;
//     }
//     searchParams.set("search", query);
//     setSearchParams(searchParams);
//   };

//   useEffect(() => {
//     const t = setTimeout(() => {
//       if (search.trim()) {
//         searchParams.set("search", search.trim());
//       } else {
//         searchParams.delete("search");
//       }
//       setSearchParams(searchParams, { replace: true });
//     }, 350);
//     return () => clearTimeout(t);
//   }, [search]);


//   // const handleSearch = (e) => {
//   //   e.preventDefault();

//   //   const query = search.trim();

//   //   if (!query) return;

//   //   navigate(`/?search=${encodeURIComponent(query)}`);
//   // };

//   return (
//     <header className="flex md:sticky top-0 z-20 h-16 md:h-14 items-center justify-between gap-6 px-5 sm:px-8 xl:px-10 bg-white backdrop-blur-md border-b border-border">
//       <div className="w-full flex items-center justify-between gap-3">
//         {/* <button onClick={onMenuClick} aria-label="Open navigation" className="p-2 rounded-full bg-gray-200 flex md:hidden">
//           <Menu size={20} strokeWidth={1.5} />
//         </button> */}

//         <div className="flex md:hidden items-center gap-2 flex-1">
//           <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
//             <span className="text-white text-2xl font-bold">O</span>
//           </div>
//           <Link to="/" className="flex flex-col items-start">
//             <p className="font-bold text-lg text-primary tracking-wider leading-tight uppercase">Olison</p>
//             <p className="text-[9px] tracking-wider text-text uppercase">
//               Super Stores
//             </p>
//           </Link>
//         </div>

//         <form onSubmit={handleSearch} className="flex items-center md:w-65 xl:w-90 h-10 p-0">
//           <input
//             type="search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search products..."
//             className="hidden md:flex w-full h-full outline-none px-4 font-light text-base text-gray-800 placeholder:text-gray-400 bg-gray-50 border border-gray-300 rounded-l-full focus:border-primary"
//           />

//           <button type="submit" aria-label="Search products" className="hidden md:flex items-center justify-center h-full px-2.5 md:pr-3.5 bg-gray-100 hover:bg-gray-200 border md:border-l-0! border-gray-300 text-text transition rounded-full md:rounded-l-none">
//             <Search size={18} className="shrink-0" />
//           </button>

//           <button type="button" aria-label="Open Search" onClick={() => {}} className="flex md:hidden items-center justify-center h-full px-2.75 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-text transition rounded-full">
//             <Search size={18} className="shrink-0" />
//           </button>
//         </form>

//         <div className="hidden md:flex items-center gap-2">
//           <button type="button" title="Filter" onClick={onFilterClick} aria-label="Open product filters" className="p-2 hover:bg-gray-200 rounded-full">
//             <SlidersHorizontal size={18} strokeWidth={1.5} />
//           </button>

//           <button type="button" title="Cart" onClick={() => {dispatch(toggleCart()); }} aria-label="Open Cart" className="relative p-2 hover:bg-gray-200 rounded-full">
//               <ShoppingBag size={20} strokeWidth={1.25} />
//               {count > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
//                 {count}
//                 </span>
//               )}
//           </button>

//           <Link
//             to="/profile"
//             title="Account"
//             aria-label="Customer account"
//             className="p-2 hover:bg-gray-200 rounded-full"
//           >
//             <UserRound size={20} strokeWidth={1.5} />
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }







import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingBag, SlidersHorizontal, UserRound } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, toggleCart } from "../../redux/slices/cartSlice";

export default function Header({ onFilterClick }) {
  const [search, setSearch] = useState("");
  const [bump, setBump] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const count = useSelector(selectCartCount);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  // Pulse the cart badge whenever the count changes upward
  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 320);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (search.trim()) {
        searchParams.set("search", search.trim());
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams, { replace: true });
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      navigate("/");
      return;
    }
    searchParams.set("search", query);
    setSearchParams(searchParams);
  };

  return (
    <header className="flex md:sticky top-0 z-20 h-16 md:h-14 items-center justify-between gap-6 px-5 sm:px-8 xl:px-10 bg-white backdrop-blur-md border-b border-border">
      {/* Mobile logo */}
      <Link to="/" className="flex items-center gap-2 md:hidden shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <span className="text-lg font-bold text-white">O</span>
        </div>
        <div className="flex flex-col leading-tight">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Olison
          </p>
          <p className="text-[9px] uppercase tracking-wider text-muted">
            Super Stores
          </p>
        </div>
      </Link>

      {/* Search — visual anchor */}
      <form
        onSubmit={handleSearch}
        className="flex h-10 flex-1 items-center overflow-hidden rounded-pill border border-transparent bg-surface-alt transition-colors focus-within:border-primary/40 focus-within:bg-surface md:max-w-md xl:max-w-lg"
      >
        <Search size={16} className="ml-4 shrink-0 text-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="h-full flex-1 bg-transparent px-3 text-sm text-text outline-none placeholder:text-muted"
        />
        <kbd className="mr-3 hidden rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted md:inline">
          ⌘K
        </kbd>
      </form>

      {/* Desktop actions */}
      <div className="hidden items-center gap-1 md:flex">
        <button
          type="button"
          title="Filter"
          onClick={onFilterClick}
          aria-label="Open product filters"
          className="flex h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-surface-alt"
        >
          <SlidersHorizontal size={18} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          title="Cart"
          onClick={() => dispatch(toggleCart())}
          aria-label="Open cart"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-surface-alt"
        >
          <ShoppingBag size={19} strokeWidth={1.5} />
          {count > 0 && (
            <span
              className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-pill bg-primary px-1 text-[10px] font-bold tabular-nums text-white ${
                bump ? "animate-[badge-pop_300ms_ease-out]" : ""
              }`}
            >
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>

        <Link
          to="/profile"
          title="Account"
          aria-label="Customer account"
          className="flex h-10 w-10 items-center justify-center rounded-full text-text transition hover:bg-surface-alt"
        >
          <UserRound size={19} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Mobile cart */}
      <button
        type="button"
        title="Cart"
        onClick={() => dispatch(toggleCart())}
        aria-label="Open cart"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text transition hover:bg-surface-alt md:hidden"
      >
        <ShoppingBag size={19} strokeWidth={1.5} />
        {count > 0 && (
          <span
            className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-pill bg-primary px-1 text-[10px] font-bold tabular-nums text-white ${
              bump ? "animate-[badge-pop_300ms_ease-out]" : ""
            }`}
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
    </header>
  );
}