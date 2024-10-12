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
import { useChangePasswordMutation } from "@src//redux/features/user/userManagement";

export default function ChangePasswordModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Controls the recovery modal visibility
  const [changePassword] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any, onClose: any) => {
    const updatePasswordData = {
      ...data,
    };

    try {
      const res = await changePassword(updatePasswordData).unwrap();

      toast.success("Password changed successfully");
      reset();
      onClose(); // Close modal on successful password update
    } catch (err: any) {
      // Extracting the error message
      const errorMessage =
        err?.data?.message || err?.error || "An error occurred";

      toast.error(`${errorMessage}`);
      console.error("Password change error:", err); // For debugging
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="-mt-1 text-sm bg-gray-100 font-medium text-blue-600 max-w-fit"
        onClick={onOpen} // Opens the recovery modal
      >
        Change Password
      </Button>

      <Modal
        className="modal-container"
        isOpen={isOpen}
        placement="auto"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change Password
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit((data) => onSubmit(data, onClose))}
                >
                  <div className="pb-4">
                    <Input
                      label="Email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                  </div>
                  <div className="pb-4">
                    <Input
                      label="Old Password"
                      type="password"
                      {...register("oldPassword", {
                        required: "Old password is required",
                      })}
                    />
                  </div>
                  <div className="pb-4">
                    <Input
                      label="New Password"
                      type="password"
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
