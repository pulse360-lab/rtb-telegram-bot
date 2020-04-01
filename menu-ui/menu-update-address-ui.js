var menu = (language) =>{
    return {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "inline_keyboard":  [
                            [{text: language.yes, callback_data: '/start'}], 
                            [{text: language.no, callback_data: '/getStopsNearMe|{"param":{"askUpdateLocate" : false}}'}],
                            [{text: language.backToTheMenu, callback_data: '/backMainMenu'}]]
                    
        }
    }
};

module.exports = { menu };