
const Ptero = require("nodeactyl");
const Client = Ptero.Application;
const { BingTranslator } = require("@horat1us/bing-translator");
const { get } = require("superagent");


Client.login("https://panel.busethost.xyz", "VYcWwerSwedZQYEaKFX2JQI9TTXQTMlDRzwvXnD7DunIABzj", (logged_in, err) => {
    console.log(logged_in);
});

const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", async () => {
    async function check() {
        const panelTotal = await Client.getAllServers();
        bot.channels.cache.get("739795460197187604").setName(`📝 Total Panel : ${panelTotal.length}`);
    }
    setInterval(check, 10 * 1000);
    console.log(`Logged in as : ${bot.user.username}`);

    const totalServers = await Client.getAllServers();
    setInterval(() => {
        bot.user.setActivity(`panel.busethost.xyz/auth/login | Buset Scraper`, { type: 'WATCHING' });
    }, 5000);
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let args = message.content.slice("p!".length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (cmd === "nodes") {
        let nodes = await Client.getAllNodes();
        let cons = "";
       for (let i = 0; i<nodes.length;i++) {
           const nds = nodes[i].attributes;
        cons += `**\`${i+1}.\` - ${nds.name}\nMemory: ${(nds.memory / 1000).toFixed(2)} GB\nDisk: ${(nds.disk / 1000).toFixed(2)} GB**\n\n`;
       }
        const e = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Nodes Buset")
        .setDescription(cons)
        .setTimestamp();
        message.channel.send(e);
    }
    
    if (cmd === "users") {
    let users = await Client.getAllUsers()
    users = users.filter(n => !["admin", "server"].includes(n.attributes.first_name.toLowerCase()));
    let cons = "";
        for (let i = 0; i < users.length; i++) {
            const y = users[i].attributes;
            cons += `**\`${i+1}.\` - ${y.first_name} ${y.last_name === y.first_name ? "" : y.last_name}**\n`;
        }
        const e = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Users Panel")
        .setDescription(cons)
        .setTimestamp();
        message.channel.send(e);
    }
    if (cmd === "servers") {
        let cons = "";
        const srv = await Client.getAllServers();
        for (let i = 0; i< srv.length; i++) {
            const h = srv[i].attributes;
            cons += `**\`${i+1}.\` - ${h.name}**\n`;
        }

        const e = new Discord.MessageEmbed()
        .setColor(0xcfa)
        .setTitle("Servers BusetHost")
        .setDescription(cons)
        .setTimestamp();
        message.channel.send(e);
    }
    if (cmd === "help") {
        const e = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Bot Panel Commands")
        .setDescription("Halo kamu, saya adalah bot panel yang memantau panel busethosting!!")
        .addField("📖 | Commands", `help, servers, users, nodes`)
        .setTimestamp();
        message.channel.send(e);
    }

    if (cmd === "expired") {
        let c = "";

        let srv = await Client.getAllServers();
       
         for (let i = 0; i < srv.length; i++) {
            const f = srv[i].attributes;
            const y = await Client.getUserInfo(f.user);

            c += `**\`${i+1}.\` - ${f.name} \`${f.description === "" ? "Unlimited" : f.description}\` by \`${y.username}\`**\n`;
        }
        const e = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Expired Panel")
        .setDescription(c)
        .setTimestamp();
        message.channel.send(e);
    }

    if (cmd === "talk") {
        const y = args[0];
        if (!y) return message.reply("LoL, input one word or over.");
        else {
            message.channel.startTyping();
            const translate1 = new BingTranslator({ source: "id", target: "en"});
            const translate2 = new BingTranslator({ source: 'en', target: "id"});

            const cara1 = await translate1.evaluate(y);
            translate1.release();

            const { body } = await get(`http://api.brainshop.ai/get?bid=116873&key=Mn4jJApGnIKWDqsH&uid=${message.author.id}&msg=${cara1}`);
            const cara2 = await translate2.evaluate(body.cnt);

            translate2.release();
            message.channel.send(cara2);
            message.channel.stopTyping();
        }
    }
});

bot.login("NDgyMDI2MDM3ODQ1Mjk1MTA0.W34nuw.K3VCIatYwJjFKohsmZ995kZWOOU");