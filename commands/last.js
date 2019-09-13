exports.run = (client, message, args) => {
    const getJSON = require('get-json');
    const moment = require('moment');

    const [nickname, realm = "Hyjal", region = "eu", ...rest] = args;

    getJSON(`https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${nickname}&fields=mythic_plus_recent_runs`, (err, rsp) => {
        if (typeof rsp.mythic_plus_recent_runs == "undefined") {
            message.channel.send("Nickname not found");
            return;
        }

        let runs = rsp.mythic_plus_recent_runs;

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


        let dateFirst = new Date(runs[0].completed_at);
        let dateFirstMoment = moment(dateFirst);

        let dateSecond = new Date(runs[1].completed_at);
        let dateSecondMoment = moment(dateSecond);

        let dateThird = new Date(runs[2].completed_at);
        let dateThirdMoment = moment(dateThird);


        const embed = {
            "title": `Top 3 latests runs for ${rsp.name} - ${rsp.class} <${rsp.active_spec_name}> (${rsp.active_spec_role})`,
            "color": classColor[rsp.class],
            "fields": [
                {
                    "name": runs[0].dungeon + ' <' + runs[0].mythic_level + '>',
                    "value": dateFirstMoment.format("DD/MM/YYYY") + " (" + runs[0].score + " points)"
                },
                {
                    "name": runs[1].dungeon + ' <' + runs[1].mythic_level + '>',
                    "value": dateSecondMoment.format("DD/MM/YYYY") + " (" + runs[1].score + " points)"
                },
                {
                    "name": runs[2].dungeon + ' <' + runs[2].mythic_level + '>',
                    "value": dateThirdMoment.format("DD/MM/YYYY") + " (" + runs[2].score + " points)"
                }
            ]
        };

        message.channel.send({embed});
        message.react('👌');
    });
}