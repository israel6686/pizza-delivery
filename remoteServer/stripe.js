const request = require("request");

function charges(req, res) {
    const options = {
        method: "GET",
        url:  "https://api.stripe.com/v1/charges" ,
        timeout: 3000,
        headers:  {Authorization: "Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc"}
    };
    //Return new promise
    request(options, function(err, resp, data) {
        if (err ) {
            res.status(resp && resp.statusCode || 500).send(err);
        } else {
            res.status(resp.statusCode).send(data);
        }
    });
}

exports.charges = charges;