import "dotenv/config";
import passport from "passport";
import { Strategy } from "passport-jwt";
import { authenticate } from "./server";

function cookieExtractor(req: any) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
}

let opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.jwt_signing_key,
};

passport.use(
  new Strategy(opts, async function (
    jwt_payload: { username: string; password: string },
    done: any
  ) {
    let result = await authenticate(jwt_payload.username, jwt_payload.password);
    if (!result) {
      return done(new Error("Failed to authenticate user from JWT"), false);
    } else {
      return done(null, result);
    }
  })
);

export default passport.authenticate("jwt", { session: false });
