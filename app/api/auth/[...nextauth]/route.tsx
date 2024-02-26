import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0'

const handler = NextAuth({
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            // console.log("Session User", token)
            session.teste = "ABC"
            session.user.id = token.sub
            return session
        },
    },
    // async signIn({ profile }) {
    //     console.log("Sign In")
    //     console.log(profile)
    // }
})

export {handler as GET, handler as POST}