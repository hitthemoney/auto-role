const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/*', (req, res) => res.redirect(301, "https://discord.com/api/oauth2/authorize?client_id=686755243148705831&permissions=8&scope=bot"))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const Discord = require("discord.js");
const bot = new Discord.Client();

var token = process.env.TOKEN;

var PREFIX = ",";

bot.on("ready", () => {
    console.log("The bot is online!");
})

bot.on("message", message => {
    function addRemoveRole(role, args, member) {
        try {
            if (args[1].toLowerCase() !== "remove") {
                member.roles.add(role);
                message.channel.send("You have been given the role **Giveaways**.")
            } else {
                member.roles.remove(role);
                message.channel.send("The Role **Giveaways** has been removed from you.")
            }
        } catch {
            member.roles.add(role);
            message.channel.send("You have been given the role **Giveaways**.")
        }
    }
    if (message.author.id == "159985870458322944") {
        let msg = message.content;
        try {
            let level = msg.split(" level ")[1].split("!")[0],
                user = message.mentions.members.first(),
                role = "";
            console.log([level, user])
            if (level >= 30) {
                role = message.guild.roles.cache.find(role => role.name === 'Ultimate Member');
                message.author.roles.add(role);
            } else if (level >= 5) {
                role = message.guild.roles.cache.find(role => role.name === 'Cool Member');
                message.author.roles.add(role);
            } else if (level >= 15) {
                role = message.guild.roles.cache.find(role => role.name === 'Active Member');
                message.author.roles.add(role);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    if (message.content.slice(PREFIX.length) == message.content.replace(PREFIX, "")) {
        let args = message.content.replace(PREFIX, "").split(" ")
        let member = message.guild.members.cache.get(message.author.id);
        var role;

        switch (args[0].toLowerCase()) {
            case "help":
                message.channel.send('**Prefix**: `,`\n**Commands**:\n*help* - this command\n*verify* - gives you the "Member" Role\n*giveaways* - gives you the "Giveaways" Role\n*ping* - gives you the "Ping" Role\n*updates* - gives you the "Updates" Role\n \nDo `,<updates, ping, or, giveaways> remove` if you want the role to be removed!')
                break;
            case "verify":
                try {
                    let user = message.guild.members.cache.get(message.author.id);
                    if (user.roles.cache.some(role => role.name == 'Member')) {
                        message.channel.send(`You are already already verified on the server! <@${message.author.id}>`)
                            .then(msg => {
                                setTimeout(() => {
                                    message.delete();
                                    msg.delete();
                                }, 5000);
                            })
                            .catch(console.error);
                    } else {
                        let role = message.guild.roles.cache.find(role => role.name == 'Member');
                        user.roles.add(role);
                        message.delete();
                    }
                } catch (err) {
                    console.log(err);
                }
                break;
            case "giveaways":
                role = message.guild.roles.cache.find(role => role.name == 'Giveaways');
                addRemoveRole(role, args, member)
                break;
            case "ping":
                role = message.guild.roles.cache.find(role => role.name == 'Ping');
                addRemoveRole(role, args, member)
                break;
            case "updates":
                role = message.guild.roles.cache.find(role => role.name == 'Updates');
                addRemoveRole(role, args, member)
                break;
        }
    }
})

bot.login(token);