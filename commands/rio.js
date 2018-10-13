exports.run = (client, message, args) => {
    if(args.length === 0) {
        message.channel.send(`https://raider.io/guilds/eu/hyjal/Donjons%20et%20Darons`);
        return;
    }

    const [nickname, realm = "hyjal", region = "eu", ...rest] = args;
    message.channel.send(`https://raider.io/characters/${region}/${realm}/${nickname}`)
}