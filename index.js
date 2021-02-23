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
    * @param {...categoryData[]} commandCategories The Layout of the Help Menu.
    * @async
    * @example
    *  const quickDiscord = require("quick-discord");
    * 
    * client.on("message", async message => {
    *   if(message.content === "!help") {
    *       await quickDiscord.help(message, [
    *           { name: "Basic Commands", content: ["ping", "help", "poll"] },
    *           { name: "Music Commands", content: ["play", "stop", "seek"] },
    *           { name: "Admin Commands", content: ["kick", "warn", "ban"] },
    *         ]);
    *     }
    * });
    */

    static async help(message, commandCategories) {

        if (!message) throw new Error("QuickDiscord Error: Message was not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")
        if (!commandCategories) throw new Error("QuickDiscord Error: Commands were not Provided or Not Provided Correctly. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")

        let embeds = [];
        for (let i = 0; i < commandCategories.length; i++) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${commandCategories[i].name} (${commandCategories[i].content.length} Total Commands)`)
                .setColor("RANDOM")
                .setDescription(commandCategories[i].content.map(command => `\`${command}\``).join(", "))
            embeds.push(embed);
        }

        if (embeds.length === 1) return message.channel.send(embeds[0])
        else paginate(message, embeds, ["⏪", "⏩"], 60000)
    }
}

module.exports = QuickDiscord;