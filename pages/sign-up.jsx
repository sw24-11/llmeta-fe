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

export default function SignUp() {
  return (
    <>
      <header className="flex items-center justify-between bg-white px-4 py-3 text-black sm:px-6 lg:px-8">
        <div className="flex items-center">
          <FlagIcon className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">LLMETA</h1>
        </div>
        <Button className="text-black hover:bg-gray-200" variant="outline">
          Sign In
        </Button>
      </header>
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
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job">Job</Label>
                <Input id="job" placeholder="Software Engineer" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="email"
                    placeholder="example@email.com"
                    required
                    type="email"
                  />
                  <Button variant="outline">Check Email</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" required type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" required type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign Up</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}

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
