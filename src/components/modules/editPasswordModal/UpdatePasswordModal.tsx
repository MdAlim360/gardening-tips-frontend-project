import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNewPasswordMutation } from "@src//redux/features/user/userManagement";

export default function UpdatePasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: any;
  onClose: any;
}) {
  const [newPassword] = useNewPasswordMutation();
  //   const currentUser = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    // const toastId = toast.loading("Updating password...");
    const verifiedCode = Number(data.verifiedCode);
    const updatePasswordData: any = {
      verifiedCode: verifiedCode,
      newPassword: data.newPassword,
    };

    try {
      console.log(updatePasswordData);
      const res: any = await newPassword(updatePasswordData).unwrap();

      console.log(res);
      // Check if the status indicates a failure
      if (res?.data?.status === "password update failed") {
        // Show an error message and keep the modal open for retry
        toast.error("Invalid verification code");
      } else {
        // Show success message and close the modal
        toast.success("Password updated successfully");
        reset();
        onClose(); // Close modal on successful password update
      }
    } catch (err: any) {
      // Handle API call failure
      //   toast.error(err?.message || "An error occurred", {
      //     id: toastId,
      //     duration: 2000,
      //   });
      console.log(err);
    }
  };

  return (
    <Modal
      className="modal-container" // Add custom CSS for modal as needed
      isOpen={isOpen}
      onOpenChange={onClose} // Controls open/close based on props
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Password Update
        </ModalHeader>
        <ModalBody>
          {/* Password update form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4">
              <Input
                label="Verification Code"
                type="number"
                {...register("verifiedCode", {
                  required: "Verification code is required",
                })}
              />
            </div>
            <div className="pb-4">
              <Input
                label="New Password"
                type="password" // Password input for security
                {...register("newPassword", {
                  required: "New password is required",
                })}
              />
            </div>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => {
                  onClose(); // Close modal without saving changes
                  reset(); // Reset the form
                }}
              >
                Close
              </Button>
              <Button color="primary" type="submit">
                Verify & Update
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
