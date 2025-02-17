// https://next-auth.js.org/providers/credentials
import NextAuth from 'next-auth/next'
import { authOptions } from './options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
