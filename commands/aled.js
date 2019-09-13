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
                "name": "simc `Pseudo` `Royaume, défaut Hyjal` `Région, défaut EU`",
                "value": `Effectue une simulation de DPS pour le personnage indiqué.       _ex: ${client.config.prefix}simc Lachance_`
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
                "name": "best `Pseudo` `Royaume, défaut Hyjal` `Région, défaut EU`",
                "value": `Indique les 3 meilleurs try du joueur`
            },
            {
                "name": "last `Pseudo` `Royaume, défaut Hyjal` `Région, défaut EU`",
                "value": `Indique les 3 derniers try du joueur`
            },
            {
                "name": "vol `Pseudo` `Royaume, Hyjal par défaut` `Extension (bfa ou legion) défaut BFA`",
                "value": `Donne l'état d'avancement du personnage pour débloquer le vol de l'extension`
            },
            {
                "name": "progress `Pseudo` `Royaume, défaut Hyjal` `Région, défaut EU`",
                "value": `Indique le progress en raid du joueur **`
            },
            {
                "name": "invite",
                "value": "Permet d'inviter Kildrath chez vous !"
            },
            {
                "name": "**",
                "value": "Utilise la base de données Raider.io"
            }
        ]
    };

    message.channel.send({embed});
    message.react('👌');
}