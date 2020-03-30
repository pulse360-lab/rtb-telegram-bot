var menu = (language) =>{ 
    return {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [[{
        text: language.myLocation,
            request_location: true
        }], [language.cancel]]
    }
}
};

module.exports =  { menu } ;