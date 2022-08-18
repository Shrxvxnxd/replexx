const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "support",
  category: "general",
  description: "Gives the support server link.",
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {

    let ok = client.emoji.ok;
    let no = client.emoji.no;
   
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
  .setLabel("Support Server")
  .setStyle("LINK")
  .setURL(`https://discord.gg/pCj2UBbwST`),
    );

        const mainPage = new MessageEmbed()
        .setDescription(`[Click here](https://discord.gg/pCj2UBbwST) to join our support server.`)
        .setColor(client.embedColor)
message.channel.send({embeds : [mainPage], components : [row]})
    }
}