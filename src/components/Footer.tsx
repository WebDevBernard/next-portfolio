export default function Footer() {
  return (
    <footer className="mb-16 flex justify-end pr-8 lg:mx-auto">
      <p className="mt-8 text-zinc-700">
        © {new Date().getFullYear()} MIT License
      </p>
    </footer>
  );
}
