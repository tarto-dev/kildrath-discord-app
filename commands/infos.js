exports.run = (client, message, args) => {
    const getJSON = require('get-json');
    const _ = require('lodash');

    const [nickname, realm = "Hyjal", region = "eu", ...rest] = args;
    const apiFields = "raid_progression,mythic_plus_ranks,mythic_plus_best_runs,gear,mythic_plus_scores";

    getJSON(`https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${nickname}&fields=${apiFields}`, (err, rsp) => {
        if (typeof rsp == "undefined" || typeof rsp.raid_progression == "undefined") {
            message.channel.send("Nickname not found");
            return;
        }
        const raidOrders = [
            'the-eternal-palace',
            'crucible-of-storms',
            'battle-of-dazaralor',
            'uldir',
            'nyalotha-the-waking-city',
        ];

        const raidOrdersShort = {
            "the-eternal-palace": "EP",
            "crucible-of-storms": "CoS",
            "battle-of-dazaralor": "BoD",
            "uldir": "Uldir",
            "nyalotha-the-waking-city": "NYA"
        };

        let progress = rsp.raid_progression || [];
        let userProgress = [];
        _.forEach(raidOrders, (el) => {
            let nm = progress[el].normal_bosses_killed || 0,
                hm = progress[el].heroic_bosses_killed || 0,
                mm = progress[el].mythic_bosses_killed || 0;
            if ((nm + hm + mm) != 0) {
                userProgress.push(raidOrdersShort[el] + " - " + progress[el].summary);
            }
        });

        const userProgressOutput = userProgress[userProgress.length > 1 ? userProgress.length - 1 : "NA"];

        const bestRuns = rsp.mythic_plus_best_runs;
        let bestRunOutput = [];

        if(bestRuns.length) {
            bestRunOutput[0] = `${bestRuns[0].short_name} ${bestRuns[0].mythic_level} ${_.repeat('*', bestRuns[0].num_keystone_upgrades)}`;
            bestRunOutput[1] = `${bestRuns[1].short_name} ${bestRuns[1].mythic_level} ${_.repeat('*', bestRuns[1].num_keystone_upgrades)}`;
            bestRunOutput[2] = `${bestRuns[2].short_name} ${bestRuns[2].mythic_level} ${_.repeat('*', bestRuns[2].num_keystone_upgrades)}`;
        } else {
            bestRunOutput[0] = "NA";
            bestRunOutput[1] = "NA";
            bestRunOutput[2] = "NA";
        }

        //`Tank ${rsp.mythic_plus_ranks.faction_class_tank.realm} - Healer ${rsp.mythic_plus_ranks.faction_class_healer.realm} - Dps ${rsp.mythic_plus_ranks.faction_class_dps.realm}`,
        const mranks = rsp.mythic_plus_ranks;
        let realmRankings = {
            'tank': mranks.faction_class_tank === undefined ? "NA" : mranks.faction_class_tank.realm,
            'healer': mranks.faction_class_healer === undefined ? "NA" : mranks.faction_class_healer.realm,
            'dps': mranks.faction_class_dps === undefined ? "NA" : mranks.faction_class_dps.realm,
        };
        let realmRankingsText = `Tank ${realmRankings.tank} - Healer ${realmRankings.healer} - DPS ${realmRankings.dps}`;

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

        let embed = {
            "embed": {
                "title": `${rsp.name}`,
                "image": {
                    "url": `${rsp.thumbnail_url}`
                },
                "description": `${rsp.race} - ${rsp.class} ${rsp.active_spec_name} (${rsp.active_spec_role})`,
                "url": `https://raider.io/characters/${region}/${realm}/${nickname}`,
                "color": classColor[rsp.class],
                "fields": [
                    {
                        "name": "Ilevel",
                        "value": `${rsp.gear.item_level_equipped}`,
                        "inline": true
                    },
                    {
                        "name": "R.IO",
                        "value": `${rsp.mythic_plus_scores.all}`,
                        "inline": true
                    },
                    {
                        "name": "Haut faits",
                        "value": `${rsp.achievement_points}`,
                        "inline": true
                    },
                    {
                        "name": "====================================",
                        "value": "BEST MYTHIC KEYSTONES"
                    },
                    {
                        "name": "# 1",
                        "value": `${bestRunOutput[0]}`,
                        "inline": true
                    },
                    {
                        "name": "# 2",
                        "value": `${bestRunOutput[1]}`,
                        "inline": true
                    },
                    {
                        "name": "# 3",
                        "value": `${bestRunOutput[2]}`,
                        "inline": true
                    },
                    {
                        "name": "====================================",
                        "value": "RAIDS"
                    },
                    {
                        "name": "Best progress",
                        "value": userProgressOutput,
                        "inline": true
                    },
                    {
                        "name": "Ranking (realm+faction based)",
                        "value": realmRankingsText,
                    },
                    {
                        "name": "====================================",
                        "value": "QUICK LINKS"
                    },
                    {
                        "name": ":shield: Armory",
                        "value": `[Open Armory](https://worldofwarcraft.com/fr-fr/character/${realm}/${nickname})`,
                        "inline": true
                    },
                    {
                        "name": ":gear: Raider.io",
                        "value": `[Open Raider.io](https://raider.io/characters/${region.toLowerCase()}/${realm.toLowerCase()}/${nickname})`,
                        "inline": true
                    },
                    {
                        "name": ":crossed_swords: Wipefest",
                        "value": `[Open Wipefest](https://www.wipefest.net/character/${nickname}/${realm}/${region})`,
                        "inline": true
                    },
                ]
            }
        };

        console.log(JSON.stringify(embed));
        message.channel.send(embed);
        message.react('👌');
    });
}