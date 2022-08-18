const { MessageEmbed, Message } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
	name: "grab",
    description: "grab a song to your dms",
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
            ephemeral: true
          });
            
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    

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

        const song = player.queue.current


        // Progress Bar
        var total = song.duration;
        var current = player.position;
        var size = 15;
        var line = '▬';
        var slider = '🔘';

        let embed = new MessageEmbed()
        .setDescription(`[${song.title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ) - [<@${song.requester.id}>]
            
        [${convertTime(current)} ${progressbar(total, current, size, line, slider)} ${convertTime(total)}]`)
            .setColor(client.embedColor)
            
            interaction.member.send({embeds: [embed]}).catch(e=>{
            return interaction.editReply({ content : `Couldn't send you a dm 
            
            Possible reasons:
          - Your Dm's are disabled
          - You have me blocked
          None of these helped? Join our [**Support Server**](https://discord.gg/pCj2UBbwST) for more help.`})
          })  
          return interaction.editReply({ content : "**📪 Check your DM's.**" })
       
         
            
    }
};