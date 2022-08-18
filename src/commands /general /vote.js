const { MessageEmbed, MessageActionRow, MessageButton, Message } = require("discord.js");


module.exports = {
  name: "vote",
  category: "general",
  description: "Gives the link to  vote the bot.",
  owner: false,
  wl : true,

  execute: async (message, args, client, prefix) => {

   
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
  .setLabel("Top.gg")
  .setStyle("LINK")
  .setURL(`https://top.gg/bot/898941398538158080/vote`),
  new MessageButton()
  .setLabel("DBL")
  .setStyle("LINK")
  .setURL(`https://discordbotlist.com/bots/alex-music/upvote`),
    );

        const mainPage = new MessageEmbed()
        .setDescription(`Help me by voting! You'll get access to premium commands for 12 hours if you vote me on [Top.gg](https://top.gg/bot/898941398538158080/vote)`)
        .setColor(client.embedColor)
message.channel.send({embeds : [mainPage], components : [row]})
    }
}