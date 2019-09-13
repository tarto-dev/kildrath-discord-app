exports.run = (client, message, args) => {
    const getJSON = require('get-json');
    
    const [region = "eu", ...rest] = args;

    getJSON(`https://raider.io/api/v1/mythic-plus/affixes?region=${region}&locale=fr`, (err, rsp) => {
        let affixes = rsp.affix_details;

        const embed = {
            "title": `Les affixes de la semaine`,
            "color": 9732809,
            "fields": [
                {
                    "name": affixes[0].name,
                    "value": affixes[0].description
                },
                {
                    "name": affixes[1].name,
                    "value": affixes[1].description
                },
                {
                    "name": affixes[2].name,
                    "value": affixes[2].description
                },
                {
                    "name": affixes[3].name,
                    "value": affixes[3].description
                },
            ]
        };

        message.channel.send({embed});
        message.react('👌');
    });
}