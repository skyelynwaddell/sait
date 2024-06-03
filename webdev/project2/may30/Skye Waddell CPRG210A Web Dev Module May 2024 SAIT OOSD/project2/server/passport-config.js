//Skye Waddell Node.JS | Day 8 - 13 CPNT-262
//May 2024

const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//login passport function
function init_passport(passport,getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);
            if (!user) {
                console.log("no user found")
                return done(null, false, { message: "No user with that email found." });
            }

            if (await bcrypt.compare(password, user.password)) {
                console.log("user logged in")
                return done(null, user);
            } else {
                console.log("password incorrect")
                return done(null, false, { message: "Password incorrect!" });
            }
        } catch (err) {
            console.log(err);
            return done(err);
        }
    }

    //logout function
    passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport.deserializeUser(async (email, done) => {
        try {
            const user = await getUserByEmail(email);
            done(null, user);
        } catch (err) {
            console.log(err);
            done(err, null);
        }
    });
}

module.exports = init_passport;
