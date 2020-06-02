const express = require("express");
const consolidate = require('consolidate');
const path = require('path');
//const logger = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('./routes/auth').passport;
const session = require('express-session');

const connect_options = { useNewUrlParser: true };

const app = express();

app.engine('html', consolidate.ejs);
app.set('views', path.join(__dirname, 'views'));
app.set('javascript', path.join(__dirname, 'javascript'));
app.set('view engine', 'ejs');

//app.use(logger('tiny'));
app.use(express.static('public'));
app.use(body_parser.urlencoded({ extended: true}));
app.use(body_parser.json());

//app.use(cookie_parser());
app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

const config = require('./config');

const database_url = config.database_url;
const server_port = config.server_port;

app.get("/data/fs/:path", function(req, res) {
	res.sendFile(path.join(__dirname, `/data/fs/${req.params.path}`));
});

const auth_router = require('./routes/auth').router;
app.use("/auth", auth_router);

const api_router = require('./routes/api');
app.use("/api", api_router);

app.use(express.static('dist'));

mongoose.connect(database_url, connect_options)
	.then(() => console.log(`Database connected: ${database_url}`))
	.then(() => app.listen(server_port, () => console.log(`Server started: ${server_port}`)))
	.catch(err => console.log(err));