
const Souvenir = require("../models/souvenir");
const User = require("../models/user");

const express = require('express');
const body_parser = require('body-parser');
const passport = require('./auth').passport;
const STEP = 6;

const router = express.Router();

router.use(body_parser.urlencoded({ extended: true }));
router.use(body_parser.json());

function authenticate(req, res, next) {
    if (!req.user || typeof req.user === "undefined") {
        const jwtAuthMiddleware = passport.authenticate('jwt', { session: false });
        return jwtAuthMiddleware(req, res, next); 
    }
    next();
};

router.get("/me", authenticate, (req, res) => {
    res.send(req.user);
});

router.post("/user/insert_souvenir", authenticate, (req, res) => {
    Promise.all([
        User.getById(req.body.user_id),
        Souvenir.getById(req.body.souvenir_id)
    ])
    .then(([user, souvenir])=> {
        let favorite_souvenirs = user.favorite_souvenirs;
        let found = false;
        for(let i = 0; i < favorite_souvenirs.length; i++) {
            if (favorite_souvenirs[i]._id.toString() === souvenir._id.toString()) {
                found = true;
                break;
            }
        }
        if (!found) favorite_souvenirs.push(souvenir);

        return User.update(user._id, new User(user.name, user.password, favorite_souvenirs, user.role, user.ava_url));
    })
    .then(result => {
        res.json({ user: result});
    })
});

router.post("/user/remove_souvenir", authenticate, (req, res) => {
    Promise.all([
        User.getById(req.body.user_id),
        Souvenir.getById(req.body.souvenir_id)
    ])
    .then(([user, souvenir])=> {
        let favorite_souvenirs = user.favorite_souvenirs;
        for(let i = 0; i < favorite_souvenirs.length; i++) {
            if (favorite_souvenirs[i]._id.toString() === souvenir._id.toString()) {
                favorite_souvenirs.splice(i, 1);
                break;
            }
        }

        return User.update(user._id, new User(user.name, user.password, favorite_souvenirs, user.role, user.ava_url));
    })
    .then(result => {
        res.json({ user: result});
    })
})

// function create_response1(data, pageFromReq, str) {
    
// 	const start = (typeof pageFromReq !== 'undefined') ? (parseInt(pageFromReq) - 1) * step : 0;
// 	const finish = (start + step > data.length) ?  data.length : start + step;
// 	let array = [];
// 	const page = (typeof pageFromReq !== 'undefined') ? pageFromReq : 1;
// 	for (let i = start; i < finish ; i++) {
// 		array.push(data[i]);
// 	}
// 	return Object({page_name : "tasks", tasks : array, str : str, page : page, pages : Math.ceil(data.length / step)});
// };

function create_response(req, items) {
    let list = [];
    if (typeof req.query.text !== 'undefined' && req.query.text !== '') {
        for (let souvenir of items) {
            if (souvenir.name.toUpperCase().indexOf(req.query.text.toUpperCase()) > -1) list.push(souvenir);
        }
    } else {
        list = items;
    }
    const page = (typeof req.query.page !== 'undefined') ? parseInt(req.query.page) : 0;
    let start = page * STEP;
    start = start >= list.length ? 0 : start;
    const finish = (start + STEP > list.length) ?  list.length : start + STEP;
    
    let page_list = [];
	for (let i = start; i < finish ; i++) {
		page_list.push(list[i]);
    }

    return {souvenirs: page_list, max_page : Math.floor(list.length/STEP) + 1};
}

router.get('/souvenirs', /*authenticate,*/ (req, res) => {
    Souvenir.getAll()
	.then((items) => {
		res.send(create_response(req, items));
	})
	.catch(err => res.status(401).send(err.toString()));
});


module.exports = router;