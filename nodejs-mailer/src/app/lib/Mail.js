import config from "../config/mail";
import nodemailer from "nodemailer";

export default nodemailer.createTransport(config);
