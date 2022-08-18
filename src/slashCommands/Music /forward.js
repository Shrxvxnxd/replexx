const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const ms = require('ms');
module.exports = {
    name: "forward",
    description: "Forwards a song in seconds.",
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    options: [
      {
        name: "time",
        description: "the time example 1m.",
        required: true,
        type: "STRING"
		}
	],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix ) => {
        await interaction.deferReply({
          ephemeral: false
        });
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
        const time = interaction.options.getString("time");
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
		
      const etime = require('ms')(time)
      if(!etime || isNaN(etime))  return await interaction.editReply({ embeds : [
        new MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`${no}Please specify a vaild time ex: \`1h\`.`)
    ]})
    let seektime = Number(player.position) + Number(etime) ;
    if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;
    player.seek(Number(seektime))
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${ok} Forwarded to \`${convertTime(player.position)}\``)
    return await interaction.editReply({ embeds: [thing] });
     
       }
     };