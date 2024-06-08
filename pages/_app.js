import Header from "@/components/Header";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // login, 기본 도메인을 제외하고 localStorage에서 userName 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userName = localStorage.getItem("userName");
      if (
        !userName &&
        router.pathname !== "/login" &&
        router.pathname !== "/sign-up"
      ) {
        alert("로그인이 필요합니다.");
        router.push("/login");
      }
    }
  }, [router.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header></Header>
      <Component {...pageProps} />
    </div>
  );
}
