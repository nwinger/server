const User = require('../models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // See if a user with the given email exists
    User.findOne({ email: email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        // if a user with email does exist, retun an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        // if a user with email does not exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save((err) => {
            if (err) {
                return next(err);
            }

            // Respond to request indicating the user was created
            res.json({ success: true });
        });


    });
}