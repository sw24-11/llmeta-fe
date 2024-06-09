// Metadata Content 렌더링
export default function RenderLogMetaDataContent({ selectedExtraction }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {selectedExtraction?.input?.file ? (
        selectedExtraction.input.file.startsWith("JVBERi0") ? (
          selectedExtraction?.output.map((feature, index) => (
            <div className="flex flex-col" key={index}>
              <span className="text-gray-500 dark:text-gray-400">
                {feature.key}
              </span>
              <span className="font-medium">
                {feature.value === "Not provided" ? "-" : feature.value}
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400">
              Description
            </span>
            <span className="font-medium">
              {selectedExtraction.output[0]?.value}
            </span>
          </div>
        )
      ) : (
        <div className="text-gray-500 dark:text-gray-400">
          No preview available.
        </div>
      )}
    </div>
  );
}
