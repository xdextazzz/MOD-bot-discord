const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require("ms")

module.exports = {
 data: new SlashCommandBuilder()   
 .setName("timeout")
 .setDescription("Позволяет модератору замутить игрока на сервере.")
 .addUserOption((option) => option.setName("member").setDescription('Человек, которого вы хотите замутить.').setRequired(true))
 .addStringOption((option) => option.setName("time").setDescription('На сколько времени вы хотите дать тайм-аут').setRequired(true))
 .addStringOption((option) => option.setName("reason").setDescription('Причина')),
 run: async (client, interaction) => {

    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: "У вас нет разрешения на использование этой команды." });

    const member = interaction.options.getMember('member')
    const reason = interaction.options.getString('reason') || null
    const time = ms(interaction.options.getString('time'))

    if(!time) return interaction.followUp({ content: "Указанное время недействительно, необходимо указать действительное время."})
    const response = await member.timeout(time, reason)

    if(!response) return interaction.followUp({ content: ":x: | Произошла ошибка "})
    return interaction.followUp({ content: `${member} был замучен на ${ms(time, { long: true })}`})
 }
}
