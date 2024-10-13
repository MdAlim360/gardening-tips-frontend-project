import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaQuoteRight,
  FaTools,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function RightSidebar() {
  const quotes = [
    "Gardening adds years to your life and life to your years.",
    "To plant a garden is to believe in tomorrow.",
    "The love of gardening is a seed once sown that never dies.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [quotes.length]);

  return (
    <div className="pt-8 h-full rounded-xl">
      <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
        Gardener's Corner
      </h2>

      {/* Gardener's Birthday Updates */}
      <div className="mb-8 bg-white shadow p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <FaBirthdayCake className="text-green-500 text-3xl mr-3 hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-green-900">
            Today's Birthdays
          </h3>
        </div>
        <ul className="space-y-2 text-md text-gray-700">
          <li className="hover:text-green-900 transition-colors">
            John Doe - 32 years old
          </li>
          <li className="hover:text-green-900 transition-colors">
            Jane Smith - 27 years old
          </li>
          <li className="hover:text-green-900 transition-colors">
            Emily Johnson - 45 years old
          </li>
        </ul>
      </div>

      {/* Upcoming Gardening Events */}
      <div className="mb-8 bg-white shadow-md p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-green-500 text-3xl mr-3 hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-green-900">
            Upcoming Events
          </h3>
        </div>
        <ul className="space-y-2 text-md text-gray-700">
          <li className="hover:text-green-900 transition-colors">
            October 15: Planting Workshop
          </li>
          <li className="hover:text-green-900 transition-colors">
            October 20: Community Garden Meet
          </li>
          <li className="hover:text-green-900 transition-colors">
            October 25: Organic Gardening Tips
          </li>
        </ul>
      </div>

      {/* Gardening Motivational Quotes with Card Slider */}
      <div className="mb-8 bg-white shadow-md p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <FaQuoteRight className="text-green-500 text-3xl mr-3 hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-green-900">
            Motivational Quotes
          </h3>
        </div>
        <div className="transition-opacity duration-500 ease-in-out">
          <div className="bg-green-50 shadow-lg rounded-lg p-4 border border-green-200 text-center">
            <p className="text-md italic text-green-800">
              "{quotes[currentQuoteIndex]}"
            </p>
          </div>
        </div>
      </div>

      {/* Gardening Tips & Tools */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <FaTools className="text-green-500 text-3xl mr-3 hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold text-green-900">
            Gardening Tips
          </h3>
        </div>
        <ul className="space-y-2 text-green-700 text-sm">
          <li className="hover:text-green-900 transition-colors">
            Use compost for healthier plants.
          </li>
          <li className="hover:text-green-900 transition-colors">
            Water plants early in the morning.
          </li>
          <li className="hover:text-green-900 transition-colors">
            Rotate crops to avoid pests.
          </li>
        </ul>
      </div>
    </div>
  );
}
