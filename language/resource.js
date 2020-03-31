const getResource = (language) => {
    const messages = require(`./${language ? language : 'en'}.json`);
    return messages;
}

module.exports = { getResource };