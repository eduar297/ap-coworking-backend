const ctr = {},

    Office = require('../models/office'),
    Rent = require('../models/rent')

ctr.create = async (req, res) => {
    const {
        name,
        price,
        description,
        img,
        count,
        available,
        dayPrice,
        morningPrice,
        afternoomPrice,
        nightPrice
    } = req.body

    const newOffice = new Office({
        name,
        price,
        description,
        img,
        count,
        available,
        dayPrice,
        morningPrice,
        afternoomPrice,
        nightPrice
    }),

        office = await newOffice.save()

    res.status(200).json({ office })
}

ctr.gets = async (req, res) => {
    const offices = await Office.find()
    console.log(offices)
    return res.status(200).send({ offices })
}

ctr.get = async (req, res) => {
    const { id } = req.params,
        office = await Office.findById(id)
    res.status(200).send({ office });
}
ctr.rentOffice = async (req, res) => {
    const { dates } = req.body,
        { id } = req.params

    dates.forEach(async (date) => {
        const rent = new Rent({
            officeId: id,
            professionalId: req.user.id,
            year: date[0],
            month: date[1],
            day: date[2],
            type: date[3]
        })
        await rent.save()
    })


    return res.status(200).send({ message: 'Office Rented' })
}
ctr.getSchedule = async (req, res) => {
    const { year1, month1, year2, month2, day, countDay } = req.body,
        { id } = req.params,

        schedule = []

    for (let i = Number(day); i <= countDay; i++) {
        if (schedule.length == 30)
            break
        const free = await getScheduleDay(year1, month1, i, id)
        schedule.push(free)
    }
    for (let i = 1; i <= 30; i++) {
        if (schedule.length == 30)
            break
        const free = await getScheduleDay(year2, month2, i, id)
        schedule.push(free)
    }
    return res.status(200).send({ schedule: schedule })
}
const getScheduleDay = async (year, month, day, id) => {
    const rents = await Rent.find({
        officeId: id,
        year: year,
        month: month,
        day: day
    });
    let schedule = [1, 1, 1, 1];

    rents.forEach(rent => {
        if (rent.type == 0)
            schedule = [0, 0, 0, 0]
        schedule[rent.type] = 0
    });

    return schedule

    /*    free = {
            8: [9, 10, 11, 12, 13, 14, 15],
            9: [10, 11, 12, 13, 14, 15],
            10: [11, 12, 13, 14, 15],
            11: [12, 13, 14, 15],
            12: [13, 14, 15],
            13: [14, 15],
            14: [15]
        }
    rents.forEach(item => {
        const start = item.start,
            end = item.end

        for (let i = start; i >= 8; i--) {
            const array = free[i],
                index = array.indexOf(start + 1),
                count = array.length - index
            array.splice(index, count)
        }
        for (let i = start + 1; i < end; i++) {
            free[i] = [];
        }
    });
    if (rents.length == 0)
        return [free, 'free']

    let empty = 0
    for (let index = 8; index < 15; index++) {
        if (free[index].length == 0)
            empty++
    }
    if (empty == 7)
        return [free, 'disable']

    return [free, 'ocupado']*/
}

module.exports = ctr