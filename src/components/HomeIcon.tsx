"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const HomeIcon = () => {
  const pathname = usePathname(); // Get the current path using the router

  return (
    <Link href={pathname !== "/" ? "/" : "contact-me"}>
      <Image
        src={pathname !== "/" ? "/home.svg" : "/autonavi.svg"}
        alt={pathname !== "/" ? "home" : "autonavi"}
        width={40}
        height={40}
        unoptimized
      />
    </Link>
  );
};

export default HomeIcon;
