const callbackPattern = require('../helper/callback-pattern');

var menu = (msgId, param) => {
    return {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "inline_keyboard":  [
                            [{text: '<< Back to the Main Menu', 
                                  callback_data: callbackPattern.set('/backMainMenu', msgId, param)
                            }]
                        ]
    }
};
}

module.exports = { menu };