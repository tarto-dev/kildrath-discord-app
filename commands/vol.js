exports.run = (client, message, args) => {

    if(args.length === 0) {
        message.channel.send(`https://www.mamytwink.com/guides/vol-dans-bfa-suivez-votre-progression`);
        return;
    }

    const [nickname, realm = "hyjal", extension = "bfa", ...rest] = args;
    if(extension == "bfa") {
        message.channel.send(`https://www.mamytwink.com/guides/vol-dans-bfa-suivez-votre-progression#vol-${extension}-resultat-${realm}-${nickname}`);
    } else {
        message.channel.send(`https://www.mamytwink.com/guides/vol-legion-progression#vol-legion-resultat-${realm}-${nickname}`);
}