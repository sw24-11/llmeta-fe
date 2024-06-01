import { Button } from "./Button";

function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 text-black sm:px-6 lg:px-8">
      <div className="flex items-center">
        <FlagIcon className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">LLMETA</h1>
      </div>
      <Button className="text-black hover:bg-gray-200" variant="outline">
        Sign In
      </Button>
    </header>
  );
}
