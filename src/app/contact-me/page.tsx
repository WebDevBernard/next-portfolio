import { contactContent } from "@/lib/data";
import { Metadata } from "next";

import { CustomForm } from "@/components/CustomForm";
export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "You can reach out to me by sending an email to mail@bernardyang.com",
};
export default function Page() {
  const { title, description } = contactContent;

  return (
    <section className="flex flex-col items-center justify-center max-w-5xl lg:mx-auto gap-y-6 ">
      <h1 className="text-4xl font-semibold tracking-tighter text-zinc-800">
        {title}
      </h1>
      <span className="flex flex-row items-start gap-2">
        <p className="max-w-xl flex text-center text-zinc-700 ">
          {description}
        </p>
      </span>

      <CustomForm />
    </section>
  );
}
