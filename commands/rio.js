exports.run = (client, message, args) => {
    if(args.length === 0) {
        message.channel.send(`https://raider.io/guilds/eu/hyjal/Les%20twoll%20malins`);
        return;
    }

    const [nickname, realm = "hyjal", region = "eu", ...rest] = args;
    message.channel.send(`https://raider.io/characters/${region}/${realm}/${nickname}`);
    message.react('👌');
}