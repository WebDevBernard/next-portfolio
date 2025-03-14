import { contactContent, contactMeMeta } from "@/lib/data";
import { Metadata } from "next";
import { ContactForm } from "@/components/Form/ContactForm";
export const metadata: Metadata = {
  title: contactMeMeta.title,
  description: contactMeMeta.description,
};
export default function Page() {
  const { title, description } = contactContent;

  return (
    <section className="container">
      <h1>{title}</h1>
      <p className="text-center">{description}</p>
      <ContactForm />
    </section>
  );
}
