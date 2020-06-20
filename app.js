const Discord = require("discord.js");
const bot = new Discord.Client();

const token = process.env.TOKEN;

var PREFIX = ",";

bot.on("ready", () => {
    console.log("The bot is online!");
    client.user.setPresence({
        status: "online",
        game: {
            name: 'Playing ",help"', 
            type: "STREAMING"
        }
    });
})

bot.on("message", message => {
    let user = message.mentions.members.first()
    if (message.author.id == "159985870458322944") {
        let msg = message.content;
        try {
            let level = msg.split(" level ")[1].split("!")[0],
                user = message.mentions.members.first();
            console.log([level, user])
            if (level == 30) {
                let role = message.guild.roles.cache.find(role => role.name === 'Ultimate Member');
                message.author.roles.add(role);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    let args = message.content.replace(PREFIX, "").split(" ")

    switch (args[0]) {
        case "help":
            message.channel.send("**Prefix**: `,`\n**Commands**:\n*help* - this command")
            break;
        case "verify":
            try {
                let role = message.guild.roles.cache.find(role => role.name === 'Member');
                message.guild.members.cache.get(message.author.id).roles.add(role);
                message.delete();
            } catch (err) {
                console.log(err);
            }
            break;
    }
})

bot.login(token);