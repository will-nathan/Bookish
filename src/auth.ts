import "dotenv/config";
import passport from "passport";
import { Strategy } from "passport-jwt";
import { authenticateUser } from "./server";

export function cookieExtractor(req: any) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
}

let opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.jwt_signing_key,
  passReqToCallback:true,
};

passport.use(
  new Strategy(opts, async function (req:any,
    jwt_payload: { username: string; password: string },
    done: any
  ) {
    let result = await authenticateUser(jwt_payload.username, jwt_payload.password);
    if (!result) {
      console.log('no result')
      return done(null, false);
    } else {
      console.log(jwt_payload.username)
      req.user=jwt_payload.username;
      return done(null, result);
    }
  })
);

export default passport.authenticate("jwt", { session: false });
