import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import Link from "next/link";

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
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, [router.pathname]);

  const handleClickMove = () => {
    if (router.pathname === "/login") {
      router.push("/sign-up");
    } else {
      router.push("/login");
    }
  };

  const handleUserNameClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserName("");
    setShowLogout(false);
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 text-black sm:px-6 lg:px-8 shadow-md border-b border-gray-200">
      <Link href="/">
        <div className="flex items-center">
          <FlagIcon className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">LLMETA</h1>
        </div>
      </Link>
      <div className="relative flex items-center">
        {router.pathname !== "/login" && router.pathname !== "/sign-up" ? (
          <>
            <Button
              className={`text-black hover:bg-gray-200 transition-transform ${
                showLogout ? "mr-4" : ""
              }`}
              variant="outline"
              onClick={handleUserNameClick}
            >
              {userName}
            </Button>
            {showLogout && (
              <Button
                className="text-black hover:bg-gray-200"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </>
        ) : (
          <Button
            className="text-black hover:bg-gray-200"
            variant="outline"
            onClick={handleClickMove}
          >
            {router.pathname === "/login" ? "Sign Up" : "Login"}
          </Button>
        )}
      </div>
    </header>
  );
}
