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

export default function VerifyUserModal({ userId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const [createVerifyUser] = useCreateVerifyUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Registering...");

    const verifyData = { ...data, user: userId };

    console.log(verifyData);
    try {
      const res = await createVerifyUser(verifyData).unwrap();

      toast.success("Verifying...");
      window.location.href = res.data.payment_url;
      toast.success("Verified user created successfully", {
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
        Verify
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
                Verify User
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="pb-4">
                    <Input
                      label="Name"
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      errorMessage={errors.name?.message}
                    />
                  </div>
                  <div className="pb-4">
                    <Input
                      label="Email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      errorMessage={errors.email?.message}
                    />
                  </div>
                  <div className="pb-4">
                    <Input
                      label="NID Number"
                      type="number"
                      {...register("nid", { required: "NID is required" })}
                      errorMessage={errors.nid?.message}
                    />
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
                      Verify
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
