const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    description: "gives the links to invite the bots",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
          ephemeral: false
        });
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
      .setLabel("Alex Music")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=898941398538158080&permissions=37088600&scope=bot%20applications.commands`),
      new MessageButton()
      .setLabel("Alex Music 2")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=955499830732546128&permissions=37088600&scope=bot%20applications.commands`),
      new MessageButton()
      .setLabel("Alex Music 3")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=955505051340775455&permissions=37088600&scope=bot%20applications.commands`),
      new MessageButton()
      .setLabel("Alex Staging")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=955509682972270602&permissions=37088600&scope=bot%20applications.commands`),
      new MessageButton()
      .setLabel("Support Server")
      .setStyle("LINK")
      .setURL(`https://discord.gg/pCj2UBbwST`),
        );
       
                const embed = new MessageEmbed()
                
               .setDescription(` [Click here](https://discord.gg/pCj2UBbwST) to join the support server!
               
               `)
                    .setColor(client.embedColor)
        await interaction.followUp({embeds: [embed], components: [row]})
    }
}
