import type { Metadata } from "next";
import { ContactPage } from "../components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Synaptix Capital | Strategic Advisory",
  description:
    "Start a confidential conversation with Synaptix Capital about capital strategy, shareholder transition, or frontier technology investment."
};

export default function Contact() {
  return <ContactPage />;
}
