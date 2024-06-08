import { LoadingIcon } from "./Icons";

export default function LoadingOverlay({ isLoading }) {
  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative bg-white rounded-lg p-8">
        <div className="flex items-center justify-center">
          <LoadingIcon className="h-8 w-8 mr-2 animate-spin" />
          <span className="text-lg font-medium">Extracting metadata...</span>
        </div>
      </div>
    </div>
  ) : null;
}
