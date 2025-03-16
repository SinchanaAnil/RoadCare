
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Mail, 
  Phone, 
  LogIn, 
  AlertCircle, 
  ArrowRight, 
  CircleUser 
} from 'lucide-react';

const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .regex(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const Login = () => {
  const [activeTab, setActiveTab] = useState<string>('email');
  const { login } = useAuth();
  const navigate = useNavigate();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onEmailSubmit = (data: z.infer<typeof emailSchema>) => {
    login(data.email);
    navigate('/dashboard');
  };

  const onPhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    login(undefined, data.phone);
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider: string) => {
    // Mock social login
    login(`user@${provider}.com`);
    navigate('/dashboard');
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-fixit-primary/10 p-2">
              <CircleUser className="h-10 w-10 text-fixit-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-fixit-primary">Road</span>
            <span className="text-fixit-accent">Care</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to report and track road issues in Bangalore
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="email" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="data-[state=active]:bg-fixit-primary data-[state=active]:text-primary-foreground">
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={emailForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-fixit-primary hover:bg-fixit-primary/90">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4">
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={phoneForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-fixit-primary hover:bg-fixit-primary/90">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('google')}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20H24v8h11.3c-1.1 5.2-5.5 8-11.3 8-6.9 0-12.5-5.6-12.5-12.5S17.1 11 24 11c3.2 0 6.1 1.2 8.3 3.2l5.9-5.9C34.6 4.4 29.5 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.4-4z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.8 5c2-4.3 6.2-7.2 11-7.2 3.2 0 6.1 1.2 8.3 3.2l5.9-5.9C34.6 4.4 29.5 2 24 2c-8.9 0-16.5 5.7-19.7 13.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 46c5.4 0 10.3-2.3 13.6-6l-6.5-5.1c-1.8 1.6-4.2 2.5-7.1 2.5-5.7 0-10.6-3.8-12.2-9H5.4C8.6 38.7 15.7 46 24 46z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20H24v8h11.3c-.5 2.7-2.1 5-4.2 6.4l6.5 5.1c4.6-4.3 7.4-10.7 7.4-17.9 0-1.3-.2-2.7-.4-4z"
                />
              </svg>
              Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('apple')}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 4 7.5 1.088-.046 1.679-.5 3-.5 1.312 0 1.5.5 3 .5s4-3 4-5c-.028-.01-2.472-.403-2.5-3-.019-2.17 2.416-2.954 2.5-3-1.023-1.492-2.951-1.963-3.5-2-1.433-.111-2.83 1-3.5 1-.68 0-1.9-1-3-1z" />
                <path d="M12 4a2 2 0 0 0 2-2 2 2 0 0 0-2 2" />
              </svg>
              Apple
            </Button>
          </div>

          <div className="flex items-center justify-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?
            </p>
            <Button variant="link" className="text-fixit-primary p-0 h-auto">
              Sign Up
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to RoadCare's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
