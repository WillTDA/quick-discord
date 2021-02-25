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
const client = new Discord.Client();

const PREFIX = "!";

client.on("ready", () => {
    console.log("Bot is Online")
});

client.on("message", async message => {
    if(message.content.startsWith(`${PREFIX}ping`)) {
        quickDiscord.ping(client, message)
    }
    else if(message.content.startsWith(`${PREFIX}help`)) {
        quickDiscord.help(message, {
            "Basic Commands": ["ping", "help", "poll"],
            "Music Commands": ["play", "stop", "seek"],
            "Admin Commands": ["kick", "warn", "ban"]
        });
    }
    else if(message.content.startsWith(`${PREFIX}poll`)) {
        quickDiscord.poll(message, "Is this a Good Package?", 30000) //time is optional
    }
});

client.login("Discord Bot Token")
```

# Need Help? Join Our Discord Server!

https://discord.gg/P2g24jp