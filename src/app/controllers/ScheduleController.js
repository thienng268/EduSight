const xlsx = require('xlsx');
class ScheduleController
{

    index(req, res) {
        res.render('schedulecreate');
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
    hamxuly2(req,res){
        
    }
    hamxuly3(req,res){
        
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