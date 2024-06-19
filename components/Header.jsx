import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import Link from "next/link";
import { FlagIcon } from "./constants/Icons";

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
            {/* 유저 이름 버튼 */}
            <Button
              className={`text-black hover:bg-gray-200 transition-transform ${
                showLogout ? "mr-4" : ""
              }`}
              variant="outline"
              onClick={handleUserNameClick}
            >
              {userName}
            </Button>
            {/* 로그아웃 버튼 */}
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
          // 로그인, 회원가입 버튼
          <Button variant="default" onClick={handleClickMove}>
            {router.pathname === "/login" ? "Sign Up" : "Login"}
          </Button>
        )}
      </div>
    </header>
  );
}
