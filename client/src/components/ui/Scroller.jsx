// src/components/ui/Scroller.jsx
export default function Scroller({ children, speed = 30 }) {
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-10 w-max animate-[scroll_linear_infinite]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex gap-10">{children}</div>
        <div className="flex gap-10" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}