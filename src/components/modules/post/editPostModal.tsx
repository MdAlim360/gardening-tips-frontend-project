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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useUpdatePostMutation } from "@src//redux/features/post/postManagement";
import { toast } from "sonner";

export default function EditPostModal({ postId }) {
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

  const [updatePost, { data }] = useUpdatePostMutation();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Editing...");
    const postData = {
      post: postContent, // Now stores plain text
      picture: images[0], // Assuming the first image as the main one
      tag: isPremium ? "Premium" : "Basic",
      category: categories.join(", "), // Join categories as a string
    };

    try {
      await updatePost({
        id: postId,
        payload: { ...postData }, // Update upvotes first
      }).unwrap();
      toast.success("Successfully edited the post!");
      onOpenChange(false); // Close the modal after successful edit
      reset(); // Reset the form fields
    } catch (error) {
      toast.error("Failed to edit the post.");
    } finally {
      toast.dismiss(toastId); // Remove the loading toast
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages([...images, e.target.value]); // Add the image link to the images array
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value],
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Button className="bg-white text-md" onPress={onOpen}>
        Edit
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
                Edit Post
              </ModalHeader>
              <ModalBody>
                {/* Rich Text Editor */}
                <ReactQuill
                  className="mb-4 bg-white"
                  placeholder="Write your content here..."
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
                    onOpenChange(false); // Close the modal
                    reset(); // Reset form fields
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  onPress={handleSubmit(onSubmit)}
                >
                  Edit Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
