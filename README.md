# QuickDiscord

Create Commands for your Discord Bot with Ease with just a few Lines of Code.

# Install Package

Let's install this package into your Discord Bot Project.

`npm i quick-discord --save`

# Example Code

```
const Discord = require("discord.js");
const quickDiscord = require("quick-discord");
const client = new Discord.Client()

client.on("ready", () => {
    console.log("Bot is Online")
})

client.on("message", async message => {
    if (message.content === "ping") {
        await quickDiscord.ping(client, message)
    }

    else if(message.content === "!help") {
        await quickDiscord.help(message, [
            { name: "Basic Commands", content: ["ping", "help", "poll"] },
            { name: "Music Commands", content: ["play", "stop", "seek"] },
            { name: "Admin Commands", content: ["kick", "warn", "ban"] },
        ]);
        }
    });

bot.login("Discord Bot Token")
```

# Need Help? Join Our Discord Server!

https://discord.gg/P2g24jp