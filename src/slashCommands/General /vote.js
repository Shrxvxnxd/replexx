const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
    name: "vote",
    description: "support the bot and vote for it",
   
    run: async (client, interaction) => {

        await interaction.deferReply({
              ephemeral: false
          });  
          let ok = client.emoji.ok;
          let no = client.emoji.no;
          
          const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
        .setLabel("Vote")
        .setStyle("LINK")
        .setURL(`https://top.gg/bot/898941398538158080/vote`),
          );
      
              const mainPage = new MessageEmbed()
              .setDescription(`[Click here](https://top.gg/bot/898941398538158080/vote) to vote for Alex.`)
              .setColor(client.embedColor)
          return interaction.followUp({embeds: [mainPage], components: [row]})
   
  },
};
