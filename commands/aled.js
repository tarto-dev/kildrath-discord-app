exports.run = (client, message, args) => {
    message.delete();
    const embed = {
        "title": "**Aide**",
        "color": 16762368,
        "fields": [
            {
                "name": `Actuellement, le préfix est ${client.config.prefix}`,
                "value": "\u200b"
            },
            {
                "name": "scan `Pseudo` `Royaume, défaut Hyjal` `Région, défaut EU`",
                "value": `Scan la personne indiquée.       _ex: ${client.config.prefix}scan Lachance_`
            },
            {
                "name": "armory `Pseudo` `Royaume, défaut Hyjal`",
                "value": `Donne le lien Armory de la personne indiquée       _ex: ${client.config.prefix}armory Lachance_`
            },
            {
                "name": "rio `Pseudo` `Royaume, défaut Hyjal`",
                "value": `Donne le lien Raiderio de la personne indiquée        _ex: ${client.config.prefix}rio Lachance_`
            },
            {
                "name": "pets `Pseudo` `Royaume, défaut Hyjal`",
                "value": `Permet d'avoir la liste des pets (+ prix de vente) du compte        _ex: ${client.config.prefix}pets Lachance_`
            },
            {
                "name": "calendrier",
                "value": `Indique les derniers runs de la guilde      _ex: ${client.config.prefix}calendrier_`
            },
            {
                "name": "invite",
                "value": "Permet d'inviter Kildrath chez vous !"
            }
        ]
    };

    message.channel.send({embed});
}

exports.help = {
    name: "help",
    category: "Miscelaneous",
    description: "Permet d'obtenir de l'aide pour utiliser le bot",
    usage: "aled"
};