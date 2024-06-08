import { Button } from "@/components/Button";
import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  InfoIcon,
  LoadingIcon,
  UploadIcon,
} from "@/components/constants/Icons";

import { Input } from "@/components/Input";
import FileTypeCheckbox from "@/components/FileTypeCheckbox";
import { useRouter } from "next/router";
import axios from "../lib/axios";
import LoadingOverlay from "@/components/LoadingOverlay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";

export default function Home() {
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // 파일 유형 선택 (checkbox)
  const handleFileTypeChange = (fileType) => {
    setSelectedFileType(fileType === selectedFileType ? null : fileType);
    // 파일 유형이 변경되면 선택한 파일과 미리보기 URL 초기화
    if (fileType !== selectedFileType) {
      setSelectedFile(null);
      setPreviewURL(null);
    }
  };

  // 파일 선택 버튼 클릭(Choose File 버튼 클릭 시 hidden input 클릭)
  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 (hidden Input)
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(null);
    }
  };

  const isFileAllowed = (file) => {
    if (selectedFileType === "image") {
      return file.type === "image/jpeg" || file.type === "image/png";
    } else if (selectedFileType === "pdf") {
      return file.type === "application/pdf";
    }
    return false;
  };

  // 메타데이터 추출
  const handleExtract = async () => {
    if (!selectedFile || !isFileAllowed(selectedFile)) {
      alert("Please select a valid file.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // type: "IMAGE" | "PAPER"
      let type;
      if (selectedFileType === "image") {
        type = "IMAGE";
      } else if (selectedFileType === "pdf") {
        type = "PAPER";
      }

      const response = await axios.post("/metadata/extraction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          type,
        },
      });

      console.log(response);

      // Handle successful response
      setIsLoading(false);
      router.push(`/logs`);
    } catch (error) {
      // Handle error
      setIsLoading(false);
      console.error(error);
      alert("An error occurred while extracting metadata.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <LoadingOverlay isLoading={isLoading} />
        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>LLMETA Service</CardTitle>
              <CardDescription>
                LLMETA is a powerful tool that extracts metadata from images and
                PDFs. Our service uses advanced AI and machine learning
                algorithms to provide detailed information about your files,
                including file type, size, resolution, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <InfoIcon className="h-12 w-12" />
                <p>
                  With LLMETA, you can easily analyze your files and gain
                  valuable insights to improve your workflow and
                  decision-making.
                </p>

                <Link
                  href="/llmeta.pdf"
                  target="_black"
                  rel="noopener noreferrer"
                >
                  <Button className="border-solid">Learn More</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center justify-center space-x-4">
            <FileTypeCheckbox
              label="Image"
              value="image"
              checked={selectedFileType === "image"}
              onChange={() => handleFileTypeChange("image")}
            />
            <FileTypeCheckbox
              label="PDF"
              value="pdf"
              checked={selectedFileType === "pdf"}
              onChange={() => handleFileTypeChange("pdf")}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Upload File</CardTitle>
                <CardDescription>
                  Select an image or PDF file to extract metadata.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center flex-col">
                  {previewURL ? (
                    selectedFileType === "image" ? (
                      <img
                        src={previewURL}
                        alt="Preview"
                        className="w-full object-cover mb-4"
                      />
                    ) : (
                      <iframe
                        src={previewURL}
                        title="Preview"
                        className="w-full h-96 object-cover mb-4"
                      />
                    )
                  ) : (
                    <></>
                  )}

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleChooseFileClick}
                    disabled={!selectedFileType}
                  >
                    <UploadIcon className="h-5 w-5 mr-2" />
                    Choose File
                  </Button>
                  <Input
                    type="file"
                    accept={
                      selectedFileType === "image"
                        ? "image/jpeg,image/png"
                        : selectedFileType === "pdf"
                        ? "application/pdf"
                        : ""
                    }
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-md">
            <Button
              className="w-full mb-4"
              onClick={handleExtract}
              disabled={!selectedFile || isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingIcon className="h-5 w-5 mr-2 animate-spin" />
                  Extracting...
                </>
              ) : (
                "Extract"
              )}
            </Button>
            <Button
              variant="default"
              asChild="true"
              className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <Link href="/logs">View Logs</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
