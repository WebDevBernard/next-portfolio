import ButtonLink from "@/components/Button";
export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center max-w-5xl lg:mx-auto gap-y-6 ">
      <h1 className="text-4xl font-semibold text-center tracking-tighter text-zinc-700">
        404 - Page Not Found
      </h1>
      <p className="max-w-xl flex text-center text-zinc-700 ">
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
