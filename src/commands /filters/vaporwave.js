const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
  name: "vaporwave",
  category: "filters",
  description: "Enables or disables the vaporwave filter.",
  args: false,
  usage: "",
  votelock:true,
  djonly : true,
  wl : true,
  execute: async (message, args, client, prefix) => {

   

   let ok = client.emoji.ok;
   let no = client.emoji.no;
     //
     const { channel } = message.member.voice;
     if (!channel) {
                     const noperms = new MessageEmbed()
 
          .setColor(client.embedColor)
            .setDescription(`${no} You must be connected to a voice channel to use this command.`)
         return await message.channel.send({embeds: [noperms]});
     }
     if(message.member.voice.selfDeaf) {	
       let thing = new MessageEmbed()
        .setColor(client.embedColor)
      .setDescription(`${no} <@${message.member.id}> You cannot run this command while deafened.`)
        return await message.channel.send({embeds: [thing]});
      }
     const botchannel = message.guild.me.voice.channel;
     const player = client.manager.players.get(message.guild.id);
     if(!player || !botchannel || !player.queue.current) {
                     const noperms = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`${no} There is nothing playing in this server.`)
         return await message.channel.send({embeds: [noperms]});
     }
     if(player && channel.id !== player.voiceChannel) {
                                 const noperms = new MessageEmbed()
        .setColor(client.embedColor)
         .setDescription(`${no} You must be connected to the same voice channel as me.`)
         return await message.channel.send({embeds: [noperms]});
     }
         //
      if(!player.vaporwave === true){
          player.vaporwave = true;
                   const noperms = new MessageEmbed()
              .setColor(client.embedColor)
                   .setDescription(`${ok} Vaporwave has been \`enabled\`.- <@${message.member.id}>`)
                   const noperms1 = new MessageEmbed()
                   .setColor(client.embedColor)
                         .setDescription(`Applying the \`vaporwave\` Filter. (*It might take up to 5 seconds until you hear the Filter*)`)
    return await message.channel.send({embeds: [noperms1]}),
    message.channel.send({embeds: [noperms]}).then(responce => {
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
     if(player.vaporwave === true){
          player.vaporwave = false;
                  const noperms = new MessageEmbed()
             .setColor(client.embedColor)
                  .setDescription(`${ok} Vaporwave has been \`disabled\`.- <@${message.member.id}>`)
                  const noperms1 = new MessageEmbed()
                  .setColor(client.embedColor)
                        .setDescription(`Removing the \`vaporwave\` Filter. (*It might take up to 5 seconds to remove the filter.*)`)
                  
    return await message.channel.send({embeds: [noperms1]}),
    message.channel.send({embeds: [noperms]}).then(responce => {
      setTimeout(() => {
          try {
              responce.delete().catch(() => {
                  return
              })
          } catch(err) {
              return
          }
      },30000)
  });;
      }
      
   


  }
}
       
