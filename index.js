const Discord = require("discord.js");
const fs = require("fs");
const moment = require('moment');
const client = new Discord.Client({
  intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

const config = require('./config.json');
const token = config.token;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.prefix = config.prefix;



["handlers", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on("messageDelete", async (message) => {

  const channel = message.guild.channels.cache.get("937710555878281237")

  message.attachments.forEach(attachment => {
    const ImageLink = attachment.proxyURL;

    const embed = new Discord.MessageEmbed()
      .setDescription(`**Attachment Sent By: <@${message.author.id}>
Content Of The Message: ${message.content}
Deleted In: <#${message.channel.id}>**`)
      .setColor("f9d403")
      .setImage(ImageLink)
      .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`Time: ${message.createdAt.toLocaleString()}`, `https://cdn.discordapp.com/attachments/908667462881533982/946090300802215966/img__.png `) 

    const embed2 = new Discord.MessageEmbed()
      .setDescription(`**Attachment Sent By: <@${message.author.id}>
Content Of The Message: ${message.content}
Deleted In: <#${message.channel.id}>**`)
      .setColor("f9d403")
      .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`Time: ${message.createdAt.toLocaleString()}`)

    if (ImageLink.endsWith(".mov") || ImageLink.endsWith(".mp4")) {
      channel.send({
        embeds: [embed2],
        files: [
        `${ImageLink}`
        ]
      })
    } else {
      channel.send({
        embeds: [embed]
      })
    }
  });
})

client.login(token);
