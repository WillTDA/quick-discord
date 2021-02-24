const Discord = require("discord.js");
const paginate = require("discord.js-pagination")

module.exports = {

    /**
    * @param {Discord.Message} message The Message Sent by the User.
    * @param {Discord.Client} client The Discord Client.
    * @returns {Discord.Message}
    * @async
    * @example
    *  const quickDiscord = require("quick-discord");
    * 
    * client.on("message", async message => {
    *     if(message.content === "!ping") {
    *         quickDiscord.ping(client, message)
    *     }
    * });
       */

    async ping(client, message) {

        if (!client) return console.log("QuickDiscord Error: Client was not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")
        if (!message) return console.log("QuickDiscord Error: Message was not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")

        const msg = await message.channel.send("**Pinging Server... 🏓**");
        let pingMessage = await message.channel.send("**Pong! 🏓**")
        let updatedPingMessage = new Discord.MessageEmbed()
            .setTitle("Pong! 🏓")
            .addField('Bot/Client Latency', [
                `**❯ General Latency - ${Math.floor(pingMessage.createdAt - msg.createdAt - 100)}ms**`,
                `**❯ Discord API Latency - ${Math.round(client.ws.ping)}ms**`
            ])
            .setTimestamp(new Date())
            .setColor("RED")
        await pingMessage.delete()
        await message.channel.send(updatedPingMessage)
        await msg.delete()
    },

    /**
    * @param {Discord.Message} message The Message Sent by the User.
    * @param {JSON} commandData The Layout of the Help Menu.
    * @async
    * @returns {Discord.Message}
    * @example
    *  const quickDiscord = require("quick-discord");
    * 
    * client.on("message", async message => {
    *     if(message.content === "!help") {
    *         quickDiscord.help(message, {
    *             "Basic Commands": ["ping", "help", "poll", "weather", "trump"],
    *             "Music Commands": ["play", "stop", "seek", "pause", "resume", "loop"],
    *             "Admin Commands": ["kick", "warn", "ban", "reactionrole"]
    *         });
    *     }
    * });
    */

    async help(message, commandData) {

        if (!message) return console.log("QuickDiscord Error: Message was not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")
        if (!commandData) return console.log("QuickDiscord Error: Commands were not Provided or Not Provided Correctly. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")

        let commandCategories = JSON.stringify(commandData);
        commandCategories = JSON.parse(commandCategories);

        let embeds = [];
        for (let i in commandCategories) {

            let embed = new Discord.MessageEmbed()
                .setTitle(`${i} (${commandCategories[i].length} Total Commands)`)
                .setColor("RANDOM")
                .setDescription(commandCategories[i].map(command => `\`${command}\``).join(", "))
            embeds.push(embed);
        }

        if (embeds.length === 1) return message.channel.send(embeds[0])
        else paginate(message, embeds, ["⏪", "⏩"], 60000)
    }
}