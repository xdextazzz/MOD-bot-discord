const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("Позволяет модератору посмотреть все предупреждения")
    .addUserOption((option) => option.setName('user').setDescription('Человек, у которого вы хотите посмотреть все предупреждения').setRequired(true)),
    run: async (client, interaction) => {

       if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.followUp({ content: "У вас недостаточно прав для использования этой команды.", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.followUp(":x: | Произошла ошибка");
        const reason = interaction.options.getString('reason')
        
        const embed = new MessageEmbed()
        .setDescription(`**Откройте поиск** клавишами: CTRL + F и **вставьте данный ID**: __${member.user.id}__`)
        .setColor("BLUE")
        .setFooter(`${member.user.tag}`)
        .setTimestamp()
        return interaction.followUp({ embeds: [ embed ]})
    }
};
