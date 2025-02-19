'use client'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRef } from 'react'
export function LoginForm({
    className,
    callbackUrl,
    ...props
}: React.ComponentPropsWithoutRef<'div'> & {
    callbackUrl: string
}) {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function loginHandler() {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        try {
            const login = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (!login) {
                throw new Error('Log in failed')
            }

            if (login.ok) {
                window.location.href = callbackUrl
                return
            }

            throw new Error('Log in failed')
        } catch (err: unknown) {
            alert(err)
        }
    }
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="test@example.com"
                                    ref={emailRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            loginHandler()
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            loginHandler()
                                        }
                                    }}
                                    ref={passwordRef}
                                />
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Button
                                className="w-full"
                                type="button"
                                onClick={loginHandler}
                            >
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/signup"
                                className="underline underline-offset-4"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
