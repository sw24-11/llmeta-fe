import Link from "next/link";
import { Button } from "@/components/Button";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/Card";
import {
  DownloadIcon,
  EvaluateIcon,
  ShareIcon,
  StarIcon,
} from "@/components/Icons";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Modal from "@/components/Modal";

export default function Logs() {
  const [userEmail, setUserEmail] = useState("");
  const [extractions, setExtractions] = useState([]);
  const [selectedExtraction, setSelectedExtraction] = useState(null);
  const [evalueateModal, setEvalueateModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // userEmail 등록
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userEmail");
      if (storedUserName) {
        setUserEmail(storedUserName);
      }
    }
  }, []);

  // metaData 요청
  useEffect(() => {
    if (userEmail) {
      const fetchMetadata = async () => {
        try {
          console.log(userEmail);
          const response = await axios.get("/metadata/logs", {
            params: { email: userEmail },
          });
          console.log(response.data.data.logs);
          setExtractions(response.data.data.logs); // 추출 데이터를 state에 저장
        } catch (e) {
          console.error(e);
        }
      };

      fetchMetadata();
    }
  }, [userEmail]);

  // LeftBar에서 Extraction 클릭
  const handleExtractionClick = (extraction) => {
    setSelectedExtraction(extraction);
  };

  // Download 버튼 클릭
  const handleClickDownload = () => {
    if (selectedExtraction?.input?.file) {
      const downloadLink = document.createElement("a");
      downloadLink.href = `data:application/octet-stream;base64,${selectedExtraction.input.file}`;
      downloadLink.download = "preview_file";
      downloadLink.click();
    }
  };

  // Evaluate 버튼 클릭 => Modal 열기
  const handleClickEvaluate = () => {
    setEvalueateModal(true);
  };

  // 별점 클릭
  const handleStarClick = (value) => {
    setRating(value);
  };

  // 피드백 입력
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // 평가 및 피드백 제출
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
      // 평가 및 피드백 초기화
      setRating(0);
      setFeedback("");
    }
  };

  // Modal 닫기
  const handleCloseModal = () => {
    setFeedback("");
    setRating(0);
    setEvalueateModal(false);
  };

  return (
    <div className="flex h-screen">
      {/* LeftBar */}
      <div className="bg-white p-4 flex flex-col items-start justify-between border border-gray-200 w-56">
        <nav className="space-y-2 w-full">
          {extractions?.length ? (
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
          {/* metaData */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
              <CardDescription>
                Detailed information about your file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {selectedExtraction?.output.map((feature, index) => (
                  <div className="flex flex-col" key={index}>
                    <span className="text-gray-500 dark:text-gray-400">
                      {feature.key}
                    </span>
                    <span className="font-medium">
                      {feature.value === "Not provided" ? "-" : feature.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                A preview of the extracted file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                {selectedExtraction?.input?.file ? (
                  selectedExtraction.input.file.startsWith("JVBERi0") ? (
                    <iframe
                      title="File Preview"
                      className="rounded-lg object-contain"
                      src={`data:application/pdf;base64,${selectedExtraction.input.file}`}
                      style={{
                        aspectRatio: "1/1.414", // A4 paper ratio (approximately)
                        width: "100%",
                        border: "none",
                      }}
                    />
                  ) : (
                    <img
                      alt="File Preview"
                      className="rounded-lg object-contain"
                      src={`data:image/png;base64,${selectedExtraction.input.file}`}
                      style={{
                        aspectRatio: "400/500",
                        objectFit: "cover",
                      }}
                    />
                  )
                ) : (
                  <></>
                )}
              </div>
            </CardContent>
          </Card>
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>
                Perform additional actions on the file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Button
                  variant="secondary"
                  onClick={handleClickDownload}
                  disabled={!selectedExtraction}
                  className="w-full"
                >
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Download
                </Button>
                <Button variant="secondary" className="w-full" asChild={true}>
                  <Link href="/">
                    <ShareIcon className="h-5 w-5 mr-2" />
                    Upload
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleClickEvaluate}
                  disabled={!selectedExtraction}
                  className="w-full"
                >
                  <EvaluateIcon className="h-5 w-5 mr-2" />
                  Evaluate
                </Button>
              </div>
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
