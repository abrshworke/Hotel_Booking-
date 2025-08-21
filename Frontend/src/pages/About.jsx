
import React from "react";
import { FaHotel, FaStar, FaHandshake, FaUsers, FaGlobeAmericas } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24 text-gray-900">
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-8 text-center text-indigo-700">
        About Us
      </h1>

      {/* Our Story */}
      <section className="mb-16 max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold border-b-4 border-indigo-500 pb-2">
          Our Story
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Founded in the heart of Ethiopia, our hotel booking platform aims to
          bridge the gap between travelers and the finest accommodations in the
          country. We understand the importance of comfort, convenience, and
          personalized service when you’re away from home.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          Our journey started with a simple mission: to make hotel booking
          effortless, reliable, and affordable for everyone. Whether you're
          planning a business trip or a family vacation, we offer an
          intuitive platform packed with handpicked hotels to match your unique
          preferences.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold border-b-4 border-indigo-500 pb-2 mb-8 text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <FeatureCard
            icon={<FaHotel className="w-12 h-12 text-indigo-600" />}
            title="Wide Hotel Selection"
            description="Access a comprehensive list of hotels from budget stays to luxury resorts, all verified and reviewed."
          />
          <FeatureCard
            icon={<FaStar className="w-12 h-12 text-indigo-600" />}
            title="Trusted Reviews"
            description="Read real guest reviews and ratings to make informed choices about where you stay."
          />
          <FeatureCard
            icon={<FaHandshake className="w-12 h-12 text-indigo-600" />}
            title="Secure Booking"
            description="Enjoy peace of mind with our secure, encrypted booking process and reliable customer support."
          />
          <FeatureCard
            icon={<FaUsers className="w-12 h-12 text-indigo-600" />}
            title="Personalized Service"
            description="Get tailored recommendations based on your preferences and previous stays."
          />
          <FeatureCard
            icon={<FaGlobeAmericas className="w-12 h-12 text-indigo-600" />}
            title="Local Expertise"
            description="Benefit from our deep knowledge of Ethiopia's unique destinations and hidden gems."
          />
          <FeatureCard
            icon={<FaStar className="w-12 h-12 text-indigo-600" />}
            title="Best Price Guarantee"
            description="We work directly with hotels to offer you the best rates and exclusive deals."
          />
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-20 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold border-b-4 border-indigo-500 pb-2 mb-8">
          Meet the Team
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Our passionate team is made up of travel enthusiasts, technology
          experts, and hospitality professionals dedicated to providing the
          best experience for our users. We combine cutting-edge technology
          with a personal touch to ensure your stay is seamless from start to
          finish.
        </p>
      </section>

      {/* Customer Commitment */}
      <section className="mb-20 max-w-5xl mx-auto bg-indigo-50 rounded-lg p-12 shadow-lg text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-indigo-700">
          Our Commitment to You
        </h2>
        <p className="text-lg text-indigo-900 max-w-3xl mx-auto leading-relaxed">
          Your satisfaction is our top priority. We are committed to providing
          transparent information, easy booking, and excellent customer
          service. Should any issue arise, our dedicated support team is
          available 24/7 to assist you.
        </p>
      </section>

      {/* Call to Action */}
      <section className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">
          Ready to start your journey?
        </h3>
        <a
          href="/rooms"
          className="inline-block px-10 py-4 bg-indigo-600 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition"
        >
          Browse Rooms
        </a>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
    <div className="mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2 text-gray-900">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default About;
