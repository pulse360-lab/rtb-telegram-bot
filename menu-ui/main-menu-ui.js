var menu = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "inline_keyboard":  [[{text: 'Search By Stop Number', callback_data: '/searchByStopNumber'}],
                                [{text: 'Stops Near me', callback_data: '/getStopsNearMe|{"param":{"askUpdateLocate" : true}}'}],
                                [{text: 'Update current address', callback_data: '/start'}],
                                [{text: 'Help', callback_data: '/help'}],
                                [{text: 'Exit', callback_data: '/exit'}]]
                        
        }
};

module.exports = { menu };