const getResource = (language) => {
    const messages = require(`./${language ? language : 'en_US'}.json`);
    return messages;
}

module.exports = { getResource };