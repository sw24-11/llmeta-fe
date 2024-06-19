import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/Card";
import { StarIcon } from "@/components/constants/Icons";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Modal from "@/components/Modal";
import RenderLogActionsContent from "@/components/RenderLogActionsContent";
import RenderLogMetaDataContent from "@/components/RenderLogMetaDataContent";
import RenderLogPreviewContent from "@/components/RenderLogPreviewContent";
import LogLeftBarSkeleton from "@/components/LogLeftBarSkeletonUi";

export default function Logs() {
  const [userEmail, setUserEmail] = useState("");
  const [extractions, setExtractions] = useState([]);
  const [selectedExtraction, setSelectedExtraction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [evalueateModal, setEvalueateModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Fetch User Email from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userEmail");
      if (storedUserName) {
        setUserEmail(storedUserName);
      }
    }
  }, []);

  // Fetch Metadata Logs
  useEffect(() => {
    if (userEmail) {
      const fetchMetadata = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get("/metadata/logs", {
            params: { email: userEmail },
          });
          console.log(response);
          setExtractions(response.data.data.logs);
        } catch (e) {
          alert("Failed to fetch metadata.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMetadata();
    }
  }, [userEmail]);

  // LeftBar Click Handler
  const handleExtractionClick = (extraction) => {
    setSelectedExtraction(extraction);
    setShowAll(false);
  };

  const handleClickDownload = () => {
    if (selectedExtraction?.input?.file) {
      const base64Data = selectedExtraction.input.file;

      // 확장자
      let extension = "txt";
      if (base64Data.startsWith("JVBERi0")) {
        extension = "pdf";
      } else {
        extension = "png";
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = `data:application/octet-stream;base64,${selectedExtraction.input.file}`;
      downloadLink.download = `preview_file.${extension}`;
      downloadLink.click();
    }
  };

  /**
   * 디코딩된 이진 데이터는 JavaScript에서 바로 Blob 객체로 변환할 수 없기 때문에,
   * Uint8Array로 변환된 후에 Blob 객체로 만들어집니다.
   * 이렇게 하는 이유는 Blob 객체를 사용하여 더욱 다양한 파일 작업을 수행할 수 있기 때문입니다.
   * 단순히 Base64 인코딩된 문자열을 Blob 객체로 변환하지 않는 이유는,
   * Base64로 인코딩된 데이터는 텍스트 형태이기 때문에, 이를 다루기 위해 디코딩하고 이진 데이터로 변환해야 합니다.
   * 이를 통해 JavaScript에서 바이너리 데이터를 더 쉽게 다룰 수 있습니다.
   */

  // const handleClickDownload = () => {
  //   if (selectedExtraction?.input?.file) {
  //     const byteCharacters = atob(selectedExtraction.input.file);
  //     const byteNumbers = new Array(byteCharacters.length);
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     const blob = new Blob([byteArray], { type: "application/octet-stream" });

  //     let extension = "txt"; // 기본 확장자

  //     // MIME 유형이 있는지 확인

  //     if (selectedExtraction.input.file.startsWith("JVBERi0")) {
  //       extension = "pdf";
  //     } else {
  //       extension = "png";
  //     }

  //     const fileName = `preview_file.${extension}`;
  //     const blobUrl = URL.createObjectURL(blob);

  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = blobUrl;
  //     downloadLink.download = fileName;
  //     downloadLink.click();

  //     URL.revokeObjectURL(blobUrl);
  //   }
  // };

  // Evaluate Button Click Handler
  const handleClickEvaluate = () => {
    setEvalueateModal(true);
  };

  // 평가 별점 Click Handler
  const handleStarClick = (value) => {
    setRating(value);
  };

  // 평가 피드백 Change Handler
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // 평가 제출 Handler
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/metadata/evaluation", {
        extractionId: selectedExtraction.extractionId,
        rate: rating,
        feedback: feedback,
      });
      if (response.data.status === 200) {
        alert("평가가 완료되었습니다.");
      }
    } catch (e) {
      alert("평가에 실패했습니다.");
    } finally {
      setEvalueateModal(false);
      setRating(0);
      setFeedback("");
    }
  };

  // Modal Close Handler
  const handleCloseModal = () => {
    setFeedback("");
    setRating(0);
    setEvalueateModal(false);
  };

  return (
    <div className="flex h-screen">
      {/* LeftBar */}
      <div className="bg-white p-4 flex flex-col items-start justify-between border border-gray-200 md:w-1/5 lg:w-1/6 h-full overflow-y-auto">
        <nav className="space-y-2 w-full">
          {isLoading ? (
            <>
              <LogLeftBarSkeleton />
              <LogLeftBarSkeleton />
              <LogLeftBarSkeleton />
            </>
          ) : extractions.length ? (
            extractions.map((extraction, index) => (
              <div
                key={index}
                className="py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-md mb-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={() => handleExtractionClick(extraction)}
              >
                {/* Displaying 'E' followed by index number on mobile screens */}
                <span className="md:hidden lg:hidden">E{index + 1}</span>
                {/* Displaying full "Extraction" text on larger screens */}
                <span className="hidden lg:inline md:inline">
                  Extraction {index + 1}
                </span>
              </div>
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              No extractions found. Please upload a file to extract metadata.
            </div>
          )}
        </nav>
      </div>
      {/* Right Content */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-950 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MetaData Card */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
              <CardDescription>
                Detailed information about your file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderLogMetaDataContent
                selectedExtraction={selectedExtraction}
                showAll={showAll}
                toogleShowAll={() => setShowAll(!showAll)}
              />
            </CardContent>
          </Card>
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                A preview of the extracted file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderLogPreviewContent
                selectedExtraction={selectedExtraction}
              />
            </CardContent>
          </Card>
          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>
                Perform additional actions on the file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderLogActionsContent
                selectedExtraction={selectedExtraction}
                handleClickDownload={handleClickDownload}
                handleClickEvaluate={handleClickEvaluate}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      {/* 평가 모달 */}
      {evalueateModal && (
        <Modal
          title="평가하기"
          description="10점 만점으로 평가해주세요."
          onClose={handleCloseModal}
          onConfirm={handleSubmit}
        >
          <div className="flex items-center space-x-2">
            {[...Array(10)].map((_, index) => (
              <StarIcon
                key={index}
                filled={index < rating}
                onClick={() => handleStarClick(index + 1)}
              />
            ))}
          </div>
          <textarea
            placeholder="피드백을 작성해주세요."
            value={feedback}
            onChange={handleFeedbackChange}
            className="mt-2 p-2 border border-gray-200 rounded-md w-full resize-none"
          />
        </Modal>
      )}
    </div>
  );
}
