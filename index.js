const Discord = require("discord.js");
const paginate = require("discord.js-pagination")

class QuickDiscord {

    /**
       * @param {Discord.Message} message The Message Sent by the User.
       * @param {Discord.Client} client The Discord Client.
       * @async
       */

    static async ping(client, message) {

        if (!client) throw new Error("QuickDiscord Error: Client was not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")
        if (!message) throw new Error("QuickDiscord Error: Message was not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")

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
        pingMessage.edit(updatedPingMessage)
        msg.delete({ timeout: 1 })
    }

    /**
    * @param {Discord.Message} message The Message Sent by the User.
    * @param {string[]} commands An Array of Command Names
    * @param {number} commandsPerPage [Optional] How many Commands to put on each Help Page.
    * @async
    */

    static async help(message, commands, commandsPerPage) {

        if (!message) throw new Error("QuickDiscord Error: Message was not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")
        if (!commands) throw new Error("QuickDiscord Error: List of Commands were not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")


        if (!commandsPerPage || commandsPerPage <= 0) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle(`All Available Commands (${commands.length} Total)`)
                    .setColor("RANDOM")
                    .setDescription(commands.map(command => `\`${command}\``).join(", "))
            )
        }

        if (!commands.length < commandsPerPage) throw new Error("QuickDiscord Error: commandsPerPage is more than the Amount of Commands. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")

        let embeds = [];
        let k = commandsPerPage
        for (let i = 0; i < commands.length; i += commandsPerPage) {
            let commandsCurrent = commands.slice(i, k);
            let j = i;
            k += commandsPerPage
            let commandInfo = commandsCurrent.map(command => `\`${command}\``).join(", ")
            let embed = new Discord.MessageEmbed()
                .setTitle(`All Available Commands (${commands.length} Total)`)
                .setColor("RANDOM")
                .setDescription(commandInfo)
            embeds.push(embed);
        }

        if (embeds.length === 1) return message.channel.send(embeds[0])
        else paginate(message, embeds, ["⏪", "⏩"], 60000)
    }
}

module.exports = QuickDiscord;