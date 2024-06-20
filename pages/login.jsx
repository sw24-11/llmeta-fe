import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "../lib/axios";
// import { setCookie } from "cookies-next";

export default function Login() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // input 변경 시 loginForm 업데이트
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  // 로그인 버튼 클릭
  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", loginForm);
      if (response.status === 200) {
        localStorage.setItem("userName", response.data.data.name);
        localStorage.setItem("userEmail", response.data.data.email);
        /**
         * SSR 환경을 위한 쿠기 설정
         */
        // setCookie("userName", response.data.data.name);
        // setCookie("userEmail", response.data.data.email);
        router.push("/");
      }
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email and password to access the LLMETA service.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="cat1181123@naver.com"
                type="email"
                value={loginForm.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
