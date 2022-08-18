const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "restart",
  category: "owner",
  description: "restarts the bot",
  owner: false,
  owneronly: true,
  execute: async (message, args, bot,client, prefix) => {

   
    

    const evalmods =["884070608181297172","651110672087908384","781882376790736937","690170684873375803","703949805457637471"];
    if(!evalmods.includes(message.member.id)) {
        const noperms = new MessageEmbed()
         .setColor('#2F3136')
         .setDescription(`** Hey, You cannot use this command.\n You must be my developer in order to use this command**`)
         return message.channel.send({embeds: [noperms]});
    
       }
      

       message.channel.send({content: "Restarting!"})
       setTimeout(() => {
         process.exit();
       }, 2000);
   }
 }

