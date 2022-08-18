const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "pause",
    description: "Pause the currently playing music",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	
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
    
           //
     const djSchema = require('../../schema/djroleSchema')
     let djdata = await djSchema.findOne({
         guildID: interaction.guild.id,
     })
         if(djdata && !interaction.member.roles.cache.has(djdata.Roleid)) {

       const embed = new MessageEmbed()
    
            .setColor('#2F3136')
        .setDescription(`${no} This command requires you to have <@&${djdata.Roleid}>.`)
            return await interaction.followUp({embeds: [embed]});
      }
     //
    const { channel } = interaction.member.voice;
    if (!channel) {
                    const noperms = new MessageEmbed()
                   
         .setColor('#2F3136')
           .setDescription(`${no} You must be connected to a voice channel to use this command.`)
        return await interaction.followUp({embeds: [noperms]});
    }
    if(interaction.member.voice.selfDeaf) {	
      let thing = new MessageEmbed()
       .setColor('#2F3136')
 
     .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
       return await interaction.followUp({embeds: [thing]});
     }
    const botchannel = interaction.guild.me.voice.channel;
    const player = client.manager.players.get(interaction.guild.id);
    if(!player || !botchannel || !player.queue.current) {
                    const noperms = new MessageEmbed()
        
         .setColor('#2F3136')
         .setDescription(`${no} There is nothing playing in this server.`)
        return await interaction.followUp({embeds: [noperms]});
    }
    if(player && channel.id !== player.voiceChannel) {
                                const noperms = new MessageEmbed()
            .setColor('#2F3136')
        .setDescription(`${no} You must be connected to the same voice channel as me.`)
        return await interaction.followUp({embeds: [noperms]});
    }

        if (player.paused) {
            let thing = new MessageEmbed()
    
                  .setColor('#2F3136')
                .setDescription(`${no} The player is already paused.`)
                return interaction.editReply({embeds: [thing]});
        }

        player.pause(true);
    
        const song = player.queue.current;

        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${ok} **The player has been paused**`)
          return interaction.editReply({embeds: [thing]});
	
    }
};