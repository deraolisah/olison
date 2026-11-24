// src/components/public/SortMenu.jsx
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ArrowDown01,
  ArrowUp01,
  Sparkles,
  ChevronDown,
  Check,
} from "lucide-react";
import { SORT_OPTIONS, SORT_DIRECTIONS } from "../../utils/sortUtils";

const ICONS = {
  recommended: Sparkles,
  name: ArrowDownAZ,
  price: ArrowDown01,
  date: ArrowDown01,
  stock: ArrowDown01,
};

const ICONS_DESC = {
  name: ArrowUpAZ,
  price: ArrowUp01,
  date: ArrowUp01,
  stock: ArrowUp01,
};

export default function SortMenu({ sortBy, sortDir, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = SORT_OPTIONS.find((o) => o.value === sortBy) || SORT_OPTIONS[0];
  const CurrentIcon =
    sortDir === "desc" ? ICONS_DESC[current.value] || ICONS[current.value] : ICONS[current.value] || Sparkles;

  const directionLabel =
    current.group === "default"
      ? null
      : SORT_DIRECTIONS[current.value]?.[sortDir];

  const handlePick = (opt) => {
    if (opt.value === "recommended") {
      onChange("recommended", "asc");
      setOpen(false);
      return;
    }

    if (opt.value === sortBy) {
      // Toggle direction on re-click
      onChange(sortBy, sortDir === "asc" ? "desc" : "asc");
    } else {
      onChange(opt.value, "asc");
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="
          group w-full flex items-center gap-2 mt-2
          bg-white px-3 py-1.75 text-xs font-medium text-text
          transition
        "
      >
        <CurrentIcon size={15} className="text-primary shrink-0" strokeWidth={2.2} />
        <span className="inline">
          {current.label}
          {directionLabel && (
            <span className="ml-1 text-muted">· {directionLabel}</span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={`ml-auto transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="
            top-full right-0 z-50 mt-2 w-full origin-top-right
            rounded-2xl border border-border bg-white p-1.5
            shadow-xl shadow-black/5 animate-[fadeIn_.12s_ease-out]
            flex flex-col gap-1
            text-nowrap
          "
        >
          {/* <p className="px-3 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
            Sort by
          </p> */}

          {SORT_OPTIONS.map((opt) => {
            const Icon = ICONS[opt.value] || Sparkles;
            const isActive = opt.value === sortBy;
            const isToggleable = opt.group !== "default";

            return (
              <button
                key={opt.value}
                role="option"
                aria-selected={isActive}
                onClick={() => handlePick(opt)}
                className={`
                  flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm
                  transition ${isActive
                    ? "bg-primary/8 text-primary"
                    : "text-text hover:bg-gray-100"}
                `}
              >
                <Icon size={15} />
                <span className="flex-1">{opt.label}</span>

                {isToggleable && isActive && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-primary/70">
                    {SORT_DIRECTIONS[opt.value][sortDir]}
                  </span>
                )}

                {isActive && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}