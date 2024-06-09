import React, { useState } from "react";

export default function RenderLogMetaDataContent({
  selectedExtraction,
  showAll,
  toogleShowAll,
}) {
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
          <div className="grid grid-cols-1 gap-4">
            {selectedExtraction.output
              .slice(0, showAll ? undefined : 1)
              .map((item, index) => (
                <div className="flex flex-col">
                  {index === 0 ? (
                    <span className="text-gray-500 dark:text-gray-400">
                      Description
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">
                      relation{item.key}
                    </span>
                  )}

                  <React.Fragment key={index}>
                    {item.value}
                    {index < selectedExtraction.output.length - 1 && <br />}
                  </React.Fragment>
                </div>
              ))}

            {selectedExtraction.output.length > 1 && (
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
