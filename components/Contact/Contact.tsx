"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import SectionTitle from "@/components/SectionTitle";
import type { ContactForm, Web3FormsResponse } from "@/types/portfolio";
import styles from "./Contact.module.css";

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      toast.error("Contact form is not configured.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: `[Portfolio] ${form.subject.trim()}`,
          message: form.message.trim(),
          from_name: "Mahdi Portfolio",
        }),
      });

      const data = (await response.json()) as Web3FormsResponse;

      if (!data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setForm(initialForm);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <SectionTitle highlight="Me">Contact</SectionTitle>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label htmlFor="subject">
            Subject
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
        </div>

        <label htmlFor="message" className={styles.messageLabel}>
          Message
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
}
