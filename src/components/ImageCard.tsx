"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useGetAllImageQuery } from "../redux/features/images/imageManagement";

export default function ImageCard() {
  const { data: images, isLoading } = useGetAllImageQuery(undefined);

  if (isLoading) {
    return <div>Loading images...</div>;
  }

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="mt-32 max-w-7xl mx-auto">
      <h1 className="text-lg text-center font-medium py-4">Images Gallery</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
        {images?.data?.result.map((item, index) => (
          <Card
            key={index}
            isPressable
            shadow="sm"
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-full object-cover h-[140px]"
                radius="lg"
                shadow="sm"
                src={item.img}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
