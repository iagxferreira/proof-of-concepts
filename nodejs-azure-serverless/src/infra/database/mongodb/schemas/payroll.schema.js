const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * Payroll representation schema
 */
const payrollSchema = new Schema({
  name: String,
  document: String,
  document_type: String,
  created_at: { type: Date, default: Date.now },
  deleted: Boolean,
});

module.exports = mongoose.model("Payroll", payrollSchema);
