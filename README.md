⚠ This Package is Still in Development! (Find any bugs? Join Our Discord Server, link is at the bottom of this page!)

# QuickDiscord

Create Commands for your Discord Bot with Ease with just a few Lines of Code.

# Install Package

Let's take a look at how you can install this package into your Discord Bot Project.

`npm i quick-discord --save`

# Example Code

```js
const Discord = require("discord.js");
const quickDiscord = require("quick-discord");
const client = new Discord.Client()

client.on("ready", () => {
    console.log("Bot is Online")
})

client.on("message", async message => {
    if (message.content === "!ping") {
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

client.login("Discord Bot Token")
```

# Need Help? Join Our Discord Server!

https://discord.gg/P2g24jp