import passport from "passport";
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

let users = [
    {
        username: 'admin',
        password: '123456'
    },
    {
        username: 'user',
        password: '123456'
    }
]


passport.use(new LocalStrategy( (username, password, done) => {
    console.log(username)

    const user = users.filter(user => {
        return user.username == username && user.password == password
    });
    if (user.length === 0) {
        return done(null, false, { message: 'Incorrect username and password' });
    }

    return done(null, user)
}))

passport.serializeUser((user, cb) => {
    process.nextTick(function() {
        cb(null, user);
    });
});

passport.deserializeUser((user: any, cb) => {
    process.nextTick(function() {
        return cb(null, user);
    });
});

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: '37363328185-0qvbd0ikpharqtsfe1ckbf0secudd9op.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken: any, refreshToken: any, profile: any, cb: any) {
        let user = {
            username: profile.emails[0].value,
            password: Math.random().toString(),
        }
        users.push(user)
        cb(null, user)
    }
));

export default passport
