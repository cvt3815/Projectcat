const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const config = require('./config.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const firebase = require('firebase');
const fb = {
	apiKey: process.env.FBKEY,
	databaseURL: 'seu firebase'
};
firebase.initializeApp(fb);
client.db = firebase.default.database();
['command', 'events'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
client.on('message', async message => {
	let prefix = await client.db
		.ref(`guild/${message.guild.id}/prefix`)
		.once('value');
	prefix = prefix.val();
	if (!prefix) prefix = config.default_prefix;
	let opan = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Olá acho que algem me chamou...')
		.setDescription(
			`O meu prefixo nesse servidor é ${prefix} use ${prefix}help para ver os meus comandos.\n<:cz7:754038892683853874> | [Me adicione no seu servidor.](https://discord.com/api/oauth2/authorize?client_id=${
				client.user.id
			}&permissions=8&scope=bot) \n<:Yummy:754451326846632056> | [Adicione minha irmã.](https://discord.com/oauth2/authorize?client_id=700054658277834752&permissions=8&scope=bot) \n<:Hugz:754451246076657684> | [Servidor do meu dono](https://discord.gg/sV5RZ77) \n<:BuffDoge:754451698126422139> | [Visite meu site](https://sitezinho.cvt3815.repl.co/)`
		);
		
	if (
		message.content.startsWith(`<@!${client.user.id}>`) ||
		message.content.startsWith(`<@${client.user.id}>`)
	) {
		await message.channel.send(opan);
		await message.react('761705366769369090');
	}
});

client.login(process.env.TOKEN);
