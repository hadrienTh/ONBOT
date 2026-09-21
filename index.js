require('dotenv').config();
const { Client, GatewayIntentBits, Events, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
    await c.application.commands.set([
        { name: 'ping', description: 'Répond pong' },
        { name: 'sondage', description:"Fais un sondage"},
        { name: 'message', description: "ecrit un message", options:[
                                                                        {
                                                                        name: 'texte',
                                                                        description:'le texte à envoyer',
                                                                        type: 3,
                                                                        required: true,
                                                                        }
                                                                    ]},
        { name: 'des', description:"lance un des" , options:[
                                                                {
                                                                    name: 'faces',
                                                                    description: 'nombre de faces',
                                                                    type: 4,
                                                                    required: true,
                                                                    min_value: 2,
                                                                    max_value: 1000,
                                                                }
                                                            ]}
    ]);
    console.log(`Connecté en tant que ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong !');
    }
    else if(interaction.commandName === 'sondage') {
        await interaction.reply({
            poll: {
                question: { text: "🦑 Ce week-end je viens :" },
                answers: [
                    {emoji:'🗓️' , text: 'Samedi'},
                    {emoji:'🗓️' , text: 'Dimanche'},
                    {emoji:'🪏' , text: 'Je suis au potager tous le week-end'},
                    {emoji:'🎲' , text: 'Je cherche une table'},
                    {emoji:'🗓️' , text: 'Je propose une table dans la section " ONJOO ? "'},
                    {emoji: '🎨', text: 'Je vien peindre des figurines/faire d\'autre atcivité '}
                ],
                duration: 1,
                allowMultiselect: true,
            },
        });
    }
    else if(interaction.commandName === "message"){
        const txt = interaction.options.getString('texte');
        await interaction.reply(txt);
    }
    else if(interaction.commandName === "des"){
        const nb = interaction.options.getInteger('faces');
        const result = Math.floor(Math.floor(Math.random() * nb) +1);
        await interaction.reply(`Lancement du d${nb}... Résultat: **${result}** 🎲`);
    }
});

client.login(process.env.TOKEN);