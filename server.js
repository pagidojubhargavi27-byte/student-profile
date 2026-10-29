const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = 3000;

const student = {
  id: "25P61A05P9",
  name: "Pagidoju.Bhargavi",
  course: "B.Tech - CSE",
  year: "2nd Year",
  college: "VBIT",
  department: "Computer Science & Engineering",
  skills: ["C", "Java", "Python", "Node.js"]
};

app.get("/", (req, res) => {
  res.send(`
    <h1>CSE Student Profile</h1>
    <p>Welcome to my student profile!</p>
    <a href="/student">View My Profile</a>
    <br><br>
    <a href="/qr">Generate My QR Code</a>
  `);
});

app.get("/student", (req, res) => {
  res.send(`
    <h1>${student.name}</h1>
    <p><b>Student ID:</b> ${student.id}</p>
    <p><b>Course:</b> ${student.course}</p>
    <p><b>Year:</b> ${student.year}</p>
    <p><b>College:</b> ${student.college}</p>
    <p><b>Department:</b> ${student.department}</p>
    <p><b>Skills:</b> ${student.skills.join(", ")}</p>
  `);
});

app.get("/qr", async (req, res) => {
const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;
const profileURL = `${baseURL}/student`;
  const qrImage = await QRCode.toDataURL(profileURL);

  res.send(`
    <h1>My Student QR Code</h1>
    <img src="${qrImage}" alt="Student QR Code">
  `);
});

const HOST = "0.0.0.0";

app.listen(process.env.PORT || PORT, HOST, () => {
  console.log("Student profile website is running!");
});