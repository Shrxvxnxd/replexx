const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "karaoke",
    category: "Filters",
    description: "Enables/disables the karaoke filter.",
    votelock: true,
    /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

   run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: true
    });
        
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
     //
     const djSchema = require('../../schema/djroleSchema')
     let djdata = await djSchema.findOne({
         guildID: interaction.guild.id,
     })
         if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {

       const embed = new MessageEmbed()
            .setColor('#2F3136')
         .setDescription(`${no} This command requires you to have <@&${djdata.Roleid}>.`)
            return await interaction.followUp({embeds: [embed], ephemeral: true});
      }
      
       //
       const { channel } = interaction.member.voice;
       if (!channel) {
                       const noperms = new MessageEmbed()
   
            .setColor('#2F3136')
              .setDescription(`${no} You must be connected to a voice channel to use this command.`)
           return await interaction.followUp({embeds: [noperms], ephemeral: true});
       }
       if(interaction.member.voice.selfDeaf) {	
         let thing = new MessageEmbed()
          .setColor('#2F3136')
        .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
          return await interaction.followUp({embeds: [thing], ephemeral: true});
        }
       const botchannel = interaction.guild.me.voice.channel;
       const player = client.manager.players.get(interaction.guild.id);
       if(!player || !botchannel || !player.queue.current) {
                       const noperms = new MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`${no} There is nothing playing in this server.`)
           return await interaction.followUp({embeds: [noperms], ephemeral: true});
       }
       if(player && channel.id !== player.voiceChannel) {
                                   const noperms = new MessageEmbed()
          .setColor('#2F3136')
           .setDescription(`${no} You must be connected to the same voice channel as me.`)
           return await interaction.followUp({embeds: [noperms], ephemeral: true});
       }
           //
        
        if(!player.karaoke === true){
            player.karaoke = true;
            const noperms = new MessageEmbed()
       .setColor(client.embedColor)
            .setDescription(`${ok} Karaoke has been \`enabled\`.\n by <@!${interaction.member.id}>`)
            const noperms1 = new MessageEmbed()
            .setColor(client.embedColor)
                  .setDescription(`${ok} Applying the \`Karaoke\` Filter (*It might take up to 5 seconds until you hear the Filter*)`)
      return await interaction.followUp({embeds: [noperms1]}),
      interaction.channel.send({embeds: [noperms]}).then(responce => {
        setTimeout(() => {
            try {
                responce.delete().catch(() => {
                    return
                })
            } catch(err) {
                return
            }
        }, 30000)
    });;
        }        if(player.karaoke === true){
            player.karaoke = false;
            const noperms = new MessageEmbed()
       .setColor(client.embedColor)
            .setDescription(`${ok} Karaoke has been \`disabled\`.\n by <@!${interaction.member.id}>`)
            const noperms1 = new MessageEmbed()
            .setColor(client.embedColor)
                  .setDescription(`${ok} Removing the \`Karaoke\` Filter(*It might take up to 5 to remove the filter*)`)
      return await interaction.followUp({embeds: [noperms1]}),
      interaction.channel.send({embeds: [noperms]}).then(responce => {
        setTimeout(() => {
            try {
                responce.delete().catch(() => {
                    return
                })
            } catch(err) {
                return
            }
        }, 30000)
    });;
        }
       
     


    }
  }

