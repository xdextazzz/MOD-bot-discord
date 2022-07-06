const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Позволяет модератору выдать предупреждение")
    .addUserOption((option) => option.setName('user').setDescription('Человеку, которому вы хотите выдать предупреждение').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Причина предупреждение').setRequired(true)),
    run: async (client, interaction) => {

       if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.followUp({ content: "У вас недостаточно прав для использования этой команды.", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.followUp(":x: | Произошла ошибка");
        const reason = interaction.options.getString('reason')
        
        const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** было выдано предупреждение за \`${reason}\``)
        .setColor("BLUE")
        .setFooter(`${member.user.id}`)
        .setTimestamp()
        await member.user.send(`Вам выдано предупреждение на сервере **\`${interaction.guild.name}\`** за \`${reason}\``).catch(err => {})
        return interaction.followUp({ embeds: [ embed ]})
    }
};
