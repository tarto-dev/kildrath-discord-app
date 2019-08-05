exports.run = (client, message, args) => {
    const getJSON = require('get-json');
    const _ = require('lodash');

    const [nickname, realm = "Hyjal", region = "eu", ...rest] = args;

    getJSON(`https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${nickname}&fields=raid_progression`, (err, rsp) => {
        if (typeof rsp.raid_progression == "undefined") {
            message.channel.send("Nickname not found");
            return;
        }

        let progress = rsp.raid_progression || [];

        let classColor = {
            "Warrior": 12884332, //c79c6e
            "Warlock": 9732809, // 9482c9
            "Shaman": 28894, // 0070de
            "Rogue": 16774505, // fff569
            "Priest": 16777215, // fff
            "Paladin": 16092346, // f58cba
            "Monk": 65430, // 00ff96
            "Mage": 6933744, // 69ccf0
            "Hunter": 11261043, // abd473
            "Druid": 16743690 // ff7d0a
        };
        let fields = [];
        _.forEach(progress, (el, name) => {
            fields.push({
                "name": name.replace(/-/g, ' ').toUpperCase() + " - " + el.summary,
                "value": "NM : " + el.normal_bosses_killed + " - HM : " + el.heroic_bosses_killed + " - MM : " + el.mythic_bosses_killed
            });
        })

        const embed = {
            "title": `Raid progress for ${rsp.name} - ${rsp.class} <${rsp.active_spec_name}> (${rsp.active_spec_role})`,
            "color": classColor[rsp.class],
            "fields": fields
        };

        message.channel.send({embed});
    });
}