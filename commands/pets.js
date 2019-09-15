exports.run = (client, message, args) => {

    if(args.length === 0) {
        return;
    }
    
    const [nickname, realm = "hyjal", region = "eu", ...rest] = args;
    //message.channel.send(`https://fr.wow-pets.com/character/${region}/${realm}/${nickname}`);
    message.channel.send(`Site en maintenance - alternative : https://magpie.wow-petguide.com`);
    message.react('👌');
}