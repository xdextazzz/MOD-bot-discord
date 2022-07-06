module.exports = {
    description: "Deploy the slash commands in your guild.",
    run: async (client, message) => {
        await message.guild.commands.set([...client.slash_commands].map(x => x[1].data))

        return message.channel.send("✅ | Команды успешно включились и перезагрузились")
    }
}