import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-green-50 mt-16 py-16 px-8 lg:px-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-green-700 text-center mb-10">
          About Royal Garden
        </h2>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <img
              src="https://i.ibb.co.com/JRBy3R9/closeup-beautiful-flower-bouquet.jpg"
              alt="Royal Garden"
              className="w-full h-96 rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-10 mt-8 lg:mt-0">
            <p className="text-lg text-gray-700 mb-6">
              Royal Garden is dedicated to providing beautifully curated gardens
              that reflect the majesty and tranquility of nature. With a focus
              on sustainability, artistry, and personalized designs, we create
              outdoor spaces that inspire and rejuvenate. From residential to
              commercial projects, we strive to bring nature closer to you with
              every creation.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to design and nurture gardens that embody the
              harmony between man and nature, fostering well-being,
              environmental awareness, and a deep connection to the outdoors.
            </p>
            <p className="text-lg text-gray-700">
              We believe in the power of gardens to transform spaces, uplift
              moods, and promote peace. At Royal Garden, we are committed to
              using eco-friendly practices and innovative techniques to create
              landscapes that are as functional as they are beautiful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
