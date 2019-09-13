exports.run = (client, message, args) => {
    const [nickname, realm = "hyjal", region = "eu", ...rest] = args;
    message.channel.send(`https://www.raidbots.com/simbot/quick?region=${region}&realm=${realm}&name=${nickname}`);
    message.react('👌');
}