import React from "react";

export default function RenderLogMetaDataContent({
  selectedExtraction,
  showAll,
  toogleShowAll,
}) {
  const isPDF = selectedExtraction?.input?.file.startsWith("JVBERi0");
  const contents = selectedExtraction?.output;

  return (
    <div className="grid grid-cols-1 gap-4">
      {selectedExtraction?.input?.file ? (
        // pdf file
        isPDF ? (
          contents.map((feature, index) => (
            <div className="flex flex-col" key={index}>
              {/* key */}
              <span className="text-gray-500 dark:text-gray-400">
                {feature.key}
              </span>
              {/* value */}
              <span className="font-medium">
                {feature.value === "Not provided" ? "-" : feature.value}
              </span>
            </div>
          ))
        ) : (
          // image file
          <div className="grid grid-cols-1 gap-4">
            {contents
              // 처음에는 1개만 보여주고, 버튼을 누르면 전체를 보여줌
              .slice(0, showAll ? undefined : 1)
              .map((item, index) => (
                <div className="flex flex-col">
                  {/* key */}
                  <span className="text-gray-500 dark:text-gray-400">
                    {index === 0 ? "Description" : "Relation"}
                  </span>
                  {/* value */}
                  <React.Fragment key={index}>
                    {item.value}
                    {index < contents.length - 1 && <br />}
                  </React.Fragment>
                </div>
              ))}
            {/* show all Button */}
            {contents.length > 1 && (
              <button
                className="mt-2 text-blue-500 hover:text-blue-700"
                onClick={toogleShowAll}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        )
      ) : (
        <div className="text-gray-500 dark:text-gray-400">
          Select an extraction to view metadata
        </div>
      )}
    </div>
  );
}
