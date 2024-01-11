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

const ExcelJS = require('exceljs');

const xlsx = require('xlsx');
class ScheduleController
{

    async index(req, res) {
        try {

            

            const teachersWithoutSchedule = await Teacher.find({ scheduleID: { $eq: null } });

            // Lấy tất cả tên lớp học
            const classes = await Class.find({});
            const classNames = classes.map(cls => cls.Name);

            // Lặp qua mỗi giáo viên và tạo lịch ngẫu nhiên
            for (const teacher of teachersWithoutSchedule) {
            // Tạo danh sách các khóa học ngẫu nhiên không trùng lặp
            const randomClassNames = [];
            while (randomClassNames.length < 8) {
                const randomClass = classNames[Math.floor(Math.random() * classNames.length)];
                if (!randomClassNames.includes(randomClass)) {
                randomClassNames.push(randomClass);
                }
            }

            // Chọn ngẫu nhiên 8 trường để gán các lớp đã chọn
            const scheduleFields = Object.keys(Schedule.schema.paths)
                .filter(key => key.startsWith('T') && key !== 'teacherID' && key !== 'subjectID')
                .sort(() => 0.5 - Math.random())
                .slice(0, 8);

            const newScheduleData = { teacherID: teacher._id, subjectID: teacher.subjectID };
            scheduleFields.forEach((field, index) => {
                newScheduleData[field] = randomClassNames[index];
            });

            // Tạo và lưu lịch mới
            const newSchedule = new Schedule(newScheduleData);
            await newSchedule.save();

            // Cập nhật giáo viên với ID lịch mới
            teacher.scheduleID = newSchedule._id;
            await teacher.save();
            }

            const listteacher = await Teacher.find({}).select('Name').lean();
            const teacher = await Teacher.find({})
            .select('Name subjectID scheduleID'); // Chọn các trường dữ liệu cần hiển thị
            // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
            //console.log(accounts);
            const teachersWithSchedule = await Promise.all(teacher.map(async (teacherItem) => {
            // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
            
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

        res.render('scheduleview', {teacher: teachersWithSchedule, listteacher: listteacher});
        } catch (error) {
            console.error(error);
            res.status(500).send('Error: '+error);
        }
    }
    

    async scheduleFilter (req, res) {
        try {
          const teacherId = req.params.teacherId;

         console.log('TeacherID: '+ teacherId);
         const listteacher = await Teacher.find({}).select('Name').lean();
          
          const teacher = await Teacher.find({_id: teacherId})
            .select('Name subjectID scheduleID'); // Chọn các trường dữ liệu cần hiển thị
            // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
            //console.log(accounts);
            const teachersWithSchedule = await Promise.all(teacher.map(async (teacherItem) => {
            // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
            
            
        
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
            })); // Gửi lịch giảng dạy dưới dạng JSON
            res.render('scheduleview', {teacher: teachersWithSchedule,listteacher: listteacher});
        } catch (error) {
          res.status(500).send(error);
        }
    }

    async exportToExcel(req, res) {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Schedules');
    
            // Thêm tiêu đề cho worksheet
            worksheet.columns = [
                { header: 'Giáo viên', key: 'teacher', width: 10 },
                { header: 'Thứ 2 Sáng Tiết 1', key: 'T2_M1', width: 10 },
                { header: 'Thứ 2 Sáng Tiết 2', key: 'T2_M2', width: 10 },
                { header: 'Thứ 2 Sáng Tiết 3', key: 'T2_M3', width: 10 },
                { header: 'Thứ 2 Sáng Tiết 4', key: 'T2_M4', width: 10 },
                { header: 'Thứ 2 Sáng Tiết 5', key: 'T2_M5', width: 10 },
                { header: 'Thứ 2 Chiều Tiết 1', key: 'T2_A1', width: 10 },
                { header: 'Thứ 2 Chiều Tiết 2', key: 'T2_A2', width: 10 },
                { header: 'Thứ 2 Chiều Tiết 3', key: 'T2_A3', width: 10 },
                { header: 'Thứ 2 Chiều Tiết 4', key: 'T2_A4', width: 10 },
                { header: 'Thứ 2 Chiều Tiết 5', key: 'T2_A5', width: 10 },

                { header: 'Thứ 3 Sáng Tiết 1', key: 'T3_M1', width: 10 },
                { header: 'Thứ 3 Sáng Tiết 2', key: 'T3_M2', width: 10 },
                { header: 'Thứ 3 Sáng Tiết 3', key: 'T3_M3', width: 10 },
                { header: 'Thứ 3 Sáng Tiết 4', key: 'T3_M4', width: 10 },
                { header: 'Thứ 3 Sáng Tiết 5', key: 'T3_M5', width: 10 },
                { header: 'Thứ 3 Chiều Tiết 1', key: 'T3_A1', width: 10 },
                { header: 'Thứ 3 Chiều Tiết 2', key: 'T3_A2', width: 10 },
                { header: 'Thứ 3 Chiều Tiết 3', key: 'T3_A3', width: 10 },
                { header: 'Thứ 3 Chiều Tiết 4', key: 'T3_A4', width: 10 },
                { header: 'Thứ 3 Chiều Tiết 5', key: 'T3_A5', width: 10 },
            
                
                { header: 'Thứ 4 Sáng Tiết 1', key: 'T4_M1', width: 10 },
                { header: 'Thứ 4 Sáng Tiết 2', key: 'T4_M2', width: 10 },
                { header: 'Thứ 4 Sáng Tiết 3', key: 'T4_M3', width: 10 },
                { header: 'Thứ 4 Sáng Tiết 4', key: 'T4_M4', width: 10 },
                { header: 'Thứ 4 Sáng Tiết 5', key: 'T4_M5', width: 10 },
                { header: 'Thứ 4 Chiều Tiết 1', key: 'T4_A1', width: 10 },
                { header: 'Thứ 4 Chiều Tiết 2', key: 'T4_A2', width: 10 },
                { header: 'Thứ 4 Chiều Tiết 3', key: 'T4_A3', width: 10 },
                { header: 'Thứ 4 Chiều Tiết 4', key: 'T4_A4', width: 10 },
                { header: 'Thứ 4 Chiều Tiết 5', key: 'T4_A5', width: 10 },

                { header: 'Thứ 5 Sáng Tiết 1', key: 'T5_M1', width: 10 },
                { header: 'Thứ 5 Sáng Tiết 2', key: 'T5_M2', width: 10 },
                { header: 'Thứ 5 Sáng Tiết 3', key: 'T5_M3', width: 10 },
                { header: 'Thứ 5 Sáng Tiết 4', key: 'T5_M4', width: 10 },
                { header: 'Thứ 5 Sáng Tiết 5', key: 'T5_M5', width: 10 },
                { header: 'Thứ 5 Chiều Tiết 1', key: 'T5_A1', width: 10 },
                { header: 'Thứ 5 Chiều Tiết 2', key: 'T5_A2', width: 10 },
                { header: 'Thứ 5 Chiều Tiết 3', key: 'T5_A3', width: 10 },
                { header: 'Thứ 5 Chiều Tiết 4', key: 'T5_A4', width: 10 },
                { header: 'Thứ 5 Chiều Tiết 5', key: 'T5_A5', width: 10 },

                { header: 'Thứ 6 Sáng Tiết 1', key: 'T6_M1', width: 10 },
                { header: 'Thứ 6 Sáng Tiết 2', key: 'T6_M2', width: 10 },
                { header: 'Thứ 6 Sáng Tiết 3', key: 'T6_M3', width: 10 },
                { header: 'Thứ 6 Sáng Tiết 4', key: 'T6_M4', width: 10 },
                { header: 'Thứ 6 Sáng Tiết 5', key: 'T6_M5', width: 10 },
                { header: 'Thứ 6 Chiều Tiết 1', key: 'T6_A1', width: 10 },
                { header: 'Thứ 6 Chiều Tiết 2', key: 'T6_A2', width: 10 },
                { header: 'Thứ 6 Chiều Tiết 3', key: 'T6_A3', width: 10 },
                { header: 'Thứ 6 Chiều Tiết 4', key: 'T6_A4', width: 10 },
                { header: 'Thứ 6 Chiều Tiết 5', key: 'T6_A5', width: 10 },

                { header: 'Thứ 7 Sáng Tiết 1', key: 'T7_M1', width: 10 },
                { header: 'Thứ 7 Sáng Tiết 2', key: 'T7_M2', width: 10 },
                { header: 'Thứ 7 Sáng Tiết 3', key: 'T7_M3', width: 10 },
                { header: 'Thứ 7 Sáng Tiết 4', key: 'T7_M4', width: 10 },
                { header: 'Thứ 7 Sáng Tiết 5', key: 'T7_M5', width: 10 },
                { header: 'Thứ 7 Chiều Tiết 1', key: 'T7_A1', width: 10 },
                { header: 'Thứ 7 Chiều Tiết 2', key: 'T7_A2', width: 10 },
                { header: 'Thứ 7 Chiều Tiết 3', key: 'T7_A3', width: 10 },
                { header: 'Thứ 7 Chiều Tiết 4', key: 'T7_A4', width: 10 },
                { header: 'Thứ 7 Chiều Tiết 5', key: 'T7_A5', width: 10 },

                // ... thêm tất cả các cột theo mô hình Schedule của bạn
            ];
    
            // Thêm dữ liệu vào worksheet
            const schedules = await Schedule.find().exec();
             // Truy vấn tất cả dữ liệu từ mô hình Schedule
             for (const schedule of schedules) {
                const teacher_name = await Teacher.find({_id: schedule.teacherID}).select('Name').exec();
                // Giả sử rằng bạn đã populate thông tin giáo viên, ví dụ: schedule.teacherID.Name
                worksheet.addRow({
                    teacher: teacher_name ? teacher_name : '',
                    // Các trường khác từ schedule...

                    T2_M1: schedule.T2_M1,
                    T2_M2: schedule.T2_M2,
                    T2_M3: schedule.T2_M3,
                    T2_M4: schedule.T2_M4,
                    T2_M5: schedule.T2_M5,
                    T2_A1: schedule.T2_A1,
                    T2_A2: schedule.T2_A2,
                    T2_A3: schedule.T2_A3,
                    T2_A4: schedule.T2_A4,
                    T2_A5: schedule.T2_A5,

                    T3_M1: schedule.T3_M1,
                    T3_M2: schedule.T3_M2,
                    T3_M3: schedule.T3_M3,
                    T3_M4: schedule.T3_M4,
                    T3_M5: schedule.T3_M5,
                    T3_A1: schedule.T3_A1,
                    T3_A2: schedule.T3_A2,
                    T3_A3: schedule.T3_A3,
                    T3_A4: schedule.T3_A4,
                    T3_A5: schedule.T3_A5,

                    T4_M1: schedule.T4_M1,
                    T4_M2: schedule.T4_M2,
                    T4_M3: schedule.T4_M3,
                    T4_M4: schedule.T4_M4,
                    T4_M5: schedule.T4_M5,
                    T4_A1: schedule.T4_A1,
                    T4_A2: schedule.T4_A2,
                    T4_A3: schedule.T4_A3,
                    T4_A4: schedule.T4_A4,
                    T4_A5: schedule.T4_A5,

                    T5_M1: schedule.T5_M1,
                    T5_M2: schedule.T5_M2,
                    T5_M3: schedule.T5_M3,
                    T5_M4: schedule.T5_M4,
                    T5_M5: schedule.T5_M5,
                    T5_A1: schedule.T5_A1,
                    T5_A2: schedule.T5_A2,
                    T5_A3: schedule.T5_A3,
                    T5_A4: schedule.T5_A4,
                    T5_A5: schedule.T5_A5,

                    T6_M1: schedule.T6_M1,
                    T6_M2: schedule.T6_M2,
                    T6_M3: schedule.T6_M3,
                    T6_M4: schedule.T6_M4,
                    T6_M5: schedule.T6_M5,
                    T6_A1: schedule.T6_A1,
                    T6_A2: schedule.T6_A2,
                    T6_A3: schedule.T6_A3,
                    T6_A4: schedule.T6_A4,
                    T6_A5: schedule.T6_A5,

                    T7_M1: schedule.T7_M1,
                    T7_M2: schedule.T7_M2,
                    T7_M3: schedule.T7_M3,
                    T7_M4: schedule.T7_M4,
                    T7_M5: schedule.T7_M5,
                    T7_A1: schedule.T7_A1,
                    T7_A2: schedule.T7_A2,
                    T7_A3: schedule.T7_A3,
                    T7_A4: schedule.T7_A4,
                    T7_A5: schedule.T7_A5,
                });
            }
            /* schedules.forEach(schedule => {
                const teacher_name = Teacher.find({_id: schedule.teacherID}).select('Name').exec();
                worksheet.addRow({
                    teacher: teacher_name,
                    
                    // ... thêm tất cả các trường từ mô hình Schedule của bạn
                });
            }); */
    
            // Ghi file và gửi về client
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename="schedule.xlsx"');
    
            await workbook.xlsx.write(res);
            res.end();
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Error exporting to Excel');
        }
    }

    async index_teacher(req, res) {
        try {

            

            const teachersWithoutSchedule = await Teacher.find({ scheduleID: { $eq: null } });

            // Lấy tất cả tên lớp học
            const classes = await Class.find({});
            const classNames = classes.map(cls => cls.Name);

            // Lặp qua mỗi giáo viên và tạo lịch ngẫu nhiên
            for (const teacher of teachersWithoutSchedule) {
            // Tạo danh sách các khóa học ngẫu nhiên không trùng lặp
            const randomClassNames = [];
            while (randomClassNames.length < 8) {
                const randomClass = classNames[Math.floor(Math.random() * classNames.length)];
                if (!randomClassNames.includes(randomClass)) {
                randomClassNames.push(randomClass);
                }
            }

            // Chọn ngẫu nhiên 8 trường để gán các lớp đã chọn
            const scheduleFields = Object.keys(Schedule.schema.paths)
                .filter(key => key.startsWith('T') && key !== 'teacherID' && key !== 'subjectID')
                .sort(() => 0.5 - Math.random())
                .slice(0, 8);

            const newScheduleData = { teacherID: teacher._id, subjectID: teacher.subjectID };
            scheduleFields.forEach((field, index) => {
                newScheduleData[field] = randomClassNames[index];
            });

            // Tạo và lưu lịch mới
            const newSchedule = new Schedule(newScheduleData);
            await newSchedule.save();

            // Cập nhật giáo viên với ID lịch mới
            teacher.scheduleID = newSchedule._id;
            await teacher.save();
            }

            const listteacher = await Teacher.find({}).select('Name').lean();
            const teacher = await Teacher.find({})
            .select('Name subjectID scheduleID'); // Chọn các trường dữ liệu cần hiển thị
            // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
            //console.log(accounts);
            const teachersWithSchedule = await Promise.all(teacher.map(async (teacherItem) => {
            // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
            
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

        res.render('scheduleview_teacher', {teacher: teachersWithSchedule, listteacher: listteacher});
        } catch (error) {
            console.error(error);
            res.status(500).send('Error: '+error);
        }
    }
    

    async scheduleFilter_teacher (req, res) {
        try {
          const teacherId = req.params.teacherId;

         console.log('TeacherID: '+ teacherId);
         const listteacher = await Teacher.find({}).select('Name').lean();
          
          const teacher = await Teacher.find({_id: teacherId})
            .select('Name subjectID scheduleID'); // Chọn các trường dữ liệu cần hiển thị
            // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
            //console.log(accounts);
            const teachersWithSchedule = await Promise.all(teacher.map(async (teacherItem) => {
            // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
            
            
        
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
            })); // Gửi lịch giảng dạy dưới dạng JSON
            res.render('scheduleview_teacher', {teacher: teachersWithSchedule,listteacher: listteacher});
        } catch (error) {
          res.status(500).send(error);
        }
    }

    async post_edit(req,res) {
        try {
            const updates = req.body; // This is an array of objects containing schedule data and IDs
            console.log('Received update data:', updates); // Log to see what is received
        
            // Create an array of update promises
            const updatePromises = updates.map(data => {
              const { scheduleID, ...updateFields } = data;
              // Log to check if IDs and update fields are correct
              console.log(`Updating schedule ${scheduleID} with `, updateFields);
              return Schedule.findByIdAndUpdate(scheduleID, updateFields, { new: true });
            });
        
            // Await all the update promises to resolve
            const updatedSchedules = await Promise.all(updatePromises);
            console.log('Updated schedules:', updatedSchedules); // Log the updated schedules
        
            // If everything goes well, send back the updated schedules
            res.json({ success: true, updatedSchedules });
          } catch (error) {
            console.error('Failed to update schedules:', error); // Log the error
            res.status(500).json({ success: false, error: error.message });
          }
    }
    
    async editSchedule(req, res) {
        try {
  
           const listteacher = await Teacher.find({}).select('Name').lean();
           const listclass = await Class.find({}).select('Name').lean();
            
           const teacher = await Teacher.find({})
              .select('Name subjectID scheduleID'); // Chọn các trường dữ liệu cần hiển thị
              // Duyệt qua mỗi lớp để thêm thông tin giáo viên vào dữ liệu trả về
              //console.log(accounts);
              const teachersWithSchedule = await Promise.all(teacher.map(async (teacherItem) => {
              // Lấy thông tin giáo viên từ bảng Teacher dựa trên teacherID
              
              
          
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
              })); // Gửi lịch giảng dạy dưới dạng JSON
              res.render('schedule_edit', {teacher: teachersWithSchedule,listteacher: listteacher, listclass: listclass});
          } catch (error) {
            res.status(500).send(error);
          }
    }
}

module.exports = new ScheduleController;