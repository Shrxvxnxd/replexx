
const blacklist = require("../../schema/blacklistSchema.js")
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require("discord.js");
const db = require('../../schema/prefix.js');
const Owners = ["884070608181297172", "781882376790736937","703949805457637471", "651110672087908384","844843800874582048", "721677092449812520", "798871663704932402","722828967945568296","790554338770681867","789803145386655756","744881177629950033"];
const allperms = ["781882376790736937","651110672087908384","844843800874582048", "703949805457637471","798871663704932402","884070608181297172","789803145386655756","721677092449812520"]
module.exports = async (client, message) => {

  let no = client.emoji.no
  let ok = client.emoji.ok
let prefix;
let data = await db.findOne({ Guild: message.guild.id });
if (!data) { prefix = client.prefix; } else { prefix = data.Prefix; }
        message.guild.prefix = prefix;

  if (message.author.bot) return;
  if (!message.guild) return;
 
  const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(mention)) {
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()   
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=898941398538158080&permissions=37088600&redirect_uri=https%3A%2F%2Fdiscord.gg%2FpCj2UBbwST&response_type=code&scope=bot%20applications.commands%20identify`),
      new MessageButton()   
  .setLabel("Vote")
  .setStyle("LINK")
  .setURL(`https://top.gg/bot/898941398538158080/vote`),
  new MessageButton()   
  .setLabel("Premium")
  .setStyle("LINK")
  .setURL(`https://www.patreon.com/alexmusicbot/membership`),
  new MessageButton()   
  .setLabel("Support")
  .setStyle("LINK")
  .setURL(`https://discord.gg/pCj2UBbwST`),
    );
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Hey 👋 ${message.member.user.username} , I'm Alex Music\n\nMy prefix for this server is \`${prefix}\`do \`${prefix}help\` or \`/help\` for more info\n Want more help? Consider Joining [support server](https://discord.gg/pCj2UBbwST)\n\nDevelopers - \`SuDhi\` \`Sarkar\` \`Karthik\` \`Philip\` \`Shravan\` \`Aditya\`\n\n Thanks For Choosing Alex Music Bots Stay Safe Stay Awesome 💜`)
    .setThumbnail(`https://cdn.discordapp.com/icons/855371828130217984/a_219d3c73b38d54a222a4c75046164e8c.gif?size=1024`)

    message.channel.send({embeds : [embed],components:[row]})
  }
  const ress = await db.findOne({ Guild: message.guildId });
  if (ress && ress.Prefix) prefix = ress.Prefix;
  //danini tarvatha chudachu le c do remaining ok

  if (Owners.includes(message.member.id) &&
    !message.content.startsWith(prefix)) prefix = "";
  const escapeRegex = (prefix) => {
    return prefix.replace(/[.*+?^${}()|[\]\\]/, `\\$&`);
  };
  const mentionprefix = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})`
  );
  if (!mentionprefix.test(message.content)) return;
  const [, content] = message.content.match(mentionprefix);
  const args = message.content.slice(content.length).trim().split(/ +/);
  const commandName = args.length > 0 ? args.shift().toLowerCase() : null;


  const command = client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  const sudhi = "SuDhi";



  if (!command) return;


     // Profile command - Checking user in db if not found = Create new

  //Saving the created data in Database
 
 // deny access to members to not use owner commands

 //owner only
  if(command.owneronly){
  if(!allperms.includes(message.member.id))
return;
  }


//user premium // guild premium // hasVoted
 if(command.votelock){

const allpermsok = (allperms.includes(allperms))
const voteok = await client.topgg.hasVoted(message.member.id);
if(!voteok && !allpermsok){
  const row = new MessageActionRow()
                            .addComponents(
                              new MessageButton()   
                          .setLabel("Vote")
                          .setStyle("LINK")
                          .setURL(`https://top.gg/bot/898941398538158080/vote`),
                          new MessageButton()   
                          .setLabel("Premium")
                          .setStyle("LINK")
                          .setURL(`https://www.patreon.com/alexmusicbot/membership`),
                            );
                            const embed = new MessageEmbed()
                            .setColor(client.embedColor)
                            .setAuthor(`No Premium Subscription`,message.member.user.displayAvatarURL({ dynamic: true}))
                                 .setDescription(`You must [vote](https://top.gg/bot/898941398538158080/vote) me to use this command. If you want to disable this then [click here](https://www.patreon.com/alexmusicbot/membership) to buy premium and listen to 24/7 high quality without any restrictions.`)
                            return message.channel.send({embeds: [embed] , components: [row] });

        } 

       }
//blacklisted users
if (command.wl) {
  const nooo = await blacklist.findOne({
    UserID : message.member.id,
  })
if (nooo && !allperms.includes(message.member.id)) {
  //Blacklisted user
  const embed = new MessageEmbed()
  .setColor(client.embedColor)
  
       .setDescription(`${no} <@${message.member.id}> You are blacklisted from using the bot! \n ${ok} For appeals join [support server](https://discord.gg/pCj2UBbwST) and contact owners or staff members!`)
  return message.channel.send({embeds: [embed] }).then(responce => {
    setTimeout(() => {
        try {
            responce.delete().catch(() => {
                return
            })
        } catch(err) {
            return
        }
    }, 12000)
});;
}
  } 
  


//dj only
  if (command.djonly) {
  const djSchema = require('../../schema/djroleSchema')
  let djdata = await djSchema.findOne({
      guildID: message.guild.id,
  })
      if(djdata && !message.member.roles.cache.has(djdata.Roleid)) {

    const embed = new MessageEmbed()
         .setColor(client.embedColor)
        .setDescription(`${no} <@${message.member.id}> This command requires you to have ${djdata.Roleid}.`)
         return await message.channel.send({embeds: [embed]}).then(responce => {
           setTimeout(() => {
               try {
                   responce.delete().catch(() => {
                       return
                   })
               } catch(err) {
                   return
               }
           }, 12000)
       });;
   }
  }

//error 
  try {
    command.execute(message, args, client, prefix);
  } catch (error) {
    console.log(error);
    embed.setDescription("There was an error executing the command.\n My developers will sort out this issue. \n**Sorry For the inconvenience**");
    return message.channel.send({ embeds: [embed] });
  }
}





