import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center max-w-5xl lg:mx-auto gap-y-6 ">
      <h1 className="text-4xl font-semibold tracking-tighter text-zinc-700">
        404 - Page Not Found
      </h1>
      <p className="max-w-xl flex text-center text-zinc-700 ">
        The page you are looking for does not exist.
      </p>
      <Button
        asChild
        className="bg-yellow-300 hover:bg-yellow-400/90 text-zinc-700 font-semibold"
        variant={"fontawesome"}
        size={"lg"}
      >
        <Link href={"/"}>
          <Image
            src="./autonavi.svg"
            alt={"autonavi"}
            width={40}
            height={40}
            className="text-zinc-700"
            unoptimized
          />
          Return Home
        </Link>
      </Button>
    </section>
  );
}
