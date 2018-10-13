exports.run = (client, message, args) => {

    if(args.length === 0) {
        message.channel.send(`http://eu.battle.net/wow/guild/hyjal/Donjons%20et%20Darons/`);
        return;
    }

    const [nickname, realm = "hyjal", ...rest] = args;
    message.channel.send(`https://worldofwarcraft.com/fr-fr/character/${realm}/${nickname}`);
}