export default function Footer() {
  return (
    <footer className="mb-8 flex justify-center lg:mx-auto">
      <p className="mt-8 text-zinc-700">© {new Date().getFullYear()}</p>
    </footer>
  );
}
