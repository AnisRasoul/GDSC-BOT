
module.exports = async (interaction, client, handler, user) => {
    try {
        const channel = await client.channels.cache.get('1223679887756234823');
        if (channel) {
            channel.send({
                content: `Hi, stranger! I'll tell you some secrets about gdsc`,
                ephemeral: true
            });
        }
    } catch (error) {
        console.error(error);
    }
};
