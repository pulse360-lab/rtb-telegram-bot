var icons = require('../emoji');
var menu = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "inline_keyboard":  [[{text: `${icons.contries.usa} English`, callback_data: '/language|{"param":{"lang" : "en_US"}}'}],
                            [{text: `${icons.contries.brazil} Portuguese`, callback_data: '/language|{"param":{"lang" : "pt_BR"}}'}]]
                    
    }
};

module.exports = { menu };