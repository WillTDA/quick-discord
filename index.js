const Discord = require("discord.js");
const paginate = require("discord.js-pagination");
const prompter = require("discordjs-prompter");
const moment = require("moment");

module.exports = {

    /**
    * @param {Discord.Message} message The Message Sent by the User.
    * @param {Discord.Client} client The Discord Client.
    * @returns {Discord.Message} Discord.Message
    * @async
    * @example
    *  const quickDiscord = require("quick-discord");
    * 
    * const PREFIX = "!";
    * 
    * client.on("message", async message => {
    *     if(message.content.startsWith(`${PREFIX}ping`)) {
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
    * @param {Object} commandData The Layout of the Help Menu.
    * @async
    * @returns {Discord.Message} Discord.Message
    * @example
    *  const quickDiscord = require("quick-discord");
    * 
    * const PREFIX = "!";
    * 
    * client.on("message", async message => {
    *     if(message.content.startsWith(`${PREFIX}help`)) {
    *         quickDiscord.help(message, {
    *             "Basic Commands": ["ping", "help", "poll"],
    *             "Music Commands": ["play", "stop", "seek"],
    *             "Admin Commands": ["kick", "warn", "ban"]
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
    },

    /**
    * @param {Discord.Message} message The Message Sent by the User.
    * @param {string} pollTopic The Text to be Displayed on the Poll Embed.
    * @param {number} time [Optional] Amount of Time in Milliseconds before the Poll Ends.
    * @returns {Discord.Message} Discord.Message
    * @async
    * @example
    *  const quickDiscord = require("quick-discord");
    * 
    * const PREFIX = "!";
    * 
    * client.on("message", async message => {
    *     if(message.content.startsWith(`${PREFIX}poll`)) {
    *         quickDiscord.poll(message, pollTopic, time) //time is optional
    *     }
    * });
    */

    async poll(message, pollTopic, time) {
        if (!pollTopic) return console.log("QuickDiscord Error: Poll Topic was not Provided. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")

        if (!time) {
            let pollEmbed = new Discord.MessageEmbed()
                .setAuthor(`📋 New Poll! (Created by ${message.author.tag})`, message.author.displayAvatarURL())
                .addField("Poll Topic", pollTopic)
                .setColor("RANDOM")
            message.channel.send(pollEmbed).then(messageReaction => {
                messageReaction.react("✅");
                messageReaction.react("❌");
                message.delete();
            });
        }
        else {
            if (isNaN(time)) return console.log("QuickDiscord Error: Poll Time has to be a number, recieved string. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")
            if (time > 1728000000) console.log("QuickDiscord Error: Poll Time is Over the 20 Days Limit. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")
            if (time < 10000) console.log("QuickDiscord Error: Poll Time is Shorter than 10 Seconds. Need Help? Join Our Discord Server at 'https://discord.gg/P2g24jp'")

            let timedpollEmbed = new Discord.MessageEmbed()
                .setAuthor(`🗳️ New Timed Vote! (Created by ${message.author.tag})`, message.author.displayAvatarURL())
                .addField("Poll Topic", pollTopic)
                .addField("Poll Ending Time", `${moment().add(time).calendar()}`)
                .setColor("RANDOM")
            message.delete()

            prompter.vote(message.channel, {
                question: timedpollEmbed,
                choices: ['✅', '❌'],
                timeout: time,
                deleteMessage: true
            }).then(async (response) => {
                const voteWinner = response.emojis[0];
                let voteWinnerText = `${voteWinner.emoji} has Won with ${response.emojis[0].count} Votes! (${response.emojis[1].emoji} had ${response.emojis[1].count} Votes)`
                if (response.emojis[0].count == response.emojis[1].count) voteWinnerText = `This Timed Vote was a Draw! (Both Choices had ${response.emojis[0].count} Votes)`
                const voteFinished = new Discord.MessageEmbed()
                    .setAuthor(`🗳️ Timed Vote Ended! (Created by ${message.author.tag})`, message.author.displayAvatarURL())
                    .addField("Voting Topic", pollTopic)
                    .addField("Winning Vote", voteWinnerText)
                    .setColor("RANDOM")
                    .setFooter(`Vote Ended: ${moment(new Date).format('LLL')}`)
                await message.channel.send(voteFinished)
            });
        }
    }


}