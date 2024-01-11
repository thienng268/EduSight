const Account = require('../models/Account');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Grade = require('../models/Grade');
const Manager = require('../models/Manager');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const Schedule = require('../models/Schedule');

const xlsx = require('xlsx');
class ScheduleController
{

    async index(req, res) {
        try {
            const teacher = await Teacher.find({})
            .select('Name subjectID scheduleID'); // Chọn các trường dữ liệu cần hiển thị
            // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
            //console.log(accounts);
            const teachersWithSchedule = await Promise.all(teacher.map(async (teacherItem) => {
            // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
            console.log(teacherItem.scheduleID);
            if(teacherItem.scheduleID === undefined) {
                const newSchedule = new Schedule({ 
                    teacherID: teacherItem._id,
                    subjectID: teacherItem.scheduleID,
                  });

                const classes = Class.find({}).lean();
                let count = 0;

                // Lặp qua từng lớp học và cập nhật cho đến khi count đạt đến 5
                for (let i = 0; i < classes.length && count < 5; i++) {
                    let classItem = classes[i];
                    // Thực hiện các thay đổi mà bạn muốn trên đối tượng classItem
                    // Ví dụ thay đổi một thuộc tính cụ thể
                    const findSchedule = Schedule.find({T2_M1: classItem.Name});

                    //T2 - M
                    if(findSchedule){
                        newSchedule.T2_M1 = "";
                    }else{
                        newSchedule.T2_M1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T2_M2 = "";
                    }else{
                        newSchedule.T2_M2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T2_M3 = "";
                    }else{
                        newSchedule.T2_M3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T2_M4 = "";
                    }else{
                        newSchedule.T2_M4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T2_M5 = "";
                    }else{
                        newSchedule.T2_M5 = classItem.Name;
                        count++;
                    }

                    //T2 - A
                    if(findSchedule){
                        newSchedule.T2_A1 = "";
                    }else{
                        newSchedule.T2_A1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T2_A2 = "";
                    }else{
                        newSchedule.T2_A2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T2_A3 = "";
                    }else{
                        newSchedule.T2_A3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T2_A4 = "";
                    }else{
                        newSchedule.T2_A4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T2_A5 = "";
                    }else{
                        newSchedule.T2_A5 = classItem.Name;
                        count++;
                    }


                    //T3 - M
                    if(findSchedule){
                        newSchedule.T3_M1 = "";
                    }else{
                        newSchedule.T3_M1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T3_M2 = "";
                    }else{
                        newSchedule.T3_M2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T3_M3 = "";
                    }else{
                        newSchedule.T3_M3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T3_M4 = "";
                    }else{
                        newSchedule.T3_M4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T3_M5 = "";
                    }else{
                        newSchedule.T3_M5 = classItem.Name;
                        count++;
                    }

                    //T3 - A
                    if(findSchedule){
                        newSchedule.T3_A1 = "";
                    }else{
                        newSchedule.T3_A1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T3_A2 = "";
                    }else{
                        newSchedule.T3_A2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T3_A3 = "";
                    }else{
                        newSchedule.T3_A3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T3_A4 = "";
                    }else{
                        newSchedule.T3_A4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T3_A5 = "";
                    }else{
                        newSchedule.T3_A5 = classItem.Name;
                        count++;
                    }

                    //T4 - M
                    if(findSchedule){
                        newSchedule.T4_M1 = "";
                    }else{
                        newSchedule.T4_M1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T4_M2 = "";
                    }else{
                        newSchedule.T4_M2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T4_M3 = "";
                    }else{
                        newSchedule.T4_M3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T4_M4 = "";
                    }else{
                        newSchedule.T4_M4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T4_M5 = "";
                    }else{
                        newSchedule.T4_M5 = classItem.Name;
                        count++;
                    }

                    //T4 - A
                    if(findSchedule){
                        newSchedule.T4_A1 = "";
                    }else{
                        newSchedule.T4_A1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T4_A2 = "";
                    }else{
                        newSchedule.T4_A2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T4_A3 = "";
                    }else{
                        newSchedule.T4_A3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T4_A4 = "";
                    }else{
                        newSchedule.T4_A4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T4_A5 = "";
                    }else{
                        newSchedule.T4_A5 = classItem.Name;
                        count++;
                    }

                    // T5 - Morning
                    if(findSchedule){
                        newSchedule.T5_M1 = "";
                    }else{
                        newSchedule.T5_M1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T5_M2 = "";
                    }else{
                        newSchedule.T5_M2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T5_M3 = "";
                    }else{
                        newSchedule.T5_M3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T5_M4 = "";
                    }else{
                        newSchedule.T5_M4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T5_M5 = "";
                    }else{
                        newSchedule.T5_M5 = classItem.Name;
                        count++;
                    }

                    // T5 - Afternoon
                    if(findSchedule){
                        newSchedule.T5_A1 = "";
                    }else{
                        newSchedule.T5_A1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T5_A2 = "";
                    }else{
                        newSchedule.T5_A2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T5_A3 = "";
                    }else{
                        newSchedule.T5_A3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T5_A4 = "";
                    }else{
                        newSchedule.T5_A4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T5_A5 = "";
                    }else{
                        newSchedule.T5_A5 = classItem.Name;
                        count++;
                    }


                    // T6 - Morning
                    if(findSchedule){
                        newSchedule.T6_M1 = "";
                    }else{
                        newSchedule.T6_M1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T6_M2 = "";
                    }else{
                        newSchedule.T6_M2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T6_M3 = "";
                    }else{
                        newSchedule.T6_M3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T6_M4 = "";
                    }else{
                        newSchedule.T6_M4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T6_M5 = "";
                    }else{
                        newSchedule.T6_M5 = classItem.Name;
                        count++;
                    }

                    // T6 - Afternoon
                    if(findSchedule){
                        newSchedule.T6_A1 = "";
                    }else{
                        newSchedule.T6_A1 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T6_A2 = "";
                    }else{
                        newSchedule.T6_A2 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T6_A3 = "";
                    }else{
                        newSchedule.T6_A3 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T6_A4 = "";
                    }else{
                        newSchedule.T6_A4 = classItem.Name;
                        count++;
                    }
                    if(findSchedule){
                        newSchedule.T6_A5 = "";
                    }else{
                        newSchedule.T6_A5 = classItem.Name;
                        count++;
                    }



                    // Lưu thay đổi vào database
                    // Tăng count lên sau mỗi lần cập nhật
                    // Khi count đạt đến 5, dừng vòng lặp
                    if (count === 5) break;
                }

                teacherItem.scheduleID = newSchedule._id;
            }

            const schedule = await Schedule.findById(teacherItem.scheduleID).select(
                'T2_M1 T2_M2 T2_M3 T2_M4 T2_M5 T2_A1 T2_A2 T2_A3 T2_A4 T2_A5 T3_M1 T3_M2 T3_M3 T3_M4 T3_M5 T3_A1 T3_A2 T3_A3 T3_A4 T3_A5 T4_M1 T4_M2 T4_M3 T4_M4 T4_M5 T4_A1 T4_A2 T4_A3 T4_A4 T4_A5 T5_M1 T5_M2 T5_M3 T5_M4 T5_M5 T5_A1 T5_A2 T5_A3 T5_A4 T5_A5 T6_M1 T6_M2 T6_M3 T6_M4 T6_M5 T6_A1 T6_A2 T6_A3 T6_A4 T6_A5 T7_M1 T7_M2 T7_M3 T7_M4 T7_M5 T7_A1 T7_A2 T7_A3 T7_A4 T7_A5'
            );
            // Trả về đối tượng mới có thêm thông tin giáo viên
            return {
                ...teacherItem.toObject(),
                T2_M1: schedule ? schedule.T2_M1 : '',
                T2_M2: schedule ? schedule.T2_M2 : '',
                T2_M3: schedule ? schedule.T2_M3 : '',
                T2_M4: schedule ? schedule.T2_M4 : '',
                T2_M5: schedule ? schedule.T2_M5 : '',

                T2_A1: schedule ? schedule.T2_A1 : '',
                T2_A2: schedule ? schedule.T2_A2 : '',
                T2_A3: schedule ? schedule.T2_A3 : '',
                T2_A4: schedule ? schedule.T2_A4 : '',
                T2_A5: schedule ? schedule.T2_A5 : '',

                T3_M1: schedule ? schedule.T3_M1 : '',
                T3_M2: schedule ? schedule.T3_M2 : '',
                T3_M3: schedule ? schedule.T3_M3 : '',
                T3_M4: schedule ? schedule.T3_M4 : '',
                T3_M5: schedule ? schedule.T3_M5 : '',

                T3_A1: schedule ? schedule.T3_A1 : '',
                T3_A2: schedule ? schedule.T3_A2 : '',
                T3_A3: schedule ? schedule.T3_A3 : '',
                T3_A4: schedule ? schedule.T3_A4 : '',
                T3_A5: schedule ? schedule.T3_A5 : '',

                T4_M1: schedule ? schedule.T4_M1 : '',
                T4_M2: schedule ? schedule.T4_M2 : '',
                T4_M3: schedule ? schedule.T4_M3 : '',
                T4_M4: schedule ? schedule.T4_M4 : '',
                T4_M5: schedule ? schedule.T4_M5 : '',

                T4_A1: schedule ? schedule.T4_A1 : '',
                T4_A2: schedule ? schedule.T4_A2 : '',
                T4_A3: schedule ? schedule.T4_A3 : '',
                T4_A4: schedule ? schedule.T4_A4 : '',
                T4_A5: schedule ? schedule.T4_A5 : '',

                T5_M1: schedule ? schedule.T5_M1 : '',
                T5_M2: schedule ? schedule.T5_M2 : '',
                T5_M3: schedule ? schedule.T5_M3 : '',
                T5_M4: schedule ? schedule.T5_M4 : '',
                T5_M5: schedule ? schedule.T5_M5 : '',

                T5_A1: schedule ? schedule.T5_A1 : '',
                T5_A2: schedule ? schedule.T5_A2 : '',
                T5_A3: schedule ? schedule.T5_A3 : '',
                T5_A4: schedule ? schedule.T5_A4 : '',
                T5_A5: schedule ? schedule.T5_A5 : '',
                
                T6_M1: schedule ? schedule.T6_M1 : '',
                T6_M2: schedule ? schedule.T6_M2 : '',
                T6_M3: schedule ? schedule.T6_M3 : '',
                T6_M4: schedule ? schedule.T6_M4 : '',
                T6_M5: schedule ? schedule.T6_M5 : '',

                T6_A1: schedule ? schedule.T6_A1 : '',
                T6_A2: schedule ? schedule.T6_A2 : '',
                T6_A3: schedule ? schedule.T6_A3 : '',
                T6_A4: schedule ? schedule.T6_A4 : '',
                T6_A5: schedule ? schedule.T6_A5 : '',

                T7_M1: schedule ? schedule.T7_M1 : '',
                T7_M2: schedule ? schedule.T7_M2 : '',
                T7_M3: schedule ? schedule.T7_M3 : '',
                T7_M4: schedule ? schedule.T7_M4 : '',
                T7_M5: schedule ? schedule.T7_M5 : '',

                T7_A1: schedule ? schedule.T7_A1 : '',
                T7_A2: schedule ? schedule.T7_A2 : '',
                T7_A3: schedule ? schedule.T7_A3 : '',
                T7_A4: schedule ? schedule.T7_A4 : '',
                T7_A5: schedule ? schedule.T7_A5 : '', 
                // Nếu không tìm thấy giáo viên, có thể trả về giá trị mặc định
            };
        }));

        res.render('scheduleview', {teacher: teachersWithSchedule});
        } catch (error) {
            console.error(error);
            res.status(500).send('Error: '+error);
        }
    }
    
    async processSchedule(req, res) {
        try {
            const workbook = xlsx.readFile(req.file.path);
            const sheetNameList = workbook.SheetNames;
            const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]], {
                header: 1,
                defval: ""
            });
            req.session.scheduleData = data;
            res.redirect('/schedule/view');
        } catch (error) {
            res.status(500).send("Error processing the file");
        }
    }

    view(req, res) {
        if (req.session.scheduleData) {
            res.render('scheduleview', { scheduleData: req.session.scheduleData });
        } else {
            res.redirect('/schedule');
        }
    }
    // view(req, res) {
    //     res.render('scheduleview');
    // }
    list(req, res) {
        res.render('schedule_list');
    }
}

module.exports = new ScheduleController;