const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  teacherID: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  subjectID: { type: Schema.Types.ObjectId, ref: 'Subject' },
  T2_M1: String,
  T2_M2: String,
  T2_M3: String,
  T2_M4: String,
  T2_M5: String,

  T2_A1: String,
  T2_A2: String,
  T2_A3: String,
  T2_A4: String,
  T2_A5: String,

  T3_M1: String,
  T3_M2: String,
  T3_M3: String,
  T3_M4: String,
  T3_M5: String,

  T3_A1: String,
  T3_A2: String,
  T3_A3: String,
  T3_A4: String,
  T3_A5: String,

  T4_M1: String,
  T4_M2: String,
  T4_M3: String,
  T4_M4: String,
  T4_M5: String,

  T4_A1: String,
  T4_A2: String,
  T4_A3: String,
  T4_A4: String,
  T4_A5: String,

  T5_M1: String,
  T5_M2: String,
  T5_M3: String,
  T5_M4: String,
  T5_M5: String,
  
  T5_A1: String,
  T5_A2: String,
  T5_A3: String,
  T5_A4: String,
  T5_A5: String,

  T6_M1: String,
  T6_M2: String,
  T6_M3: String,
  T6_M4: String,
  T6_M5: String,
  
  T6_A1: String,
  T6_A2: String,
  T6_A3: String,
  T6_A4: String,
  T6_A5: String,

  T7_M1: String,
  T7_M2: String,
  T7_M3: String,
  T7_M4: String,
  T7_M5: String,
  
  T7_A1: String,
  T7_A2: String,
  T7_A3: String,
  T7_A4: String,
  T7_A5: String,

  T4_M1: String,
  T4_M2: String,
  T4_M3: String,
  T4_M4: String,
  T4_M5: String,
  
  T4_A1: String,
  T4_A2: String,
  T4_A3: String,
  T4_A4: String,
  T4_A5: String,
  
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
