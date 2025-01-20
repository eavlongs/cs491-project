import { JwtTokenOptions } from '@/app/types'
import { apiUrl } from '@/app/utils'
import jwt from 'jsonwebtoken'
import { AuthOptions, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

async function login(
    email: string,
    password: string
): Promise<{
    user: User
    token: string
} | null> {
    const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })

    console.log(res)
    const response = await res.json()

    if (res.status == 200) {
        return {
            user: response.data.user,
            token: response.data.token,
        }
    }

    /**
     * This throw error will pass the error to authOption provider of CredentialProvider.authorize function below.
     * it will then pass to sign in action in src\app\user\sign-in\action\signIn.ts and show in the
     * ui as an error message
     */
    throw new Error(response.error[0].message || 'Failed to login')
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'Email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password',
                },
            },
            /**
             * When throwing an error, it will pass down to signIn function in this object.
             * however i did not use it because next auth handle for me.
             * when the error got thrown, using signIn function with redirect = false from "next/react" will return
             * status, error, ok, and url. so i can use it to handle error
             * ref: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
             */
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter your email and password')
                }
                try {
                    const user = (await login(
                        credentials.email,
                        credentials.password
                    )) as any

                    if (user) {
                        return user
                    }

                    throw new Error('Failed to login, user not found')
                } catch (err: any) {
                    throw new Error(err.message)
                }
            },
        }),
    ],
    callbacks: {
        /*
            Flow:
            authorize -> signIn -> jwt -> session

            note: authorize is only called when user logs in with credentials
        */
        // async signIn({ user, profile, account, credentials, email }) {
        //     if (credentials) {
        //         return true
        //     }
        //     const providerUsed = account?.provider
        //     let providerAccountID: string | null,
        //         emailReceived: string,
        //         profilePicture: string | null,
        //         firstName: string,
        //         lastName: string

        //     if (providerUsed == 'google') {
        //         const googleProfile = profile as Profile & {
        //             given_name: string
        //             family_name: string
        //         }
        //         providerAccountID = account?.providerAccountId ?? null
        //         emailReceived = googleProfile?.email ?? ''
        //         profilePicture = user.image ?? null
        //         firstName = googleProfile?.given_name ?? ''
        //         lastName = googleProfile?.family_name ?? ''
        //         // dob and gender will be implemented later
        //     } else if (providerUsed == 'facebook') {
        //         // TODO: ask for clarification if this is needed, if it is needed, we need to consider how to handle account with only phone number
        //         providerAccountID = account?.providerAccountId ?? null
        //         emailReceived = user.email ?? ''
        //         profilePicture = user.image ?? null
        //         firstName = user.name ?? ''
        //         lastName = ''
        //     } else return false

        //     // call API to database, to create new user if not exist, or link the account if exist, or not do anything at all, just return the user object and token
        //     const res = await fetch(`${apiUrl}/api/user/login/provider`, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             provider: providerUsed,
        //             provider_account_id: providerAccountID,
        //             email: emailReceived,
        //             first_name: firstName,
        //             last_name: lastName,
        //             avatar_url: profilePicture,
        //         }),
        //     })

        //     const response = await res.json()
        //     if (res.status == HttpStatusCode.OK_200) {
        //         const data = response.data
        //         if (!data.user.is_active) {
        //             return false
        //         }

        //         // dbUser and token are temporary fields to store the data on the main user object, since I cannot completely modify the user object for oauth providers
        //         ;(user as any).dbUser = { user: data.user }
        //         ;(user as any).token = { token: data.token }
        //         return true
        //     } else return false
        // },

        // token is nextAuth jwt token, user is the returned data from function 'authorize'
        // FYI: every time we use useSession or getServerSession, the token is passed to the function but the user won't be passed. the return data of this function is passed to function 'session'
        async jwt({ token, user, trigger, session }) {
            // if trigger is update, we return the updated session as token
            if (trigger == 'update') {
                return session
            }

            if (user && (user as any).token) {
                token = (user as any).token
                user = (user as any).user
            }

            // if token verification fail, it will throw an error

            if (typeof token != 'string') {
                user = token.user as unknown as User
                token = token.token as unknown as JWT
            }

            try {
                jwt.verify(
                    token as unknown as string,
                    process.env.NEXTAUTH_SECRET as string
                )
            } catch (err: any) {
                throw new Error(err.message)
            }

            return {
                token,
                user,
            }
        },

        async session({ token, session, user }) {
            session.user = token.user
            session.token = token.token

            return session
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: JwtTokenOptions.AccessTokenExpireTimeInMs,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        error: '/login?error=something-went-wrong',
    },
}
