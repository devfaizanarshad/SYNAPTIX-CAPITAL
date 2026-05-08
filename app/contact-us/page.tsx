import type { Metadata } from "next";
import { ContactPage } from "../components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Synaptix Capital",
  description:
    "Contact Synaptix Capital for confidential strategic advisory, capital strategy, and shareholder transition conversations."
};

export default function ContactUs() {
  return <ContactPage />;
}
