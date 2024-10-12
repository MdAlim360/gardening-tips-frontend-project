import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useCreatePostMutation } from "@src//redux/features/post/postManagement";
import { toast } from "sonner";
import { useAppSelector } from "@src//redux/hooks";
import { useGetSingleUserQuery } from "@src//redux/features/user/userManagement";

export default function PostModal({ userId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const [modalPlacement, setModalPlacement] = useState("auto");
  const [postContent, setPostContent] = useState(""); // Stores plain text
  const [images, setImages] = useState<string[]>([]); // Explicitly typed as string array
  const [categories, setCategories] = useState<string[]>([]); // Explicitly typed as string array
  const [isPremium, setIsPremium] = useState(false);

  // Utility function to strip HTML tags
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    return doc.body.textContent || "";
  };

  const [createPost, { data }] = useCreatePostMutation();
  const currentUser: any = useAppSelector((state) => state.auth.user);
  const { data: user, isLoading: isUserLoading } = useGetSingleUserQuery(
    currentUser.id
  );

  console.log(currentUser);
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Registering...");
    const postData = {
      post: postContent, // Now stores plain text
      picture: images[0], // Assuming the first image as the main one
      tag: isPremium ? "Premium" : "Basic",
      user: userId,
      upvote: [],
      downvote: [],
      comments: [],
      favorite: [],
      category: categories.join(", "), // Join categories as a string
    };

    try {
      const res = await createPost(postData).unwrap();

      toast.success("Post created successfully", {
        id: toastId,
        duration: 2000,
      });
      // or another route
    } catch (err: any) {
      toast.error(err?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
      console.log(err);
    }
    console.log("Final Post Data:", postData);
    reset();
    onOpenChange();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages([...images, e.target.value]); // Add the image link to the images array
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Button className="w-[300px] md:w-[750px]" onPress={onOpen}>
        Create Post
      </Button>

      <Modal
        className="modal-container"
        isOpen={isOpen}
        placement={modalPlacement}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Post
              </ModalHeader>
              <ModalBody>
                {/* Rich Text Editor */}
                <ReactQuill
                  className="mb-4 bg-white"
                  placeholder="Write your gardening tips here..."
                  theme="snow"
                  onChange={(content) => setPostContent(stripHtml(content))} // Strips HTML
                />

                {/* Image Upload Section */}
                <h3 className="text-lg font-bold mb-2">Attach Images</h3>
                <Input
                  {...register("photoLink")}
                  label="Photo Link"
                  type="text"
                  onChange={handleImageChange}
                />

                {/* Category Selection */}
                <h3 className="text-lg font-bold mb-2">Select Categories</h3>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Vegetables"
                      onChange={handleCategoryChange}
                    />
                    Vegetables
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Flowers"
                      onChange={handleCategoryChange}
                    />
                    Flowers
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Landscaping"
                      onChange={handleCategoryChange}
                    />
                    Landscaping
                  </label>
                </div>

                {/* Premium Tag */}
                <div className="mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      checked={isPremium}
                      disabled={user?.data?.status === "unverified"}
                      type="checkbox"
                      onChange={(e) => setIsPremium(e.target.checked)}
                    />
                    Premium (Only accessible to verified users)
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    reset();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  onPress={handleSubmit(onSubmit)}
                >
                  Create Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
