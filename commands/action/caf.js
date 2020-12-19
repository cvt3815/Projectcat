const Discord = require("discord.js")
const superagent = require('superagent');
module.exports = {
    name: 'caf',
    aliases: ['cafuné', 'cuddle', 'carinho'],
    run: async (client, message, args) => {
   const { body } = await superagent
     .get("https://nekos.life/api/pat");
   link = body.neko;

   let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
   return message.reply('lembre-se de mencionar um usuário válido para fazer um cafuné!');
   }
   
   let avatar = message.author.displayAvatarURL({format: 'png'}); 

   const embed = new Discord.MessageEmbed()
     .setColor("RED")
     .setTitle("um cafuné foi feito")
     .setDescription(`${message.author} acaba de fazer um cafuné em ${user}`)
     .setThumbnail(avatar)
     .setFooter('um cafunézinho')
     .setImage(body.url)
     .setAuthor(message.author.tag, avatar);
   message.channel.send({ embed })
 }
}
