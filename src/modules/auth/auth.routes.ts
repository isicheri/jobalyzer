import { Router,Request,Response,NextFunction } from "express";
import passport from "passport";
import prismaClient from "../../utils/prismaClient/prisma.clent";
import GithubStrategy from "passport-github";
const authRouter = Router();

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: "/auth/github/callback",
    scope: ["user","repo"] 
},async (accessToken,refreshToken,profile,done) => {
    try {
        const {id,username,photos,emails} = profile;
    const email = emails?.[0]?.value ?? null;
    const avatarUrl = photos?.[0]?.value ?? null;

    const user = await prismaClient.user.upsert({
        where: {githubId: id},
        update: {
          username,
          email,
          avatarUrl,
          accessToken,
        },
         create: {
          githubId: id,
          username: username as string,
          email,
          avatarUrl,
          accessToken,
        },
    })
    done(null,user)
    } catch (error) {
        done(error,false)
    }
}))

passport.serializeUser((user,done) => {
    return done(null,user)
})

passport.deserializeUser((user:any,done) => {
    return done(null,user)
})

authRouter.get("/github",passport.authenticate("github"))
authRouter.get("/github/callback",
    passport.authenticate("github",{ failureRedirect: "/",
        session: false
    }),
    (req,res)=> {
        //redirect the user
    }
)
authRouter.post("/logout",(req:Request,res:Response,next:NextFunction) => {
    req.logout((err) => {
        if(err) next(err);
        res.redirect("/");
    })
})

export default authRouter