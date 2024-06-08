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
import { Separator } from "@/components/Separator";
import { Input } from "@/components/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "../lib/axios";

export default function Login() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", loginForm);
      // 로그인 성공 시 처리 로직 추가
      console.log(response);
      // localStorage에 userName 저장
      console.log(response);
      localStorage.setItem("userName", response.data.data.name);
      localStorage.setItem("userEmail", response.data.data.email);
      router.push("/");
    } catch (error) {
      // 로그인 실패 시 처리 로직 추가
      alert("로그인 실패");
    }
  };

  return (
    <>
      <Separator className="my-4" />
      <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
    </>
  );
}
