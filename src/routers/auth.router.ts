import express, {Request, Response} from "express";
import passport from "../middlewares/passport";
const router = express.Router();

router.get("/login", (req: Request, res: Response) => {
    res.render("login");
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}));

router.get('/', (req: Request, res: Response) => {
    res.render('home')
})

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req: Request, res: Response) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

export default router;
