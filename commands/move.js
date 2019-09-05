exports.run = (client, message, args) => {
    const _ = require('lodash');

    // Make sure the bot user has permissions to move members in the guild:
    if (!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return message.reply('Missing the required `Move Members` permission.');

    const role = message.mentions.roles.first();
    let membersWithRole = message.guild.roles.get(role.id).members;
    const voiceChannel = message.member.voiceChannel;

    let moved = 0;
    membersWithRole.forEach(member => {
        console.log(member);
        if (member.voiceChannel) {
            console.log(member);
            member.setVoiceChannel(voiceChannel);
            moved++;
        }
    });

    message.react('👌');
    message.channel.send(`J'ai bougé ${moved} glands avec ce role.`);
}