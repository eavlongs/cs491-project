import 'next-auth'
import { JwtToken, User } from './types'

// custom session object to add more object we want to access in useSession and getServerSession
declare module 'next-auth' {
    interface Session {
        token: JwtToken
        user: User
    }
}

// custom token in async jwt() type in /api/auth/[...nextauth]/route.ts
declare module 'next-auth/jwt' {
    interface JWT {
        token: JwtToken
        user: User
    }
}
