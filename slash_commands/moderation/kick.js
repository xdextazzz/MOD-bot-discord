const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Позволяет администратору или владельцу исключить участника.")
    .addUserOption((option) => option.setName('user').setDescription('Человек, которого вы хотите кикнуть').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Причина кика').setRequired(true)),
    run: async (client, interaction) => {

       if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.followUp({ content: "У вас недостаточно прав для использования этой команды.", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.followUp(":x: | Произошла ошибка");
        const reason = interaction.options.getString('reason')

        if(!member.kickable || member.user.id === client.user.id) 
        return interaction.followUp("Я не могу выгнать этого участника");
        
        const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** был кикнут за \`${reason}\``)
        .setColor("GREEN")
        .setFooter("Исключение участника")
        .setTimestamp()
        await member.user.send(`Ты был кикнут на **\`${interaction.guild.name}\`** за \`${reason}\``).catch(err => {})
        member.kick({ reason })

        return interaction.followUp({ embeds: [ embed ]})

    },
    
};
