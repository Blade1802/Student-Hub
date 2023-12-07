const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { ACCESS_TOKEN_SECRET } = require("../constants");
const db = require("../db");

// Check for token in cookie
const cookieExtractor = function (req) {
  let token = null;

  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: ACCESS_TOKEN_SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await db.query(
        "SELECT user_id, user_email, user_name, user_type FROM users WHERE user_id = $1",
        [id]
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = { ...rows[0] };

      return done(null, user);
    } catch (err) {
      console.log(err.message);
      done(null, false);
    }
  })
);
