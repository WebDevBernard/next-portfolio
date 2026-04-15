import { Card, CardContainer } from "@/components/Card";
import { introContent, cardData, contactContent } from "@/lib/data";
import Image from "next/image";
import ButtonLink from "@/components/Button";
import { SideBar } from "@/components/Sidebar";
import { ContactForm } from "@/components/Form/ContactForm";
import Carousel from "@/components/Carousel";

export default function Page() {
  const workProjects = cardData
    .filter((card) => card.type === "work")
    .sort((a, b) => Number(b.year) - Number(a.year));
  const otherProjects = cardData
    .filter((card) => card.type === "other")
    .sort((a, b) => Number(b.year) - Number(a.year));
  const { title, description } = introContent;

  return (
    <section className="container space-y-6">
      <SideBar projectData={cardData} />

      <h1 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-[#4AE54A]/60">
        {title}
      </h1>

      <div
        className="flex space-x-4 relative w-fit bg-teal-100 border-2 border-teal-400 rounded-2xl p-3
          before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-[22px] before:border-l-[22px] before:border-l-transparent before:border-r-[22px] before:border-r-transparent before:border-t-[22px] before:border-t-teal-400
          after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[19px] after:border-l-[20px] after:border-l-transparent after:border-r-[20px] after:border-r-transparent after:border-t-[20px] after:border-t-teal-100"
      >
        <Image src="/hi.svg" alt="hi" width={40} height={40} unoptimized />
        <p>{description}</p>
      </div>

      <ButtonLink
        src="/autonavi.svg"
        href="#contact"
        className="bg-lime-200 hover:bg-lime-300/80"
      >
        Contact Me
      </ButtonLink>

      {workProjects.length > 0 && (
        <section aria-label="Work Projects" className="space-y-6">
          <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-purple-300 pb-4">
            Work Projects
          </h2>
          <CardContainer>
            {workProjects.map((card, index) => (
              <Card key={index} {...card} id={card.title} />
            ))}
          </CardContainer>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section aria-label="Other Projects" className="space-y-6">
          <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-pink-300 pb-4">
            Other Projects
          </h2>
          <CardContainer>
            {otherProjects.map((card, index) => (
              <Card key={index} {...card} id={card.title} />
            ))}
          </CardContainer>
        </section>
      )}

      <section aria-label="Ghibli Bulldogs" className="space-y-6">
        <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-yellow-300">
          Ghibli Bulldogs
        </h2>
        <Carousel />
      </section>

      <section
        id="contact"
        aria-label="Contact"
        className="flex flex-col items-center justify-center space-y-12"
      >
        <h2 className="underline-offset-[8px] md:underline-offset-[12px] transition-all duration-300 underline decoration-12 decoration-orange-300">
          {contactContent.title}
        </h2>
        <p
          className="relative rounded-2xl p-3 bg-yellow-100 border-yellow-400 border-2
            w-fit mx-6
            before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-[22px] before:border-l-[22px] before:border-l-transparent before:border-r-[22px] before:border-r-transparent before:border-b-[22px] before:border-b-yellow-400
            after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-top-[19px] after:border-l-[20px] after:border-l-transparent after:border-r-[20px] after:border-r-transparent after:border-b-[20px] after:border-b-yellow-100"
        >
          {contactContent.description}
        </p>
        <ContactForm />
      </section>
    </section>
  );
}
