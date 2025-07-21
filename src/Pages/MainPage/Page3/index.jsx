import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      );
      setSent(true);
      form.current.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-10 text-yellow-300 flex items-center gap-2">
        <MdEmail className="text-4xl" /> Contact Me
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Form Kontak (1/3 width) */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="md:basis-1/3 w-full bg-black/40 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-4"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-white/90 text-black"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded bg-white/90 text-black"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="w-full p-3 rounded bg-white/90 text-black"
            rows={5}
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
          >
            Send Message
          </button>
          {sent && (
            <p className="text-green-400 font-medium mt-2">
              ✅ Your message has been sent!
            </p>
          )}
        </form>

        {/* Google Maps (2/3 width) */}
        <div className="md:basis-2/3 w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=-5.1461,105.2780&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
