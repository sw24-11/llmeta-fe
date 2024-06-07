import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import React, { useState, useRef } from "react";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { InfoIcon, UploadIcon } from "@/components/Icons";

import { Input } from "@/components/Input";
import FileTypeCheckbox from "@/components/FileTypecheckbox";

export default function Home() {
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileTypeChange = (fileType) => {
    setSelectedFileType(fileType === selectedFileType ? null : fileType);
  };

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

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Separator className="my-4" />
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <iframe
                        src={previewURL}
                        title="Preview"
                        className="w-full h-64"
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
      </main>
    </>
  );
}
