const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db
const ms = require('parse-ms') // npm i parse-ms

module.exports = {
    name: 'daily', // You Can Keep Any Name
    description: 'Get Your Daily Reward!', // Optional
    category: "💰 currency",

    run: async (client, message, args) => {

        const user = message.member
        const timeout = 86400000  // 86400000 = 24 Hours
        const amount = Math.floor(Math.random() * 5000000) + 10000 
        const dailytime = db.fetch(`dailytime_${user.id}`) // Same As balance.js

        if(dailytime !== null && timeout - (Date.now() - dailytime) > 0) { 
            const timeleft = ms(timeout - (Date.now() - dailytime))

            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Daily Reward`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`You Already Claimed Daily Coins, Claim Again In **${timeleft.hours} Hours ${timeleft.minutes} Minutes ${timeleft.seconds} Seconds**
Default CoolDown Is **24 Hours(1 Day)**
            `)
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Daily Reward`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`You Claimed **${amount.toLocaleString()}$** As Daily Reward!`)
            message.channel.send(embed)
            db.add(`money_${user.id}`, amount) // Add Amount To User's Wallet
            db.set(`dailytime_${user.id}`, Date.now()) // Set Time When Command Was Used
        }
    }
}
