/* eslint-disable
   camelcase
*/
require("dotenv");
const mongoose = require("mongoose");
const Payroll = require("../infra/database/mongodb/schemas/payroll.schema");

async function deletePayroll(context, req) {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    context.log(req.params);
    const { id: _id } = req.params;
    const body = await Payroll.updateOne({ _id }, { deleted: true });

    context.res = {
      status: 200,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    };
    context.done();
  } catch (error) {
    context.log(error);
    const BAD_REQUEST_ERROR = 400;
    context.res = { status: BAD_REQUEST_ERROR, body: { error } };
  }
}

module.exports = { deletePayroll };
