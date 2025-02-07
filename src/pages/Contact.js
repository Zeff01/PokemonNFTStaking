import React from "react";
import { motion } from "framer-motion";
import { MdEmail, MdPhone } from "react-icons/md";

const Contact = () => {
  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-yellow-400 to-red-500 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <div className="max-w-lg mx-auto bg-white text-black p-6 rounded-xl shadow-lg">
        <form>
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block mb-2 font-semibold">Message</label>
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border rounded-md mb-4"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-red-500 text-white p-2 rounded-md font-bold"
          >
            Send Message
          </motion.button>
        </form>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
          <p className="flex items-center mb-2">
            <MdEmail className="mr-2 text-red-500" /> contact@pokemonworld.com
          </p>
          <p className="flex items-center">
            <MdPhone className="mr-2 text-red-500" /> +123 456 7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
