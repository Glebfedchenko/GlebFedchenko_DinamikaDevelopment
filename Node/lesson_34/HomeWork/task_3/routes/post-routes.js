const passwordHandler = require ('./../js/password_handler');

module.exports = function (app, pool) {

    app.post ('/registerUser', function (req, res) {

        let hashedPass = passwordHandler.encryptPassword (req.body.pass);

        let sql = 'INSERT INTO users (username, passwordHash) VALUES(?,?)';
        let values = [req.body.userName, hashedPass];

        pool.query (sql, values, function (err, result) {

            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    // console.log ('Duplicate entry ');
                    let obj = '{"status":2}';
                    res.status (200).send (obj);
                } else {
                    console.log ('err on post /registerUser= ', err);
                }
            } else {
                if (result && result.affectedRows > 0) {
                    res.setHeader ('Content-type', 'application/json');
                    let obj = '{"status":1}';
                    res.status (200).send (obj);
                }
            }
        });


    });

    app.post ('/userLogin', function (req, res) {


        if (req.session.username) {
            // console.log('User logged in. Session is active for user: ', req.session.username);
            res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
        } else {
            // console.log('Check passworkHash and start new session but user has not logged in yet');

            let query = passwordHandler.checkPassword (req.body.pass);
            let rows = [];

            query.on ('error', function () {
                res.status (500).send ('Some error during passwordHash check')
            });

            query.on ('result', function (row) {
                rows.push (row);
            });

            query.on ('end', function () {

                if (rows.length > 0 && rows[0].username === req.body.userName) {
                        req.session.username = rows[0].username;
                        res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
                } else {
                    res.status (200).send ('{"status":0}');
                }
            });

        }
    })

};
