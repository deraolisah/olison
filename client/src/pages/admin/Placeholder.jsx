

export default function Placeholder({ title }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-gray-200 p-16 text-center">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">Coming soon.</p>
    </div>
  );
}