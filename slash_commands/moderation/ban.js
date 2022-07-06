const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Позволяет администратору или владельцу заблокировать участника.")
    .addUserOption((option) => option.setName('user').setDescription('Человека, которого вы хотите забанить').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Причина бана участника').setRequired(true)),
    run: async (client, interaction) => {

       if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "У вас недостаточно прав для использования этой команды.", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.followUp(":x: | Произошла ошибка ");
        const reason = interaction.options.getString('reason')

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.followUp(":x: | Я не могу забанить этого участника");
        
        const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** забанен на сервере за \`${reason}\``)
        .setFooter("Бан участника")
        .setColor("RED")
        .setTimestamp()

        await member.user.send(`Вы забанены на **\`${interaction.guild.name}\`** за \`${reason}\``).catch(err => {})
        member.ban({ reason })

        return interaction.followUp({ embeds: [ embed ]})


      
    },
    
};
