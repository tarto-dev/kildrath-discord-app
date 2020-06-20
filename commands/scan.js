exports.run = async (client, message, args) => {
    const [nickname, realm = "hyjal", region = "eu", ...rest] = args;
    message.channel.send(`https://simplearmory.com/#/${region}/${realm}/${nickname}`);
    message.react('👌');
};