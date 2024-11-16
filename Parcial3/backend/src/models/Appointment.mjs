class Appointment {
    constructor(id, patientId, doctorId, date, time) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = date;
        this.time = time;
    }
}

export default Appointment;