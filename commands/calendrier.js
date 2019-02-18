exports.run = (client, message, args) => {
    message.delete();
    message.channel.send(`Commande en cour de réparation :ok_hand:`);
    //message.channel.send(`Derniers runs de la guilde dispo sur https://www.warcraftlogs.com/guild/calendar/345414/`);
}