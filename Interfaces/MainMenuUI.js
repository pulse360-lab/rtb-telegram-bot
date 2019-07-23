var menu = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "inline_keyboard":  [[{text: 'Search By Stop Number', callback_data: 'searchByStopNumber'}],
                            [{text: 'Search By Address', callback_data: 'searchByAddress'}],
                            [{text: 'Search By Route', callback_data: 'delete'}],
                            [{text: 'Stops Near me', callback_data: 'delete'}]]
                       
    }
};

module.exports = { menu };