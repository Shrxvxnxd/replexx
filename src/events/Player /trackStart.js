const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const db = require("quick.db")
module.exports = async (client, player, track, res) => {
    const channel = client.channels.cache.get(player.textChannel);
    const npdata = require('../../schema/npSchema')
    let nowplayingdata = await npdata.findOne({
        guildID: player.guild,
    })
    

    if(nowplayingdata) return;
    // this is basically a event when the somg is started
    const reqpdata = require('../../schema/requesterSchema')
    let reqpdatas = await reqpdata.findOne({
        guildID: player.guild,
    })
    

    if(reqpdatas) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("SECONDARY")
         .setEmoji(`<:lofi_pause:992340214083239976>`)
            .setCustomId("prtrack"),
            new MessageButton()
        .setStyle("SECONDARY")
        .setEmoji(`<:lofi_skip:992340506514300998>`)
        .setCustomId("skiptrack"),
        new MessageButton()
        .setStyle("SECONDARY")
        .setEmoji(`<:lofiloop:993914807608684665>`)
        .setCustomId("looptrack"),
        new MessageButton()
        .setStyle("SECONDARY")
        .setEmoji(`<:lofiqueue:993914610778390528>`)
        .setCustomId("showqueue"),
        new MessageButton()
        .setStyle("SECONDARY")
        .setEmoji(`<:lofistop:993936766669181039>`)
        .setCustomId("stop"),
        );
  //const row2 = new MessageActionRow()
//.addComponents(
   // new MessageButton()
    //.setStyle("SECONDARY")
   // .setCustomId("rewind"),
//new MessageButton()
//.setStyle("SECONDARY")
//.setEmoji(`<:eeloop:987347298264690688>`)
//.setCustomId("looptrack"),
//new MessageButton()
//.setStyle('SECONDARY')
//.setEmoji(`<:eestop:987347924428161034>`)
//.setCustomId("stop"),
//new MessageButton()
//.setStyle("SECONDARY")
//.setEmoji(`<:eequeue:987355042233344090>`)
//.setCustomId("showqueue"),
//new MessageButton()
//.setStyle("SECONDARY")
//.setEmoji(`<:skip:975479526249345024>`)
//.setCustomId("forward"),
//);
        const song = player.queue.current
        const thing = new MessageEmbed()
        .setAuthor(`Now Playing`, client.user.displayAvatarURL())
       .setImage(`https://cdn.discordapp.com/attachments/970011800672284762/992346940274651166/Untitled_Photo.jpg`)
        .setDescription(`[${track.title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ)  [${!song.isStream ? `${new Date(song.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}]`)
            .setColor(client.embedColor)
        return channel.send({embeds: [thing],
             components: [row]}).then(msg => {
            
            if (player.get(`playingsongmsg`) && msg.id !== player.get(`playingsongmsg`).id) {
              player.get(`playingsongmsg`).delete().catch(e => { }) 
            }
            player.set(`playingsongmsg`, msg)
          
        })

}else{
//

         
const row = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setStyle("SECONDARY")
 .setEmoji(`<:lofi_pause:992340214083239976>`)
    .setCustomId("prtrack"),
    new MessageButton()
.setStyle("SECONDARY")
.setEmoji(`<:lofi_skip:992340506514300998>`)
.setCustomId("skiptrack"),
new MessageButton()
.setStyle("SECONDARY")
.setEmoji(`<:lofiloop:993914807608684665>`)
.setCustomId("looptrack"),
new MessageButton()
.setStyle("SECONDARY")
.setEmoji(`<:lofiqueue:993914610778390528>`)
.setCustomId("showqueue"),
new MessageButton()
.setStyle("SECONDARY")
.setEmoji(`<:lofistop:993936766669181039>`)
.setCustomId("stop"),
);
//const row2 = new MessageActionRow()
//.addComponents(
   // new MessageButton()
    //.setStyle("SECONDARY")
   // .setCustomId("rewind"),
//new MessageButton()
//.setStyle("SECONDARY")
//.setEmoji(`<:eeloop:987347298264690688>`)
//.setCustomId("looptrack"),
//new MessageButton()
//.setStyle('SECONDARY')
//.setEmoji(`<:eestop:987347924428161034>`)
//.setCustomId("stop"),
//new MessageButton()
//.setStyle("SECONDARY")
//.setEmoji(`<:eequeue:987355042233344090>`)
//.setCustomId("showqueue"),
//new MessageButton()
//.setStyle("SECONDARY")
//.setEmoji(`<:skip:975479526249345024>`)
//.setCustomId("forward"),
//);
const song = player.queue.current
    const thing = new MessageEmbed()
  .setAuthor(`Now Playing`, client.user.displayAvatarURL())
    .setImage(`https://cdn.discordapp.com/attachments/970011800672284762/992346940274651166/Untitled_Photo.jpg`)
    .setDescription(`[${track.title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ)  [${!song.isStream ? `${new Date(song.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}]`)
        .setColor(client.embedColor)
    return channel.send({embeds: [thing],
         components: [row]}).then(msg => {
            
            if (player.get(`playingsongmsg`) && msg.id !== player.get(`playingsongmsg`).id) {
              player.get(`playingsongmsg`).delete().catch(e => { }) 
            }
            player.set(`playingsongmsg`, msg)
          
        })
    
    
}
}
