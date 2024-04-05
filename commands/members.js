const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType, Emoji } = require('discord.js');

module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
        .setName('members')
        .setDescription('Gives you a list about our gdsc members !'),
        
    run: async ({ interaction, client, handler }) => {
        const membersData = {
            Lead: [
                
                {name:'Amina Benamor', year:'M2', program:'AI'}],
            HR: [
                { name: 'Anis Rasoul', year:'3rd year', program: 'Computer Science' }
            ],
            PR: [
                { name: 'Roa Salmi', year: '3rd year', program: 'Applied Geology' },
                { name: 'Skander Benaggoune', year: '5th year', program: 'Industrial Networks & Artificial Intelligence ing' },
                { name: 'Malak Belabed', year: 'M1', program: 'Foreign languages' }
            ],
            Dev: [
                {name:'Dhia Eddine Anis Benflis',year:'M2',program:'ISI'},
                {name:'Dhia Eddine Ounissi',year:'3rd year',program:'Computer Science '},
                {name:'Anis Rasoul', year:'3rd year', program: 'Computer Science ' },
                {name:'Khomri haithem',year:'M1',program:'Ai'}


            ],
            Design: [
                { name: 'Mohamed Boudiaf', year: '3rd year', program: 'Computer Science ' },
                { name: 'Boughris Menane', year: '2nd Year', program: 'Computer Science ' },
                { name: 'Abderraouf Benbellat', year: '2nd year', program: 'Computer science , ' },
                { name: 'Hamza Rouabah', year: '2nd Year', program: 'Computer Science ' }
            ],
            DM: [
                { name: 'Amrane Mohamed', year: '2nd year', program: 'Computer Science' },
                { name: 'Abdelmalek Medseghir', year: '2nd year', program: 'Computer science' },
                { name: 'Bouthaina Guezouli', year: '2nd Year', program: 'Computer science ' }
            ],
            SM: [
                { name: 'Asma Khettache', year: '2nd year', program: 'CP ST' },
                { name: 'Zegar Mariaa', year: '2nd year', program: 'Computer science' },
                { name: 'Saadi Mohamed Younes', year: '2nd year', program: 'Computer science' },
                { name: 'Ayadi Youcef', year: '1st year', program: 'Computer science' },
                { name: 'Louchene Ikram', year:'2nd year', program:'Computer science' }
            ],
            QC: [
                { name: 'Aya Lounis', program: 'Artificial Intelligence', year: 'M1' },
                { name: 'Hadjer Houadef', year: '3rd year', program: 'Foreign languages' },
                { name: 'Aya Bounafa', year: '2nd year', program: 'Computer Science' }
            ],
            Content: [
                { name: 'Benhadda Chemselacil', year: 'M1', program: 'Agri-food safety and quality assurance' },
                { name: 'Douaa Bouhali', year: '2nd Year', program: 'Computer Science ' },
                { name: 'Douaa Cherara', year: '2nd Year', program: 'Computer Science ' }
            ],
           
        };

        const departments = Object.keys(membersData);

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(interaction.id)
            .setPlaceholder(`Select a team`)
            .setMinValues(0)
            .addOptions(
                departments.map(department =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(department)
                        .setValue(department)
                        
                )
            );

        const actionRow = new ActionRowBuilder().addComponents(selectMenu);

        const reply = await interaction.reply({
            content: 'Select a team to get its members 📋',
            components: [actionRow]
        });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.SELECT_MENU, time: 3_600_000 });
        collector.on('collect', async i => {
            const selection = i.values[0];
            const selectedMembers = membersData[selection] || [];

            let membersInfo = '';
            selectedMembers.forEach(member => {
                membersInfo += ` ${member.name} : ${member.year || ''} Student in ${member.program || ''} \n`;
            });

            await i.reply({
                content: ` Members of ${selection} Team 👨🏻‍💻 :\n  **TeamLeader** : ${membersInfo || 'No members found.'}`,
                ephemeral: true
            });
            
        });
    }
};
