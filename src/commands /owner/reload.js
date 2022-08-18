module.exports = {
    name: "reload",
    category: "Owner",
    aliases: ["rd"],
    description: "Reload Command",
    owneronly: true,
    execute: async (message, args, client, prefix) => {
          
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
   

        if (!args.length) return message.channel.send(`mention command!`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`${process.cwd()}/src/commands/${command.category}/${command.name}.js`)];


        try {
            const newCommand = require(`${process.cwd()}/src/commands/${command.category}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send({ content: `Reloaded \`${args}\`` });
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    }
}