const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "about",
    description: "shows about alex music",

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
      .setLabel("Support Server")
      .setStyle("LINK")
      .setURL(`https://discord.gg/pCj2UBbwST`),
      new MessageButton()
      .setLabel("Invite Me")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=37088600&scope=bot%20applications.commands`),
      new MessageButton()
      .setLabel("Vote")
      .setStyle("LINK")
      .setURL(`https://top.gg/bot/898941398538158080/vote`),
        );
               
        const embed = new MessageEmbed()
        .setAuthor("Alex Music")
        .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`Alex is the easiest way to play music in your Discord server. It supports Spotify, Soundcloud [and more!](https://top.gg/bot/898941398538158080/vote)

To get started, join a voice channel and  \`/play\` a song. You can use song names, video links, and playlist links.
          
**Why Alex?**
We provide you the best and updated features without any charges. We provide you 24/7 Mode, Volume control, audio effects and much more for [free](https://top.gg/bot/898941398538158080/vote).

**Commands**
For full list of commands Type /help\`

**Invite**
Alex Music can be added to as many server as you want! [Click here to add it to yours](https://discord.com/api/oauth2/authorize?client_id=898941398538158080&permissions=37088600&scope=bot%20applications.commands)

**Support**
[Click here](https://discord.gg/pCj2UBbwST) to talk to our support team if you're having any trouble or have any questions.`)
          
        
 
.setColor(client.embedColor)
        await interaction.followUp({embeds: [embed], components: [row]})
    }
}
