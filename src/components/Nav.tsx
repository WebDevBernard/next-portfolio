import { navItems } from "@/lib/data";
import ButtonLink from "./ui/buttonlink";
export function Navbar() {
  return (
    <aside className="mb-8 tracking-tight px-4">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row justify-end relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row items-center space-x-2 md:space-x-8">
            {Object.entries(navItems).map(([path, { src }]) => {
              return <ButtonLink key={path} href={path} src={src} hidden />;
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
