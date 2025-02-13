'use client'

import { ApiResponse } from '@/app/types'
import { apiUrl } from '@/app/utils'
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
import { Link } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRef } from 'react'

export function SignUpForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    async function signUp() {
        const firstName = firstNameRef.current?.value
        const lastName = lastNameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        const confirmPassword = confirmPasswordRef.current?.value

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    confirm_password: confirmPassword,
                }),
            })

            const json: ApiResponse = await response.json()
            if (!response.ok) {
                throw new Error(json.message)
            }

            const login = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (!login) {
                throw new Error('Sign up failed')
            }

            if (login.ok) {
                window.location.href = '/'
                return
            }

            throw new Error('Sign up failed')
        } catch (err: any) {
            alert(err.message)
        }
    }
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your email below to create to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="firstName">
                                            First Name
                                        </Label>
                                    </div>
                                    <Input
                                        id="firstName"
                                        type="firstName"
                                        ref={firstNameRef}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                signUp()
                                            }
                                        }}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="lastName">
                                            Last Name
                                        </Label>
                                    </div>
                                    <Input
                                        id="lastName"
                                        type="lastName"
                                        ref={lastNameRef}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                signUp()
                                            }
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="test@example.com"
                                    ref={emailRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            signUp()
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
                                    ref={passwordRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            signUp()
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirmPassword">
                                        Comfirm Password
                                    </Label>
                                </div>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    ref={confirmPasswordRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            signUp()
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <Button
                                type="button"
                                className="w-full"
                                onClick={signUp}
                            >
                                Sign Up
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="underline underline-offset-4"
                            >
                                Log In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
