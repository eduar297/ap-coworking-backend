const Office = require('../models/office')

const offices = [
    {
        name: "Escritorios Dedicados",
        description: `Lorem, ipsum dolor sit amet consectetur 
            adipisicing elit.Nobis pariatur illum dignissimos
            tempore magnam placeat non? Rerum, deserunt ut`,
        price: 15,
        img: 'OfficeType1.jpg',
        count: 10,
        avaliable: 7,
        disabled: false
    },
    {
        name: "Oficinas Privadas",
        description: `Lorem, ipsum dolor sit amet consectetur 
            adipisicing elit.Nobis pariatur illum dignissimos
            tempore magnam placeat non? Rerum, deserunt ut`,
        price: 25,
        img: 'OfficeType2.jpg',
        count: 17,
        avaliable: 2,
        disabled: true
    },
    {
        name: "Oficinas Epeciales",
        description: `Lorem, ipsum dolor sit amet consectetur 
            adipisicing elit.Nobis pariatur illum dignissimos
            tempore magnam placeat non? Rerum, deserunt ut`,
        price: 50,
        img: 'OfficeTypeHotDesck.jpg',
        count: 25,
        avaliable: 5,
        disabled: false
    },
    {
        name: "Oficinas de Reuniones",
        description: `Lorem, ipsum dolor sit amet consectetur 
            adipisicing elit.Nobis pariatur illum dignissimos
            tempore magnam placeat non? Rerum, deserunt ut`,
        price: 39,
        img: 'OfficeTypeReuniones.jpg',
        count: 12,
        avaliable: 9,
        disabled: false
    }
]

const seed = async () => {
    offices.map(async office => {
        const newOffice = Office(office)
        await newOffice.save()
    })
}

module.exports = seed