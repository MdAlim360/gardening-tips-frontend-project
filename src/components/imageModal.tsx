import React from "react";
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
import { toast } from "sonner";
import { useCreateVerifyUserMutation } from "@src//redux/features/user/userManagement";
import { useCreateImageMutation } from "../redux/features/images/imageManagement";

export default function ImageModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const [createImage] = useCreateImageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating...");

    const imageData = { ...data };

    console.log(imageData);
    try {
      const res = await createImage(imageData).unwrap();

      toast.success("Verifying...");
      toast.success("Image created successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      toast.error(err?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }

    reset();
    onOpenChange(); // Close modal
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="-mt-1 text-lg bg-gray-100 font-medium text-blue-600 max-w-fit"
        onClick={onOpen} // Use onClick for better compatibility
      >
        Create Image
      </Button>

      <Modal
        className="modal-container" // Add z-index in CSS
        isOpen={isOpen}
        placement={modalPlacement}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Image
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="pb-4">
                    <Input label="Title" type="text" {...register("title")} />
                  </div>
                  <div className="pb-4">
                    <Input label="price" type="number" {...register("price")} />
                  </div>
                  <div className="pb-4">
                    <Input label="Image" type="text" {...register("image")} />
                  </div>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onClick={() => {
                        onClose();
                        reset();
                      }}
                    >
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Create
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
