exports.run = (client, message, args) => {

    if(args.length === 0) {
        message.channel.send(`http://eu.battle.net/wow/fr/guild/hyjal/Les%20twoll%20malins/`);
        return;
    }

    const [nickname, realm = "hyjal", ...rest] = args;
    message.channel.send(`https://worldofwarcraft.com/fr-fr/character/${realm}/${nickname}`);
}