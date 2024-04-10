const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType, Emoji } = require('discord.js');

module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
        .setName('members')
        .setDescription('Gives you a list about our gdsc members 🕵️'),
        
    run: async ({ interaction, client, handler }) => {
        const membersData = {
            Lead: 
                [
                {name:'Amina Benamor', year:'M2', program:'AI'}
                ],
            HR: [
                {name:'Amani Rahmani', year:'M1 ', program:'AI'},
                {name: 'Anis Rasoul', year:'3rd year', program: 'Computer Science'}
            ],
            PR: [
                { name: 'Khenisssa younes', year: 'M1', program: 'Applied Geology' },
                { name: 'Skander Benaggoune', year: '5th year', program: 'Industrial Networks & Artificial Intelligence ing' },
                { name: 'Malak Belabed', year: 'M1', program: 'Foreign languages' }
            ],
            Dev: [
                {name:'Dhia Eddine Anis Benflis',year:'M2',program:'ISI'},
                {name:'Dhia Eddine Ounissi',year:'3rd year',program:'Computer Science '},
                {name:'Anis Rasoul', year:'3rd year', program: 'Computer Science ' },
                {name:'Khomri haithem',year:'M1',program:'Ai'},
                { name: 'Abdelmalek Medseghir', year: '2nd year', program: 'Computer science' },

            ],
            Design: [

                { name: 'Amdjed Nedjahi', year: 'M1', program: 'Accounting and taxation ' },
                { name: 'Mohamed Boudiaf', year: '3rd year', program: 'Computer Science ' },
                { name: 'Boughris Menane', year: '2nd Year', program: 'Computer Science ' },
                { name: 'Abderraouf Benbellat', year: '2nd year', program: 'Computer science' },
                { name: 'Hamza Rouabah', year: '2nd Year', program: 'Computer Science' },
                {name:'Bouragbi salah eddine ', year:'2nd Year', program:'Computer Science'}
            ],
            DM: [
                { name:'Aya hafsia',year:'M1', program:'Economics'},
                { name: 'Amrane Mohamed', year: '2nd year', program: 'Computer Science' },
                { name: 'Bouthaina Guezouli', year: '2nd Year', program: 'Computer science ' },
                { name: 'Amira Benhassir', year: '2nd Year', program: 'Computer science ' }
            ],
            SM: [
                { name: 'Selma makhloufi', year:'2nd Year', program:'Computer Science'},
                { name: 'Asma Khettache', year: '2nd year', program: 'CP ST' },
                { name: 'Zegar Mariaa', year: '2nd year', program: 'Computer science' },
                { name: 'Saadi Mohamed Younes', year: '2nd year', program: 'Computer science' },
                { name: 'Ayadi Youcef', year: '1st year', program: 'Computer science' },
                { name: 'Louchene Ikram', year:'2nd year', program:'Computer science' }
            ],
            QC: [
                { name: 'Aya Lounis', program: 'Artificial Intelligence', year: 'M1' },
                { name: 'Saber Kaddouri', year: '1st year', program: 'Computer Science' },
                { name: 'Aya Bounafa', year: '2nd year', program: 'Computer Science' }
            ],
            Content: [
                { name: 'Chaima Daas', year: 'M1', program: 'AI' },
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
            content: 'Get to know the GDSC members 🥁 select a department out of this list to to get its members 📋',
            components: [actionRow],
            ephemeral: true,
        });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.SELECT_MENU, time: 3_600_000 });
        collector.on('collect', async i => {
            const selection = i.values[0];
            const selectedMembers = membersData[selection] || [];

            let membersInfo = '';
            selectedMembers.forEach(member => {
                membersInfo += `⦿ ${member.name} : ${member.year || ''} Student in ${member.program || ''} \n`;
            });

            await i.reply({
                content: ` Members of ${selection} Team 👨🏻‍💻 :\n   **TeamLeader** : ${membersInfo || 'No members found.'}`,
                ephemeral: true
            });
            
        });
    }
};