const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const begs = require("../../JSON/begs.json");
const donator = begs[Math.floor(Math.random() * Jbegdonators.length)];

module.exports = {
    name: "beg",
    description: "Beg someone for Money",
    category: "💰 currency",

    run: async (client, message, args) => {
        let user = message.author;
        let author = await db.fetch(`beg_${user.id}`)

        let timeout = 45000;

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));

            let timeEmbed = new MessageEmbed()
            .setTitle("Stop begging")
            .setDescription(`Mr. Beggar, you already begged recently, Try again in ${time.seconds}`)
            message.channel.send(timeEmbed)
        } else {
            let amount = Math.floor(Math.random() * 50000) + 10000
            let begEmbed = new MessageEmbed()
            .setTitle(`${donator}`)
            .setDescription(`Ayy Mr. Beggar, Take **${amount.toLocaleString()}$**`)
            message.channel.send(begEmbed)

            db.add(`beg_${user.id}`, 1500)
            db.add(`money_${user.id}`, amount)
            db.set(`beg_${user.id}`, Date.now())
       }
    }       
  }    
