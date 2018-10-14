module.exports = (client, message) => {
    // Ignore all bots

    if (message.content.indexOf('warcraftlogs.com') !== -1) {
        message.delete();
        const Url = require('url');
        const urlRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;
        let url = message.content.match(urlRegex);

        if (url === null) return;

        const logurl = Url.parse(url[0]);
        let reportId = logurl.path;

        if (reportId === null || reportId === '') return;

        const embed = {
            "title": `NOUVEAU LOG DISPONIBLE`,
            "color": 4886754,
            "fields": [
                {
                    "name": "Warcraftlogs",
                    "value": url[0]
                },
                {
                    "name": "Wowanalyser",
                    "value": "https://wowanalyzer.com/report/" + reportId.split('/')[2]
                }
            ]
        };

        message.channel.send({embed});
    }

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};