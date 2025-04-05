import nodemailer from "nodemailer";
import Project from "../models/Project.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (data, type = "contact") => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      `Email credentials missing: EMAIL_USER=${
        process.env.EMAIL_USER
      }, EMAIL_PASS=${process.env.EMAIL_PASS ? "[SET]" : "undefined"}`
    );
  }

  let projectTitle = "";
  if (type === "enquiry" && data.projectId) {
    try {
      const project = await Project.findById(data.projectId);
      projectTitle = project ? project.title : "Unknown Project";
    } catch (error) {
      console.error("Error fetching project title:", error);
      projectTitle = "Unknown Project";
    }
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject:
      type === "enquiry"
        ? "Your Enquiry Submission"
        : "Your Contact Submission",
    html: `
      <h2>Thank You, ${data.name}!</h2>
      <p>We have received your ${
        type === "enquiry" ? "enquiry" : "contact message"
      }.</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.number}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      ${
        type === "enquiry"
          ? `<p><strong>Project:</strong> ${projectTitle}</p>`
          : ""
      }
      <p>We will get back to you soon!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
