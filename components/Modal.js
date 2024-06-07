import React, { useState } from "react";
import { Button } from "@/components/Button";

const Modal = ({ title, description, children, setModalState, onConfirm }) => {
  const closeModal = () => {
    setModalState(false);
  };

  // 취소 버튼
  const handleClickCancel = () => {
    closeModal();
  };

  // 확인 버튼
  const handleClickConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={closeModal}
      ></div>

      <div className="relative rounded-lg bg-white p-8">
        <h2 className="text-xl font-medium leading-6 text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">{description}</p>

        {children}

        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleClickCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleClickConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
