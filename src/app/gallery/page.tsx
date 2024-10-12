"use client";
import ImageCard from "@src//components/ImageCard";
import ImageModal from "@src//components/imageModal";

function page() {
  return (
    <div>
      <div>
        <ImageModal />
        <ImageCard />
      </div>
    </div>
  );
}

export default page;
