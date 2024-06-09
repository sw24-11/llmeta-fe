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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userEmail");
      if (storedUserName) {
        setUserEmail(storedUserName);
      }
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      const fetchMetadata = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get("/metadata/logs", {
            params: { email: userEmail },
          });
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

  const handleExtractionClick = (extraction) => {
    setSelectedExtraction(extraction);
  };

  const handleClickDownload = () => {
    if (selectedExtraction?.input?.file) {
      const downloadLink = document.createElement("a");
      downloadLink.href = `data:application/octet-stream;base64,${selectedExtraction.input.file}`;
      downloadLink.download = "preview_file";
      downloadLink.click();
    }
  };

  const handleClickEvaluate = () => {
    setEvalueateModal(true);
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

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

  const handleCloseModal = () => {
    setFeedback("");
    setRating(0);
    setEvalueateModal(false);
  };

  return (
    <div className="flex h-screen">
      {/* LeftBar */}
      <div className="bg-white p-4 flex flex-col items-start justify-between border border-gray-200 w-56">
        <nav className="space-y-2 w-full overflow-y-auto">
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
                Extraction {index + 1}
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
              />
            </CardContent>
          </Card>
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
