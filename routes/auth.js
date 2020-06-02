
const User = require("../models/user");
const Check = require("../models/check_auth");

const express = require('express');
const body_parser = require('body-parser');
const config = require('../config');

const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const BasicStrategy = require('passport-http').BasicStrategy;

const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const router = express.Router();

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.getById(id)
    .then(user =>  done(null, user))
    .catch(err => done(err));
});

passport.use(new LocalStrategy({ usernameField: "username", passwordField: 'password'}, (username, password, done) => {
    User.authorization(username, password)
    .then(result => done(null, result))
    .catch(err => done(err));
}));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.SecretSession
    },
    (jwtPayload, cb) => {
        if (!jwtPayload || !jwtPayload.id) return cb(new Error("Couldn't get id from tocken"), null);
        User.getById(jwtPayload.id)
        .then(user => {
            if (!user) return cb(null, false);
            cb(null, user);
        })
        .catch(err => {
            return cb(err, null);
        })
    }
));


router.post("/register", (req, res) => {
    let name = req.body.username;
    let password = req.body.password1;
    
    User.findUser(name)
        .then(result => {
            if (Object.keys(result).length !== 0) throw new Error("Error. Username already exists!")

            User.insert(new User(
                name,
                password,
                [],
                Check.Role.Utilizer,
                "http://www.haverhill-ps.org/wp-content/uploads/sites/12/2013/11/user.png"
            ));

            return res.status(200).send({
                message: `register successed`
            });
        })
        .catch(err => {
            return res.status(400).send({
                message: `Something is not right: ${err}`
            });
        });
});

router.post("/login", (req, res) => {
    passport.authenticate('local', { session: false }, (err, user) => {

        if (user === false) {
            return res.status(401).send({
                message: `Username or password doesn't match`
            });
        } else if (err || !user) {
            return res.status(400).send({
                message: `Something is not right: ${err}`
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) { return res.send(err); }
            // generate a signed json web token with the contents of user object
            const token = jwt.sign({id: user.id}, config.SecretSession);
            
            // cleanSensitiveUserInfo(user);
            return res.json({ user, token });
        }); 
    })(req, res);
});

module.exports = {
    router,
    passport
};