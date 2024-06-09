import Link from "next/link";
import { Button } from "./Button";
import { DownloadIcon, EvaluateIcon, ShareIcon } from "./constants/Icons";

export default function RenderLogActionsContent({
  selectedExtraction,
  handleClickDownload,
  handleClickEvaluate,
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Button
        variant="secondary"
        onClick={handleClickDownload}
        disabled={selectedExtraction === null}
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
        disabled={selectedExtraction === null}
        className="w-full"
      >
        <EvaluateIcon className="h-5 w-5 mr-2" />
        Evaluate
      </Button>
    </div>
  );
}
