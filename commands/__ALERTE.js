exports.run = async (client, message, args) => {
    if (!message.author.id === 116682911314345993)
        return;

    message.delete();

    client.guilds.map(guild => {
        let channelID;
        let channels = guild.channels;
        channelLoop:
        for (let c of channels) {
            let channelType = c[1].type;
            if (channelType === "text") {
                channelID = c[0];
                break channelLoop;
            }
        }

    let channel = bot.channels.get(guild.systemChannelID || channelID);
    channel.send(""+args.join(' '));

    });

    message.channel.send(`Message diffusé sur ${client.guilds.size} serveurs \n\n\n ${args.join(' ')}`);}