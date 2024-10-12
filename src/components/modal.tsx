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

import { useUpdateUserMutation } from "../redux/features/user/userManagement";

export default function EditModal({ userId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const updatedData = Object.keys(data)
      .filter((key) => data[key])
      .reduce((obj, key) => {
        obj[key] = data[key];

        return obj;
      }, {});

    try {
      await updateUser({
        id: userId,
        payload: {
          ...updatedData,
        },
      }).unwrap();

      toast.success(`Successfully edited!`);
    } catch (error) {
      toast.error("Failed to update user.");
    }

    onOpenChange(false);
    reset();
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="-mt-1 text-lg bg-gray-100 font-medium text-blue-600 max-w-fit"
        onPress={onOpen}
      >
        Edit Profile
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
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="pb-4">
                    <Input label="Name" type="text" {...register("name")} />
                  </div>
                  <div className="pb-4">
                    <Input
                      label="Photo Link"
                      type="text"
                      {...register("photoLink")}
                    />
                  </div>
                  <div className="pb-4">
                    <Input
                      label="Cover Photo Link"
                      type="text"
                      {...register("coverPhotoLink")}
                    />
                  </div>
                </form>
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
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
