var menu = (language) => {
    return {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "inline_keyboard":  [[{text: language.searchByStopNumber, callback_data: '/searchByStopNumber'}],
                                [{text: language.stopsNearMe, callback_data: '/getStopsNearMe|{"param":{"askUpdateLocate" : true}}'}],
                                [{text: language.updateCurrentLocale, callback_data: '/start'}],
                                [{text: language.help, callback_data: '/help'}],
                                [{text: language.exit, callback_data: '/exit'}]]
                        
                }
        }
};

module.exports = { menu };