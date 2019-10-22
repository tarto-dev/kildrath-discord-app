exports.run = async (client, message, args) => {
    if (!message.author.id === 116682911314345993)
        return;

    message.delete();

    client.guilds.map(guild => {
        const guildSet = client.settings.get(guild.id);
        if(guildSet.hasOwnProperty('annonces') && guildSet.annonces === "on") {
            let notif_chan = guild.channels.find(channel => channel.name === ("general" || "général" || "accueil" || "annonce" || "annonces"));
            notif_chan.send(""+args.join(' '))
        }
    });

    message.channel.send(`Message diffusé sur ${client.guilds.size} serveurs \n\n\n ${args.join(' ')}`);}