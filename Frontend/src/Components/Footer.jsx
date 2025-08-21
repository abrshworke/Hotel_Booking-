
import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Gebeya Hotels
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Experience the finest stays in Ethiopia. Seamless bookings, verified
            hotels, and unbeatable deals — all in one place.
          </p>
          {/* Social icons */}
          <div className="flex space-x-4">
            {[
              { icon: FaFacebookF, href: "#" },
              { icon: FaTwitter, href: "#" },
              { icon: FaInstagram, href: "#" },
              { icon: FaLinkedinIn, href: "#" },
            ].map(({ icon: Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="p-3 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { name: "Home", href: "/" },
              { name: "Rooms", href: "/rooms" },
              { name: "About Us", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-indigo-500 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3">
            {[
              { name: "FAQ", href: "#" },
              { name: "Terms & Conditions", href: "#" },
              { name: "Privacy Policy", href: "#" },
              { name: "Help Center", href: "#" },
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-indigo-500 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          {subscribed ? (
            <p className="text-green-400 font-semibold">
              ✅ Thanks for subscribing!
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col space-y-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-sm text-gray-400 mt-3">
            Get exclusive offers & the latest news.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-8 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Gebeya Hotels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
