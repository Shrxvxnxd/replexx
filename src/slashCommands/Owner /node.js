const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "node",
    description: "returns the node status",

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
    
        const evalmods = ["884070608181297172","781882376790736937","953322532566622228","690170684873375803","703949805457637471"];
        if(!evalmods.includes(interaction.member.id)) {
            const noperms = new MessageEmbed()
             .setColor('#2F3136')
             .setDescription(`${no} You cannot run this command due to lack of permissions.\nRequired Permissions: \`Bot Owner\``)
             return interaction.editReply({embeds: [noperms]});
        
           }
       
           let all = [];
           client.manager.nodes.map(node =>  {
               let info = [];
               info.push('\nNode-Info');
               info.push(`Node       :: KarthikOnTop Connected`);
               info.push(`Node Mem   :: ${Math.round(node.stats.memory.used / 1024 / 1024)}MB - ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`);
               info.push('Player-Info');
               info.push(`Player     :: ${node.stats.playingPlayers}/${node.stats.players}`);
               info.push(`Uptime     :: ${require('pretty-ms')(node.stats.uptime, { verbose: true, secondsDecimalDigits: 0 })}`);
               all.push(info.join('\n'));
           });
           const embed = new MessageEmbed() .setDescription(`\`\`\`nim\n${all.join('\n\n--------------------------------\n')}\`\`\``);
           interaction.editReply({embeds: [embed]})
}
}