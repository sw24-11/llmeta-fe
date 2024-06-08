import React from "react";
import { Button } from "@/components/Button";

const Modal = ({ title, description, children, onConfirm, onClose }) => {
  const closeModal = () => {
    onClose();
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

  // 모달 내부 클릭 시 이벤트 전파 방지
  const handleModalClick = (e) => {
    e.stopPropagation();
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

      <div
        className="relative rounded-lg bg-white p-8"
        onClick={handleModalClick}
      >
        <h2 className="text-xl font-medium leading-6 text-gray-900">{title}</h2>
        <p className="mt-2 mb-2 text-sm text-gray-500">{description}</p>

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
