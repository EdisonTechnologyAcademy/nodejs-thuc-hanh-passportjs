import express from "express";
import path from "path";
import authRouter from "./routers/auth.router";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
const app = express();
const port = 8080;

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

// session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/auth', authRouter)

app.get( "/", ( req, res ) => {
    res.render('home')
} );

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
