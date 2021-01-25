const ctr = {},

    Account = require('../models/account'),
    Appointment = require('../models/appointment'),
    Rent = require('../models/rent'),
    Office = require('../models/office'),
    forgotPass = require('../service/forgotPass'),
    updatePassByEmail = require('../service/updatePassByEmail'),
    resetPass = require('../service/resetPass')

ctr.forgotPassword = async (req, res) => {
    const email = req.body.email

    await forgotPass(email, res)
}
ctr.resetPassword = async (req, res) => {
    const token = req.query.resetPasswordToken

    await resetPass(token, res)
}
ctr.updatePasswordByEmail = async (req, res) => {
    const { id, password } = req.body

    await updatePassByEmail(id, password, res)
}
ctr.gets = async (req, res) => {
    const professionals = await Account.find({ role: 'professional' })
    return res.status(200).send({ professionals })
}
ctr.get = async (req, res) => {
    const { id } = req.params
    const Professional = await Professional.findById(id)
    res.status(200).send({ Professional: Professional })
}
ctr.remove = async (req, res) => {
    const { id } = req.params
    const professional = await Professional.findById(id)
    await professional.remove()

    return res.status(200).send({ message: 'Professional Deleted' })
}
ctr.bookAppointment = async (req, res) => {
    const { year, month, day, start, end } = req.body
    const { id } = req.params
    const accountId = req.user.id

    let appointment = new Appointment({
        professionalId: id,
        clientId: accountId,
        year,
        month,
        day,
        start,
        end
    })
    appointment = await appointment.save()
    return res.status(200).send({ message: 'Appointment Booked', appointment: appointment })
}
ctr.getSchedule = async (req, res) => {
    const { year1, month1, year2, month2, day, countDay } = req.body, { id } = req.params,

        schedule = []


    for (let i = Number(day); i <= countDay; i++) {
        if (schedule.length == 30)
            break
        const free = await getScheduleDay(year1, month1, i, id);
        schedule.push(free)
    }
    for (let i = 1; i <= 30; i++) {
        if (schedule.length == 30)
            break
        const free = await getScheduleDay(year2, month2, i, id);
        schedule.push(free)
    }
    return res.status(200).send({ schedule: schedule })

}
const getScheduleDay = async (year, month, day, id) => {
    const rents = await Rent.find({
        professionalId: id,
        year: year,
        month: month,
        day: day
    });

    let free = {}

    if (rents.length == 0)
        return null
    else if (rents[0].type == 0) {
        free = {
            8: [9, 10, 11, 12],
            9: [10, 11, 12],
            10: [11, 12],
            11: [12],
            12: [13, 14, 15, 16],
            13: [14, 15, 16],
            14: [15, 16],
            15: [16],
            17: [18, 19, 20, 21, 22],
            18: [19, 20, 21, 22],
            19: [20, 21, 22],
            20: [21, 22],
            21: [22]
        }
    }
    else {
        rents.forEach(rent => {
            if (rent.type == 1) {
                free[8] = [9, 10, 11, 12];
                free[9] = [10, 11, 12];
                free[10] = [11, 12];
                free[11] = [12];
            }
            if (rent.type == 2) {
                free[12] = [13, 14, 15, 16];
                free[13] = [14, 15, 16];
                free[14] = [15, 16];
                free[15] = [16];
            }
            if (rent.type == 3) {
                free[17] = [18, 19, 20, 21, 22];
                free[18] = [19, 20, 21, 22];
                free[19] = [20, 21, 22];
                free[20] = [21, 22];
                free[21] = [22];
            }
        })
    }
    const appointments = await Appointment.find({
        professionalId: id,
        year: year,
        month: month,
        day: day
    })

    appointments.forEach(appointment => {
        const start = Number(appointment.start),
            end = Number(appointment.end)
        if (start <= 11) {
            for (let i = start; i >= 8; i--) {
                const array = free[i],
                    index = array.indexOf(start + 1),
                    count = array.length - index
                array.splice(index, count)
            }
            for (let i = start + 1; i < end; i++) {
                free[i] = [];
            }
        }
        else if (start < 16) {
            for (let i = start; i >= 12; i--) {
                const array = free[i],
                    index = array.indexOf(start + 1),
                    count = array.length - index
                array.splice(index, count)
            }
            for (let i = start + 1; i < end; i++) {
                free[i] = [];
            }
        }
        else {
            for (let i = start; i >= 17; i--) {
                const array = free[i],
                    index = array.indexOf(start + 1),
                    count = array.length - index
                array.splice(index, count)
            }
            for (let i = start + 1; i < end; i++) {
                free[i] = [];
            }
        }
    })


    return free;

    /*

    rents.forEach(item => {
        const start = item.start,
            end = item.end

        for (let i = start + 1; i <= end; i++)
            free[start].push(i)

    });

    const appointments = await Appointment.find({
        professionalId: id,
        year: year,
        month: month,
        day: day
    })

    if (appointments.length == 0)
        return free

    appointments.forEach(item => {
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

    })*/
}
ctr.getRents = async (req, res) => {
    const id = req.user.id;
    const rents = await Rent.find({ professionalId: id });
    for (let i = 0; i < rents.length; i++) {
        const office = await Office.findById(rents[i].officeId)
        rents[i].officeName = office.name
    }
    return res.status(200).json({ rents })
}

module.exports = ctr