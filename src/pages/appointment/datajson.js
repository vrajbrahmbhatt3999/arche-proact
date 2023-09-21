const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();
export const dataSource = [{
    label: 'Reviewing medical files and lab results',
    doctorId: "6448b4c9e7598a36aa3d0062",
    dateStart: new Date(currentYear, currentMonth, currentDate, 6, 30),
    dateEnd: new Date(currentYear, currentMonth, currentDate, 7, 30)
}, {
    label: 'Administering pain relief after medical procedures',
    doctorId: "6448b4c9e7598a36aa3d0062",
    dateStart: new Date(currentYear, currentMonth, currentDate + 2, 6, 30),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 2, 10)
},
{
    label: 'Add a new desk to the Dev Room',
    doctorId: "6448b4c9e7598a36aa3d0062",
    dateStart: new Date(currentYear, currentMonth, currentDate + 2, 7),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 2, 8, 15)
},
{
    label: 'Complying with medical and hospital procedure policy',
    doctorId: "6448b4c9e7598a36aa3d0062",
    dateStart: new Date(currentYear, currentMonth, currentDate + 4, 8),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 4, 9, 45)
},
{
    label: 'Informing patients of risks associated with anesthesia',
    doctorId: "6448b4c9e7598a36aa3d0062",
    dateStart: new Date(currentYear, currentMonth, currentDate + 3, 7),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 3, 8, 15)
},
{
    label: 'Monitoring patients vital signs during procedures',
    doctorId: "6448b4c9e7598a36aa3d0062",
    dateStart: new Date(currentYear, currentMonth, currentDate - 3, 9, 30),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 3, 13, 15)
},
{
    label: 'Monitor the effectiveness of skin treatments',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate - 3, 7, 15),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 3, 9, 15)
},
{
    label: 'Inform patients about available treatments',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate - 2, 10, 15),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 2, 12)
},
{
    label: 'Evaluate patients skin condition',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate - 1, 11, 30),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 1, 13, 15)
},
{
    label: 'Assess and update patients medical history',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate, 11, 30),
    dateEnd: new Date(currentYear, currentMonth, currentDate, 13, 10)
},
{
    label: 'Keep a record of patients symptoms',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate + 1, 10, 30),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 14, 30)
},
{
    label: 'Analyze all information regarding skin health conditions',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate + 2, 11),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 2, 15, 15)
},
{
    label: 'Conduct non-intrusive medical surgeries',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate + 3, 6),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 3, 8, 35)
},
{
    label: 'Refer patients to other specialists if needed',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate + 4, 7, 30),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 4, 8, 45)
},
{
    label: 'Attend seminars to learn about new medical techniques',
    doctorId: "644a0b7df8c48b0b06b8cfc6",
    dateStart: new Date(currentYear, currentMonth, currentDate - 4, 8),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 4, 10, 30)
},
{
    label: 'Examining them and conducting neurological tests.',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate - 2, 7, 45),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 2, 10, 5)
}, {
    label: 'Diagnose medical problems by referring to a patient\'s history',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate - 1, 10, 25),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 1, 12, 55)
}, {
    label: 'Counsel patients on neurological disorders',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate, 11, 10),
    dateEnd: new Date(currentYear, currentMonth, currentDate, 13, 20)
}, {
    label: 'Order neurological tests',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate + 1, 9, 15),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 1, 11, 20)
},
{
    label: 'Interpret the results of neuroimaging studies',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate + 2, 8, 15),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 2, 10, 15)
},
{
    label: 'Prescribe and/or administer treatment and medication',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate + 3, 9, 20),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 3, 10, 35)
},
{
    label: 'Monitor the cognitive side effects of medication',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate + 4, 10, 20),
    dateEnd: new Date(currentYear, currentMonth, currentDate + 4, 13)
},
{
    label: 'Order supportive care services for patients',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate - 4, 9),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 4, 11, 15)
},
{
    label: 'Participate in neuroscience research activities',
    doctorId: 3,
    dateStart: new Date(currentYear, currentMonth, currentDate - 3, 9),
    dateEnd: new Date(currentYear, currentMonth, currentDate - 3, 11, 15)
}];

export const resources = [{
    label: 'Doctors',
    value: 'doctorId',
    dataSource: [{
        label: 'Andrew Johnson',
        id: 1,
        speciality: 'Anesthesiology',
        image: 'smart-webcomponents-react/images/andrew.png',
        backgroundColor: '#28a745'
    }, {
        label: 'Steven Mcilroy',
        id: 2,
        speciality: 'Dermatology',
        image: 'smart-webcomponents-react/images/steven.png',
        backgroundColor: '#8f73af'
    }, {
        label: 'Michael Dawson',
        id: 3,
        speciality: 'Neurology',
        image: 'smart-webcomponents-react/images/michael.png',
        backgroundColor: '#BF8F00'
    }]
}]