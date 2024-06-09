import Image from "next/image";

// Preview Content 렌더링
export default function RenderLogPreviewContent({ selectedExtraction }) {
  return (
    <div className="flex items-center justify-center">
      {selectedExtraction?.input?.file ? (
        selectedExtraction.input.file.startsWith("JVBERi0") ? (
          <iframe
            title="File Preview"
            className="rounded-lg object-contain"
            src={`data:application/pdf;base64,${selectedExtraction.input.file}`}
            style={{
              aspectRatio: "1/1.414",
              width: "100%",
              border: "none",
            }}
          />
        ) : (
          <div
            className="relative"
            style={{
              height: "0",
              width: "100%",
              paddingBottom: "56.25%",
            }}
          >
            <Image
              alt="File Preview"
              className="rounded-lg"
              src={`data:image/png;base64,${selectedExtraction.input.file}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )
      ) : (
        <div className="text-gray-500 dark:text-gray-400">
          Select an extraction to preview
        </div>
      )}
    </div>
  );
}
