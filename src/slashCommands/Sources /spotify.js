const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const spotify = require("@ksolo/spotify-search");
const clientID = "6039fc87d0f04c268f91f14120f9c1c3";
const secretKey = "f0f4547f43b64f35beffce72c886e720";
spotify.setCredentials(clientID, secretKey);
module.exports = {
  name: "spotify",
  description: "plays some high quality music from spotify",
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  options: [
    {
      name: "query",
      description: "name.",
      required: true,
      type: "STRING"
		}
	],

  

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction,) => {
   await interaction.deferReply({
            ephemeral: false
        });
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
      const emojiaddsong = client.emoji.addsong;
      const emojiplaylist = client.emoji.playlist;

    if (!interaction.replied) await interaction.deferReply().catch(() => {});
    const query = interaction.options.getString("query");
    if (!query) return await interaction.editReply({ ephemeral: true, embeds: [new MessageEmbed().setColor(client.embedColor)                     
      .setDescription(`${no} Please provide a search input to search.`)]
      }).catch(() => {});
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

    let player = client.manager.get(interaction.guildId);
    if(player && channel.id !== player.voiceChannel) {
      const noperms = new MessageEmbed()
          .setColor('#2F3136')
.setDescription(`${no} You must be connected to the same voice channel as me.`)
return await interaction.followUp({embeds: [noperms]});
}

    if (!player) player = client.manager.create({
      guild: interaction.guildId,
      textChannel: interaction.channelId,
      voiceChannel: interaction.member.voice.channelId,
      selfDeafen: true,
    
    });
    
    spotify
    .search(query).then(async sres =>   {
      if(!sres)  return await interaction.editReply({
        content: `No results found, try to be specific as possible.`
      }).catch(() => {});
    const s = await player.search({
        query: sres.tracks.items[1].external_urls.spotify,
      }, interaction.user);
    if (s.loadType === "LOAD_FAILED") {
      if (player && !player.queue.current) player.destroy();
      return await interaction.editReply({
        content: `${no} Error while Loading track.`
      }).catch(() => {});
    } else if (s.loadType === "NO_MATCHES") {
      if (player && !player.queue.current) player.destroy();
      return await interaction.editReply({
        content: `${no} No results found, try to be specific as possible.`
      }).catch(() => {});
    } else if (s.loadType === "TRACK_LOADED") {
      if (player && player.state !== "CONNECTED") player.connect();
      if (player) player.queue.add(s.tracks[0]);
      if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
      return await interaction.editReply({
        embeds: [new MessageEmbed() .setColor(client.embedColor)
          .setDescription(`Queued [${s.tracks[0].title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ) [\`${track.requester.user.tag}\`]`)]
      }).catch(() => {});
    } else if (s.loadType === "PLAYLIST_LOADED") {
      if (player && player.state !== "CONNECTED") player.connect();
      if (player) player.queue.add(s.tracks);
      if (player && player.state === "CONNECTED" && !player.playing && !player.paused && player.queue.totalSize === s.tracks.length) player.play();

      return await interaction.editReply({
        embeds: [new MessageEmbed().setColor(client.embedColor)
        .setDescription(`Queued **${s.tracks.length}** tracks from **${s.playlist.name}**`)]
      }).catch(() => {})
    } else if (s.loadType === "SEARCH_RESULT") {
      if (player && player.state !== "CONNECTED") player.connect();
      if (player) player.queue.add(s.tracks[0]);
      if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) player.play();
      return await interaction.editReply({
        embeds: [new MessageEmbed().setColor(client.embedColor)
          .setDescription(`Queued [${s.tracks[0].title}](https://www.youtube.com/watch?v=dQw4w9WgXcQ) [\`${track.requester.user.tag}\`]`)]
      }).catch(() => {});
    } else return await interaction.editReply({
      content: `${no} No results found, try to be specific as possible.`
    }).catch(() => {});
  }
  )}
}