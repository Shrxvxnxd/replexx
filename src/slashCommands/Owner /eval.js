const { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageButton } = require("discord.js")
const { convertTime } = require('../../utils/convert.js');
const { inspect } = require('util')
const { post } = require("node-superfetch");
const { req } = require("petitio")
module.exports = {
  name: "eval",
  description: "eval somthing",
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  options: [
    {
      name: "code",
      description: "the code you whould like to eval",
      required: true,
      type: "STRING"
	  	}
	],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    const code = interaction.options.getString("code");
    await interaction.deferReply({
      ephemeral: false
    });
      
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    const evalmods = ["884070608181297172","781882376790736937","953322532566622228","690170684873375803","703949805457637471"];
    if(!evalmods.includes(interaction.member.id)) {
        const noperms = new MessageEmbed()
         .setColor('#2F3136')
         .setDescription(`You cannot run this command due to lack of permissions.\nRequired Permissions: \`Bot Owner\``)
         return interaction.editReply({embeds: [noperms]});
    
       }
   
       const player = client.manager.players.get(interaction.guild.id);
       try {
        const drow = new MessageActionRow()
        .addComponents(
    new MessageButton()
    .setLabel("Delete")
    .setStyle("DANGER")
    .setCustomId("evaldelete"),
        );
       
        if(code.toLowerCase().includes("token")){
            interaction.editReply({ content: `\`\`\`js\nT0K3N\`\`\``, components: [drow]})
          }
          else{
         const result = await eval(code)
         let output = result; 
         if(typeof output !== 'string') {
           output = inspect(result)
         }
         
         if (output.length > 3990) {
    
    const sourcebin = require("sourcebin_js");
      await  sourcebin
          .create([
            {
              title: "JavaScript code",
              description: 'This code was created in "' + interaction.createdAt + '"',
              name: "Made By " + 'developers',
              content: output,
              languageId: "JavaScript"
            }
          ])
          .then(src => {

          
         return interaction.editReply({ content: `\`\`\`js\n${src.url}\`\`\``, components: [drow]});
          })
          return;
           
        
          
        } 
    
           const adrow = new MessageActionRow()
           .addComponents(
       new MessageButton()
       .setLabel("Delete")
       .setStyle("DANGER")
       .setCustomId("evaldelete"),
           );
        return interaction.editReply({ content: `\`\`\`js\n${result}\`\`\``, components: [adrow]});
           
          }
       } catch (error) {
                 
            const deletea = new MessageActionRow()
            .addComponents(
        new MessageButton()
        .setLabel("Delete")
        .setStyle("DANGER")
        .setCustomId("evaldelete"),
            );
         return interaction.editReply({ content: `\`\`\`js\n${error}\`\`\``, components: [deletea]});
        }
    }

  };
