/* eslint-disable
   camelcase
*/
require("dotenv");
const mongoose = require("mongoose");
const Payroll = require("../infra/database/mongodb/schemas/payroll.schema");

async function updatePayroll(context, req) {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    context.log(req.params);
    const { id } = req.params;
    const { name, document, document_type } = req.body;
    const body = await Payroll.findOneAndUpdate(
      { _id: id },
      { name, document, document_type },
    );

    context.res = {
      status: 201,
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

module.exports = { updatePayroll };
