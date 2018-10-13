exports.run = async (client, message, args) => {
    //message.delete();
    const [nickname, realm = "Hyjal", region = "EU", ...rest] = args;

    const embed = {
        "title": `Qui est ${nickname} :thinking:`,
        "color": 4886754,
        "fields": [
            {
                "name": "Armory",
                "value": `https://worldofwarcraft.com/fr-fr/character/${realm}/${nickname}`
            },
            {
                "name": "Wowanalyser",
                "value": `https://wowanalyzer.com/character/${region}/${realm}/${nickname}/`
            },
            {
                "name": "Raider.io",
                "value": `https://raider.io/characters/${region}/${realm}/${nickname}`
            }
        ]
    };

    message.channel.send({embed});
};

exports.help = {
    name: "ping",
    category: "Miscelaneous",
    description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
    usage: "ping"
};