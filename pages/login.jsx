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

// 📌 기능 요구사항
// 로그인 안 된 경우, alert로 로그인 하라고 띄우기
// 로그인 후 home에는 우측 상단에 sign in 버튼 대신 sign out 버튼
// 로그인 api 연결
// 로그아웃 기능
// login 버튼 상단에 sign up 버튼(텍스트 클릭 시 sign up page로 이동) 만들기

// 📌 추가 요구사항
// 로그인을 하면 session Id가 cookie로 옵니다. 정상적으로 오면 로그인 성공

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
    // try {
    //   const response = await axios.post("/login", loginForm);
    //   // 로그인 성공 시 처리 로직 추가
    //   console.log(response.data);
    // } catch (error) {
    //   // 로그인 실패 시 처리 로직 추가
    //   console.error(error);
    // }

    // localStorage에 userName 저장
    localStorage.setItem("userName", "김석희");
    router.push("/");
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
