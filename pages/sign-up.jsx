import { Button } from "@/components/Button";
import { Separator } from "@/components/Separator";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/Card";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { useState } from "react";
import axios from "axios";
import Modal from "@/components/Modal";

export default function SignUp() {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    job: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailCheckClicked, setEmailCheckClicked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);

  const [passWordLengthPass, setPassWordLengthPass] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  // 회원가입 버튼 클릭
  const handleSignUp = async () => {
    // try {
    //   const { confirmPassword, ...signUpData } = signUpForm;
    //   const response = await axios.post("/signup", signUpData);
    //   // 회원가입 성공 시 처리 로직 추가
    //   console.log(response.data);
    // } catch (error) {
    //   // 회원가입 실패 시 처리 로직 추가
    //   console.error(error);
    // }
  };

  // 이메일 중복 체크
  const checkEmail = async () => {
    // try {
    //   const response = await axios.post("/signup/redundancyCheck", {
    //     email: signUpForm.email,
    //   });
    //   setEmailAvailable(response.data.available);
    // } catch (error) {
    //   console.error(error);
    // }
    setEmailCheckClicked(true);
    setEmailAvailable(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setPasswordMatch(signUpForm.password === value);
    }
    // 8자리 이상 비밀번호
    if (name == "password") {
      if (value.length >= 8) {
        setPassWordLengthPass(true);
      } else {
        setPassWordLengthPass(false);
      }
    }
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  // const handleClickConfirm = () => {
  //   setEmailAvailable(true);
  // };

  return (
    <>
      <Separator className="my-4" />
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Kim SeokHee"
                  required
                  value={signUpForm.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job">Job</Label>
                <Input
                  id="job"
                  name="job"
                  placeholder="Frontend Engineer"
                  required
                  value={signUpForm.job}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="email"
                    name="email"
                    placeholder="cat1181123@naver.com"
                    required
                    type="email"
                    value={signUpForm.email}
                    onChange={handleInputChange}
                  />
                  <Button variant="outline" onClick={checkEmail}>
                    Check Email
                  </Button>
                </div>
                {emailCheckClicked &&
                  (emailAvailable ? (
                    <p className="text-sm text-green-700">Available email</p>
                  ) : (
                    <p className="text-sm text-red-700">Unavailable email</p>
                  ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  required
                  placeholder="********"
                  type="password"
                  value={signUpForm.password}
                  onChange={handleInputChange}
                />
              </div>
              {!passWordLengthPass && signUpForm.password && (
                <p className="text-sm text-red-700">
                  Password must be at least 8 characters
                </p>
              )}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  required
                  placeholder="********"
                  type="password"
                  value={signUpForm.confirmPassword}
                  onChange={handleInputChange}
                />
                {!passwordMatch && signUpForm.confirmPassword && (
                  <p className="text-sm text-red-700">Password do not match</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSignUp}
                disabled={
                  !signUpForm.name ||
                  !signUpForm.job ||
                  !signUpForm.email ||
                  !signUpForm.password ||
                  !signUpForm.confirmPassword ||
                  !emailAvailable ||
                  !passwordMatch ||
                  !passWordLengthPass
                }
              >
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </div>
        {/* {emailCheckModalOpen && (
          <Modal
            title="Modal Title"
            description="This is a description for the modal."
            setModalState={setEmailCheckModalOpen}
            onConfirm={handleClickConfirm}
          >
            <p>This is the content of the modal.</p>
          </Modal>
        )} */}
      </main>
    </>
  );
}
