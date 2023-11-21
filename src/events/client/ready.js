module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ta on!!! ${client.user.tag} está online`);
    }
}