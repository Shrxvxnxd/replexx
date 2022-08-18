const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  name: "partners",
  category: "general",
  description: "Shows the partnered servers.",
  owner: false,
  execute: async (message, args, client, prefix) => {

    let ok = client.emoji.ok;
    let no = client.emoji.no;
    const guild1 = await client.guilds.cache.get("855371828130217984");
    const alexmember = guild1.memberCount   ;
        alexservername = guild1.name;
     const  alexowner = await guild1.fetchOwner().then(m => m.user).catch(() => {})


            const embed = new MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/icons/855371828130217984/a_219d3c73b38d54a222a4c75046164e8c.gif?size=1024")
            .setAuthor(`Alex Music Partnered Server's`, client.user.displayAvatarURL())
           .setDescription(`\nServer Name :${alexservername} \nOwner :${alexowner}\nMember Count :${alexmember}\n Premium Status :Coming soon\nPartnered Date :18-06-2022
           
           `)
                .setColor(client.embedColor)
message.channel.send({embeds : [embed]})
    }

}