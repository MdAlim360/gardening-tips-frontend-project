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
import { toast } from "sonner";
import { useRecoveryPasswordMutation } from "@src//redux/features/user/userManagement";

import UpdatePasswordModal from "./UpdatePasswordModal";

export default function RecoveryPasswordModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Controls the recovery modal visibility
  const [recoveryPassword] = useRecoveryPasswordMutation();

  // State to control the visibility of the UpdatePasswordModal
  const [isUpdatePasswordModalOpen, setUpdatePasswordModalOpen] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Check your email for verification code...");

    const verifyEmail = { ...data };

    try {
      const res: any = await recoveryPassword(verifyEmail).unwrap();

      toast.success("Check your email for the verification code", {
        id: toastId,
        duration: 2000,
      });

      // Automatically open UpdatePasswordModal after successful recovery
      setUpdatePasswordModalOpen(true);
      onOpenChange(); // Close the recovery modal
    } catch (err: any) {
      toast.error(err?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }

    reset();
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="-mt-1 text-sm bg-gray-100 font-medium text-blue-600 max-w-fit"
        onClick={onOpen} // Opens the recovery modal
      >
        Forget Recovery
      </Button>

      <Modal
        className="modal-container" // Add z-index in CSS if needed
        isOpen={isOpen}
        placement="auto"
        onOpenChange={onOpenChange} // Handles open/close state of the recovery modal
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Password Recovery
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
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

      {/* Automatically open the UpdatePasswordModal after recovery */}
      {isUpdatePasswordModalOpen && (
        <UpdatePasswordModal
          isOpen={isUpdatePasswordModalOpen}
          onClose={() => setUpdatePasswordModalOpen(false)} // Close UpdatePasswordModal when done
        />
      )}
    </div>
  );
}
