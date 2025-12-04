import ButtonLink from "@/components/Button";
export default function NotFound() {
  return (
    <section className="container">
      <h1>404 - Page Not Found</h1>
      <p className="text-center">
        The page you are looking for does not exist.
      </p>
      <ButtonLink
        href={"/"}
        className="bg-white hover:bg-white/80"
        src="/home.svg"
      >
        Return Home
      </ButtonLink>
    </section>
  );
}
