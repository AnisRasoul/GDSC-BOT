const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    deleted: false, 
    data: new SlashCommandBuilder()
            .setName('departments')
            .setDescription('Description of the command'),
    async run({ interaction, client, handler }) {
        const buttons = [
            { label: 'Public Relations ', custom_id: 'dep1' },
            { label: 'Design', custom_id: 'dep2' },
            { label: 'Social Media', custom_id: 'dep3' },
            { label: 'Digital Marketing', custom_id: 'dep4' },
            { label: 'Content Creation', custom_id: 'dep5' },
            { label: ' Quality Control ', custom_id: 'dep6' },
            { label: 'Human Resources ', custom_id: 'dep7' },
            { label: 'Development', custom_id: 'dep8' },
            
        ];

        const rows = [];
        let currentRow = [];

        buttons.forEach((button, index) => {
            currentRow.push({
                type: 2,
                style: 1,
                label: button.label,
                custom_id: button.custom_id
            });

            if (index !== 0 && (index + 1) % 5 === 0) {
                rows.push({ type: 1, components: currentRow });
                currentRow = [];
            }
        });

        if (currentRow.length > 0) {
            rows.push({ type: 1, components: currentRow });
        }

        await interaction.reply({ content: 'Please select a department:', components: rows, ephemeral: true });
         // Listen for button interactions
         const filter = (i) => i.isButton() && i.customId.startsWith('dep');
         const collector = interaction.channel.createMessageComponentCollector({ filter });
 
         collector.on('collect', async (buttonInteraction) => {
             // Handle button click
             let departmentInfo = '';
 
             switch (buttonInteraction.customId) {
                 case 'dep1':
                     departmentInfo = '`The Public Relations department📣typically focuses on managing the communication between an organization and its audience, which includes potential sponsors. They work to maintain a positive image of the organization and often engage in activities such as contacting potential sponsors, organizing events, and managing media relations to promote the club`s goals and initiatives`';
                     break;
                 case 'dep2':
                     departmentInfo = '`The Design department🎨is responsible for creating all the visual elements that the club needs, including posters, logos, stickers, and badges. They focus on design-related tasks and ensure that the club`s visual identity is outstanding `';
                     break;
                 case 'dep3':
                     departmentInfo = '`This department takes the main role of handling gdsc Batna`s social media accounts📱📸. It`s the face of the club and the one in charge of organizing the feed and giving the followers a better experience,Additionally, it highlights specific tasks such as managing social media accounts, and creating visually engaging content like reels and stories to enhance the overall experience for followers`';
                     break;
                 case 'dep4':
                     departmentInfo = '`This department serves as the driving force behind gdsc batna`s online presence and promotional efforts They leverage various digital channels🌐👥 such as social media, email marketing, search engine optimization , and online advertising to increase the club`s visibility and attract new members. Responsibilities include developing and implementing digital marketing strategies.`';
                     break;
                 case 'dep5':
                     departmentInfo = '`This department is dedicated to producing high-quality content🖌️ that showcases the expertise and interests of gdsc Batna`s members. They are responsible for generating written, visual, and multimedia content across various platforms, including the club` website, blog, social media channels.`';
                     break;
                 case 'dep6':
                     departmentInfo = '`This department plays a crucial role in ensuring that all activities and outputs of GDG Batna meet the highest standards of quality and excellence🔍🛠️. Their responsibilities include implementing and maintaining quality assurance processes and procedures throughout the organization. They conduct regular audits and evaluations to assess the effectiveness of existing systems and identify areas for improvement`';
                     break;
                 case 'dep7':
                     departmentInfo = '`At GDSC Club, our Human Resources Department💼👥 is the cornerstone of our community, committed to sourcing top talent, fostering professional growth, and ensuring a positive atmosphere. From recruitment and training to performance management , we prioritize the development and satisfaction of our team members. With a focus on compliance and strategic HR initiatives, we aim to cultivate a culture of excellence and drive the club towards continued success.`';
                     break;
                 case 'dep8':
                     departmentInfo = '`our Development Team🖥️👾 is a group of dedicated individuals who collaborate closely to tackle technical challenges and create innovative solutions. From brainstorming ideas to implementing them through coding and testing, we work together every step of the way. Our team is committed to continuous learning and improvement, constantly exploring new technologies and techniques to enhance our projects. Through our collective efforts, we strive to make a meaningful impact in our community and beyond, one line of code at a time.`';
                     break;
                 default:
                     departmentInfo = 'Sorry, no information available for this department.';
                     break;
             }
 
             await buttonInteraction.reply
             ({
                    content: departmentInfo ,
                    ephemeral: true,
             });
         });
     }
 };