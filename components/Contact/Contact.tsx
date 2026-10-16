"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  contactContent,
  enquiryOptions,
  siteConfig,
  socialLinks,
  timelineOptions,
} from "@/data/portfolio";
import type { ContactForm, Web3FormsResponse } from "@/types/portfolio";
import styles from "./Contact.module.css";

const initialForm: ContactForm = {
  name: "",
  email: "",
  company: "",
  enquiry: "",
  timeline: "",
  message: "",
};

const socialIcons: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
};

/** `https://www.github.com/x/` → `github.com/x` — the bit worth reading. */
function prettyUrl(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

const channels = [
  {
    icon: FaEnvelope,
    label: "Email",
    text: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: FaPhoneAlt,
    label: "Phone",
    text: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[ ()]/g, "")}`,
  },
  ...socialLinks.map((link) => ({
    icon: socialIcons[link.icon] ?? FaGithub,
    label: link.label,
    text: prettyUrl(link.href),
    href: link.href,
  })),
];

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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

    const enquiry = form.enquiry || "Enquiry";

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
          // The old form asked for a subject outright; composing it from the
          // enquiry type means one less box to fill and a more useful inbox.
          subject: `[Portfolio] ${enquiry} — ${form.name.trim()}`,
          company: form.company.trim() || "—",
          enquiry,
          timeline: form.timeline || "Not specified",
          message: form.message.trim(),
          from_name: "Mahdi Portfolio",
        }),
      });

      const data = (await response.json()) as Web3FormsResponse;

      if (!data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent — I'll reply within a day.");
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
      <div className={`container ${styles.grid}`}>
        {/* --- left: the pitch and the direct channels --- */}
        <div className={styles.aside}>
          <header className={styles.head}>
            <h2 className="sectionTitle">{contactContent.heading}</h2>
            <span className="sectionMarker" aria-hidden="true" />
          </header>

          <p className={styles.lead}>{contactContent.lead}</p>
          <p className={styles.note}>{contactContent.note}</p>

          <ul className={styles.channels}>
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.href}>
                  <a
                    href={channel.href}
                    className={styles.channel}
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className={styles.channelIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <span className={styles.channelText}>
                      <span className={styles.channelLabel}>
                        {channel.label}
                      </span>
                      {channel.text}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --- right: the form --- */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.pair}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                required
                value={form.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@company.com"
                required
                value={form.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="company" className={styles.label}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Your company or organisation (optional)"
              value={form.company}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.pair}>
            <div className={styles.field}>
              <label htmlFor="enquiry" className={styles.label}>
                Enquiry type
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="enquiry"
                  name="enquiry"
                  value={form.enquiry}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.select}`}
                  data-empty={form.enquiry ? undefined : ""}
                >
                  <option value="">Select one&hellip;</option>
                  {enquiryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className={styles.caret} aria-hidden="true" />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="timeline" className={styles.label}>
                Timeline
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="timeline"
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.select}`}
                  data-empty={form.timeline ? undefined : ""}
                >
                  <option value="">Select one&hellip;</option>
                  {timelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className={styles.caret} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              Message <span className={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="What are you building, and where do I fit in?"
              required
              value={form.message}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Sending…" : "Send message"}
            <FaArrowRight aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
