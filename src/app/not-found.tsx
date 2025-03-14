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
        className="bg-violet-300 hover:bg-violet-400/90"
        src="/home.svg"
      >
        Return Home
      </ButtonLink>
    </section>
  );
}
