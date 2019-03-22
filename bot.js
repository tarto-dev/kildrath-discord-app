const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});

const defaultSettings = {
    bot_name: "Kildrath",
    prefix: "~",
    realm: "Hyjal",
    wlogId: "345414",
    faction: "horde"
};
client.defaultSettings = defaultSettings;

// Merge both default & custom configs
console.log(JSON.parse((JSON.stringify(client.defaultSettings) + JSON.stringify(client.config)).replace(/}{/g,",")))

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Attempting to load event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

const utils = require('./modules/utils.js');
client.utils = utils;

client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

client.login(config.token);