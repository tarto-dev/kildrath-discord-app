module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    if (!message.guild) return;

    // Ensure we're using current guild's settings
    const guildConf = client.settings.ensure(message.guild.id, client.defaultSettings);

    // Merge both default & custom configs
    const _ = require('lodash');
    client.guildConf = guildConf;

    // Force `rcraftlogs.co` to prevent user messages catches
    if (message.content.indexOf('rcraftlogs.co') !== -1) {
        message.delete();
        const Url = require('url');
        const urlRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;
        let url = message.content.match(urlRegex);

        if (url === null) return;

        const logurl = Url.parse(url[0]);
        let reportId = logurl.path;

        if (reportId === null || reportId === '') return;

        const embed = {
            "title": `**Nouveaux logs**`,
            "color": 4886754,
            "fields": [
                {
                    "name": "Warcraftlogs",
                    "value": url[0]
                },
                {
                    "name": "Wowanalyser",
                    "value": "https://wowanalyzer.com/report/" + reportId.split('/')[2]
                },
                {
                    "name": "Wipefest",
                    "value": "https://www.wipefest.net/report/" + reportId.split('/')[2]
                }
            ]
        };

        message.reply({embed});
    }

    // Ignore messages not starting with the prefix (in config.json if not overrided by guild)
    if (message.content.indexOf(guildConf.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    const key = `${message.guild.id}-${message.author.id}`;
    client.authorKey = key;

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};
