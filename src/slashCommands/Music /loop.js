const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { convertHmsToMs } = require("../../utils/convert");

module.exports = {
    name: "loop",
    description: "Toggle looping",
    type: 1,
    options: [
        {
            name: "mode",
            description: "The loop mode",
            type: 3,
            required: true,
            choices: [
                {
                    name: "track",
                    value: "track"
                },
                {
                    name: "queue",
                    value: "queue"
                },
                {
                    name: "disabled",
                    value: "disabled"
                },
            ],
        },
    ],
        

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction ) => {
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
		
      const chosenString = interaction.options.getString("mode")
if(chosenString === 'track'){
    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
    let thing = new MessageEmbed()
    .setColor(interaction.client.embedColor)
    .setDescription(`${ok} Looping the track is now \`${trackRepeat}\``)
    return await interaction.followUp({embeds: [thing]});

}
if(chosenString === 'queue'){
    player.setQueueRepeat(!player.queueRepeat);
    const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
    let thing = new MessageEmbed()
    .setColor(interaction.client.embedColor)
    .setDescription(`${ok} Looping the queue is now \`${queueRepeat}\``)
    return await interaction.followUp({embeds: [thing]});

}
if(chosenString === 'disabled'){
    player.setQueueRepeat(false);
    player.setTrackRepeat(false);
    let thing = new MessageEmbed()
    .setColor(interaction.client.embedColor)
    .setDescription(`${ok} Disabled all looping options.`)
    return await interaction.followUp({embeds: [thing]});

}
       }
     };