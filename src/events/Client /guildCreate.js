const { MessageEmbed, WebhookClient } = require('discord.js');
module.exports = async (client, guild) => {
    let url = 'https://discord.com/api/webhooks/987977347355541524/vt3YMGFeYuzM-y9HNEqbKVYfpfloS1wIXb9gAWiMFPt5yw7VUczUxluI4ccp827Ldy3M';
    const web = new WebhookClient({ url: url });
    if (!web) return;
    try {
      let servers = await client.cluster.fetchClientValues('guilds.cache.size');
      let totalServers = servers.reduce((prev, val) => prev + val);
   
        const owner = await guild.fetchOwner()
        const embed = new MessageEmbed()           
        .setTitle("📥")
       .setColor(client.embedColor)
        .addField("Server Name", guild.name, true)
        .addField("ID", guild.id, true)
        .addField("Owner", `Tag - \`${owner.user.tag}\`\nID - \`${owner.id}\``, true)
        .addField("Members", `\`${guild.memberCount}\` `, true)
        .setFooter(`Bot - ${client.user.username} TS - ${totalServers}`)
    web.send({embeds: [embed]})
  } catch (e) { }


 

}