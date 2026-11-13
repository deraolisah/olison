export default function Toast({ msg, type = "success" }) {
  const bg = type === "success" ? "bg-green-600" : "bg-red-600";
  return (
    <div className={`fixed bottom-6 right-6 z-[100] text-white px-5 py-3 rounded-lg shadow-lg animate-toast-in ${bg}`}>
      {msg}
    </div>
  );
}