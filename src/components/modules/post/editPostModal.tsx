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
import { toast } from "sonner";
import { useUpdatePostMutation } from "@src//redux/features/post/postManagement";

// Define the acceptable values for modal placement
type ModalPlacement =
  | "auto"
  | "center"
  | "top"
  | "top-center"
  | "bottom"
  | "bottom-center"
  | undefined;

export default function EditPostModal({ postId }: { postId: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const [modalPlacement, setModalPlacement] = useState<ModalPlacement>("auto"); // Ensure initial value is valid
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);

  const [updatePost] = useUpdatePostMutation();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Editing...");
    const postData = {
      post: postContent,
      picture: images[0],
      tag: isPremium ? "Premium" : "Basic",
      category: categories.join(", "),
    };

    try {
      await updatePost({ id: postId, payload: postData }).unwrap();
      toast.success("Successfully edited the post!");
      onOpenChange(); // Close the modal after successful edit
      reset(); // Reset the form fields
    } catch (error) {
      toast.error("Failed to edit the post.");
    } finally {
      toast.dismiss(toastId); // Remove the loading toast
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages([...images, e.target.value]);
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
      <Button className="bg-white text-md" onPress={onOpen}>
        Edit
      </Button>

      <Modal
        className="modal-container"
        isOpen={isOpen}
        placement={modalPlacement} // Make sure this is a valid placement
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Post
              </ModalHeader>
              <ModalBody>
                <ReactQuill
                  className="mb-4 bg-white"
                  placeholder="Write your content here..."
                  theme="snow"
                  onChange={(content) => setPostContent(content)} // Use raw content
                />

                <h3 className="text-lg font-bold mb-2">Attach Images</h3>
                <Input
                  {...register("photoLink")}
                  label="Photo Link"
                  type="text"
                  onChange={handleImageChange}
                />

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
                    onOpenChange();
                    reset(); // Reset form fields
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type="button" // Ensure button type is set
                  onPress={() => handleSubmit(onSubmit)()} // Wrap in an arrow function
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
