exports.run = (client, message, args) => {
    message.delete();
    message.author.sendMessage(`Tu peux ajouter Kildrath chez toi en cliquant sur https://discordapp.com/api/oauth2/authorize?client_id=500684708888444951&permissions=8&scope=bot :smirk:.`);
}

exports.help = {
    name: "ping",
    category: "Miscelaneous",
    description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
    usage: "ping"
};