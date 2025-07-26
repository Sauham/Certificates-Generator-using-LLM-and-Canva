const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

const GEMINI_API_KEY = 'YOUR GEMINI KEY';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

app.post('/api/generate', async (req, res) => {
  console.log('🎓 Certificate generation request:', req.body);
  
  const category = req.body.category || 'Certificate of Completion';
  const recipientName = req.body.recipientName || '[Recipient Name]';
  const startDate = req.body.startDate || 'Start Date';
  const endDate = req.body.endDate || 'End Date';
  const duration = req.body.duration || 'Duration';
  const durationMonths = req.body.durationMonths || 0;

  // Five professional certificate designs with date and duration integration
  const professionalDesigns = [
    {
      designName: "🏆 Elegant Professional Certificate",
      canvasjsCode: `
// Create and setup canvas
var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
canvas.style.width = '100%';
canvas.style.maxWidth = '800px';
canvas.style.height = 'auto';
canvas.style.border = '2px solid #ddd';
canvas.style.borderRadius = '10px';
canvas.style.display = 'block';
canvas.style.margin = '0 auto';

// Clear container and add canvas
var container = document.getElementById(containerId);
container.innerHTML = '';
container.appendChild(canvas);

var ctx = canvas.getContext('2d');

// Background gradient
var gradient = ctx.createLinearGradient(0, 0, 800, 600);
gradient.addColorStop(0, '#f8f9fa');
gradient.addColorStop(1, '#e9ecef');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 800, 600);

// Decorative border
ctx.strokeStyle = '#2c3e50';
ctx.lineWidth = 8;
ctx.strokeRect(30, 30, 740, 540);

// Inner border
ctx.strokeStyle = '#34495e';
ctx.lineWidth = 3;
ctx.strokeRect(45, 45, 710, 510);

// Title background
ctx.fillStyle = '#2c3e50';
ctx.fillRect(100, 80, 600, 60);

// Title
ctx.fillStyle = 'white';
ctx.font = 'bold 32px Georgia';
ctx.textAlign = 'center';
ctx.fillText('CERTIFICATE OF COMPLETION', 400, 120);

// Category
ctx.fillStyle = '#3498db';
ctx.font = 'bold 22px Arial';
ctx.fillText('${category}', 400, 170);

// Duration badge
ctx.fillStyle = '#e74c3c';
ctx.fillRect(250, 185, 300, 30);
ctx.fillStyle = 'white';
ctx.font = 'bold 16px Arial';
ctx.fillText('Duration: ${duration}', 400, 205);

// Decorative line
ctx.strokeStyle = '#3498db';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(200, 230);
ctx.lineTo(600, 230);
ctx.stroke();

// Main text
ctx.fillStyle = '#2c3e50';
ctx.font = '18px Georgia';
ctx.fillText('This is to certify that', 400, 270);

// Recipient name
ctx.fillStyle = '#e74c3c';
ctx.font = 'bold 28px Cursive';
ctx.fillText('${recipientName}', 400, 310);

// Achievement text
ctx.fillStyle = '#2c3e50';
ctx.font = '16px Georgia';
ctx.fillText('has successfully completed the ${durationMonths}-month program', 400, 350);
ctx.fillText('${category}', 400, 375);
ctx.fillText('and is hereby awarded this certificate of completion', 400, 400);

// Completion date
ctx.font = 'bold 14px Arial';
ctx.fillText('Completed on: ${endDate}', 400, 440);

// Date and signature
ctx.font = '14px Arial';
ctx.textAlign = 'left';
ctx.fillText('Course Period: ${startDate} to ${endDate}', 60, 500);
ctx.textAlign = 'right';
ctx.fillText('Authorized Signature: ________________', 740, 500);

// Official seal
ctx.textAlign = 'center';
ctx.beginPath();
ctx.arc(650, 450, 35, 0, 2 * Math.PI);
ctx.fillStyle = '#e74c3c';
ctx.fill();
ctx.strokeStyle = '#c0392b';
ctx.lineWidth = 3;
ctx.stroke();

ctx.fillStyle = 'white';
ctx.font = 'bold 10px Arial';
ctx.fillText('CERTIFIED', 650, 445);
ctx.fillText('${endDate.split(' ')[2]}', 650, 458);
      `
    },
    
    {
      designName: "🎨 Modern Minimalist Certificate",
      canvasjsCode: `
var certificateHTML = \`
<div style="
  width: 100%; 
  max-width: 800px; 
  height: 520px; 
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
  position: relative; 
  font-family: 'Helvetica Neue', Arial, sans-serif; 
  color: white; 
  margin: 0 auto;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
">
  <div style="
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #ffd700, #ffed4a, #ffd700);
  "></div>
  
  <div style="
    padding: 40px; 
    height: 100%; 
    box-sizing: border-box; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    text-align: center;
  ">
    
    <h1 style="
      font-size: 32px; 
      margin: 0; 
      font-weight: 300; 
      letter-spacing: 3px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    ">CERTIFICATE</h1>
    
    <div style="
      width: 80px; 
      height: 2px; 
      background: white; 
      margin: 15px 0;
      opacity: 0.8;
    "></div>
    
    <h2 style="
      font-size: 18px; 
      margin: 10px 0; 
      font-weight: 400;
      background: rgba(255,255,255,0.2);
      padding: 8px 25px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    ">${category}</h2>

    <div style="
      background: rgba(255,255,255,0.15);
      padding: 8px 20px;
      border-radius: 15px;
      margin: 10px 0;
      font-size: 14px;
      font-weight: 500;
    ">📅 ${duration} • Completed: ${endDate}</div>
    
    <p style="
      font-size: 15px; 
      margin: 20px 0 10px 0;
      opacity: 0.9;
    ">This certificate is proudly presented to</p>
    
    <div style="
      background: rgba(255,255,255,0.25);
      padding: 12px 25px;
      border-radius: 10px;
      margin: 10px 0;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.3);
    ">
      <h3 style="
        font-size: 22px; 
        margin: 0;
        font-weight: 500;
        color: #fff;
      ">${recipientName}</h3>
    </div>
    
    <p style="
      font-size: 14px; 
      line-height: 1.6; 
      margin: 15px 0; 
      max-width: 450px;
      opacity: 0.9;
    ">
      for successful completion of the ${durationMonths}-month <strong>${category}</strong> program, 
      demonstrating excellence and commitment from ${startDate} to ${endDate}.
    </p>
    
    <div style="
      display: flex; 
      justify-content: space-between; 
      width: 100%; 
      margin-top: 25px;
      max-width: 400px;
    ">
      <div style="text-align: center;">
        <div style="
          border-bottom: 1px solid rgba(255,255,255,0.6); 
          width: 120px; 
          margin-bottom: 5px;
        "></div>
        <small style="opacity: 0.7; font-size: 11px;">Issue Date</small>
      </div>
      <div style="text-align: center;">
        <div style="
          border-bottom: 1px solid rgba(255,255,255,0.6); 
          width: 120px; 
          margin-bottom: 5px;
        "></div>
        <small style="opacity: 0.7; font-size: 11px;">Authorized Signature</small>
      </div>
    </div>
    
  </div>
</div>
\`;

document.getElementById(containerId).innerHTML = certificateHTML;
      `
    },

    {
      designName: "📜 Classic Ornate Certificate",
      canvasjsCode: `
// Create and setup canvas
var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
canvas.style.width = '100%';
canvas.style.maxWidth = '800px';
canvas.style.height = 'auto';
canvas.style.border = '3px solid #8b4513';
canvas.style.borderRadius = '10px';
canvas.style.display = 'block';
canvas.style.margin = '0 auto';

// Clear container and add canvas
var container = document.getElementById(containerId);
container.innerHTML = '';
container.appendChild(canvas);

var ctx = canvas.getContext('2d');

// Parchment background
ctx.fillStyle = '#fdf6e3';
ctx.fillRect(0, 0, 800, 600);

// Vintage texture overlay
var textureGradient = ctx.createRadialGradient(400, 300, 0, 400, 300, 400);
textureGradient.addColorStop(0, 'rgba(139, 69, 19, 0.05)');
textureGradient.addColorStop(1, 'rgba(139, 69, 19, 0.15)');
ctx.fillStyle = textureGradient;
ctx.fillRect(0, 0, 800, 600);

// Ornate border
ctx.strokeStyle = '#8b4513';
ctx.lineWidth = 8;
ctx.strokeRect(25, 25, 750, 550);

// Inner decorative border
ctx.strokeStyle = '#cd853f';
ctx.lineWidth = 4;
ctx.strokeRect(40, 40, 720, 520);

// Corner ornaments
ctx.fillStyle = '#8b4513';
var corners = [{x:60, y:60}, {x:740, y:60}, {x:60, y:540}, {x:740, y:540}];
corners.forEach(function(corner) {
  ctx.beginPath();
  ctx.arc(corner.x, corner.y, 15, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.fillStyle = '#daa520';
  ctx.beginPath();
  ctx.arc(corner.x, corner.y, 8, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = '#8b4513';
});

// Title
ctx.fillStyle = '#8b4513';
ctx.font = 'bold 32px Times';
ctx.textAlign = 'center';
ctx.fillText('Certificate of Excellence', 400, 110);

// Decorative flourish under title
ctx.strokeStyle = '#daa520';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(150, 130);
ctx.quadraticCurveTo(400, 150, 650, 130);
ctx.stroke();

// Category and duration
ctx.fillStyle = '#a0522d';
ctx.font = 'italic 20px Times';
ctx.fillText('${category}', 400, 165);
ctx.font = '16px Times';
ctx.fillText('${duration} Program', 400, 185);

// Main text
ctx.fillStyle = '#654321';
ctx.font = '16px Times';
ctx.fillText('This is to certify that', 400, 220);

// Recipient name with ornate styling
ctx.fillStyle = '#8b4513';
ctx.font = 'bold 24px Times';
ctx.fillText('${recipientName}', 400, 255);

// Achievement text
ctx.font = '14px Times';
ctx.fillStyle = '#654321';
ctx.fillText('has demonstrated exceptional proficiency and dedication', 400, 290);
ctx.fillText('throughout the ${durationMonths}-month course in ${category}', 400, 310);
ctx.fillText('conducted from ${startDate} to ${endDate}', 400, 330);
ctx.fillText('and is hereby recognized with this certificate of excellence', 400, 350);

// Completion details
ctx.font = 'bold 14px Times';
ctx.fillText('Successfully completed on ${endDate}', 400, 390);

// Date line
ctx.font = '12px Times';
ctx.fillText('Course Duration: ${startDate} to ${endDate}', 400, 420);

// Official seal
ctx.beginPath();
ctx.arc(150, 480, 45, 0, 2 * Math.PI);
ctx.fillStyle = '#8b4513';
ctx.fill();

ctx.beginPath();
ctx.arc(150, 480, 35, 0, 2 * Math.PI);
ctx.fillStyle = '#daa520';
ctx.fill();

ctx.beginPath();
ctx.arc(150, 480, 25, 0, 2 * Math.PI);
ctx.fillStyle = '#8b4513';
ctx.fill();

ctx.fillStyle = '#fdf6e3';
ctx.font = 'bold 9px Arial';
ctx.fillText('OFFICIAL', 150, 475);
ctx.fillText('COMPLETION', 150, 485);

// Signature line
ctx.strokeStyle = '#8b4513';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(500, 500);
ctx.lineTo(700, 500);
ctx.stroke();

ctx.fillStyle = '#654321';
ctx.font = '11px Times';
ctx.textAlign = 'left';
ctx.fillText('Authorized Signature', 550, 520);
      `
    },

    {
      designName: "🌟 Contemporary Award Certificate",
      canvasjsCode: `
var certificateHTML = \`
<div style="
  width: 100%; 
  max-width: 800px; 
  height: 620px; 
  background: linear-gradient(45deg, #1e3c72 0%, #2a5298 100%);
  position: relative; 
  font-family: 'Arial', sans-serif; 
  color: white; 
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
  overflow: hidden;
">
  <!-- Decorative geometric shapes -->
  <div style="
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    border-radius: 50%;
  "></div>
  
  <div style="
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 150px;
    height: 150px;
    background: linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
    border-radius: 50%;
  "></div>
  
  <div style="
    position: relative;
    z-index: 10;
    padding: 50px; 
    height: 100%; 
    box-sizing: border-box; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    text-align: center;
  ">
    
    <!-- Award icon -->
    <div style="
      width: 70px;
      height: 70px;
      background: linear-gradient(45deg, #ffd700, #ffed4a);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      font-size: 30px;
    ">🏆</div>
    
    <h1 style="
      font-size: 28px; 
      margin: 0; 
      font-weight: bold; 
      letter-spacing: 2px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      margin-bottom: 8px;
    ">CERTIFICATE OF ACHIEVEMENT</h1>
    
    <div style="
      width: 80px; 
      height: 3px; 
      background: linear-gradient(90deg, #ffd700, #ffed4a, #ffd700); 
      margin: 10px 0;
      border-radius: 2px;
    "></div>
    
    <h2 style="
      font-size: 18px; 
      margin: 10px 0; 
      font-weight: 300;
      background: rgba(255,255,255,0.15);
      padding: 8px 30px;
      border-radius: 25px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
    ">${category}</h2>

    <!-- Duration and completion info -->
    <div style="
      display: flex;
      gap: 20px;
      margin: 15px 0;
      flex-wrap: wrap;
      justify-content: center;
    ">
      <div style="
        background: rgba(255,255,255,0.1);
        padding: 8px 15px;
        border-radius: 15px;
        font-size: 12px;
        backdrop-filter: blur(5px);
      ">📅 Duration: ${duration}</div>
      <div style="
        background: rgba(255,255,255,0.1);
        padding: 8px 15px;
        border-radius: 15px;
        font-size: 12px;
        backdrop-filter: blur(5px);
      ">✅ Completed: ${endDate}</div>
    </div>
    
    <p style="
      font-size: 14px; 
      margin: 15px 0 10px 0;
      opacity: 0.9;
      font-weight: 300;
    ">This certificate is presented to</p>
    
    <div style="
      background: rgba(255,255,255,0.2); 
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 15px;
      padding: 12px 30px; 
      margin: 10px 0;
      backdrop-filter: blur(10px);
    ">
      <h3 style="
        font-size: 22px; 
        margin: 0;
        font-weight: 600;
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      ">${recipientName}</h3>
    </div>
    
    <p style="
      font-size: 13px; 
      line-height: 1.6; 
      margin: 15px 0; 
      max-width: 480px;
      opacity: 0.95;
      font-weight: 300;
    ">
      In recognition of outstanding performance and successful completion 
      of the ${durationMonths}-month <strong>${category}</strong> program 
      (${startDate} to ${endDate}). This achievement demonstrates 
      commitment to excellence and professional development.
    </p>
    
    <div style="
      display: flex; 
      justify-content: space-between; 
      width: 100%; 
      margin-top: 25px;
      max-width: 400px;
    ">
      <div style="text-align: center;">
        <div style="
          border-bottom: 2px solid rgba(255,255,255,0.6); 
          width: 120px; 
          margin-bottom: 8px;
        "></div>
        <small style="opacity: 0.8; font-size: 11px;">Certificate Date</small>
      </div>
      <div style="text-align: center;">
        <div style="
          border-bottom: 2px solid rgba(255,255,255,0.6); 
          width: 120px; 
          margin-bottom: 8px;
        "></div>
        <small style="opacity: 0.8; font-size: 11px;">Digital Signature</small>
      </div>
    </div>
    
  </div>
</div>
\`;

document.getElementById(containerId).innerHTML = certificateHTML;
      `
    },

    {
      designName: "🎖️ Premium Corporate Certificate",
      canvasjsCode: `
// Create and setup canvas
var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
canvas.style.width = '100%';
canvas.style.maxWidth = '800px';
canvas.style.height = 'auto';
canvas.style.border = '2px solid #333';
canvas.style.borderRadius = '10px';
canvas.style.display = 'block';
canvas.style.margin = '0 auto';

// Clear container and add canvas
var container = document.getElementById(containerId);
container.innerHTML = '';
container.appendChild(canvas);

var ctx = canvas.getContext('2d');

// Premium background with subtle pattern
var bgGradient = ctx.createLinearGradient(0, 0, 800, 600);
bgGradient.addColorStop(0, '#2c3e50');
bgGradient.addColorStop(0.5, '#34495e');
bgGradient.addColorStop(1, '#2c3e50');
ctx.fillStyle = bgGradient;
ctx.fillRect(0, 0, 800, 600);

// Add diamond pattern overlay
ctx.fillStyle = 'rgba(255,255,255,0.03)';
for(var x = 0; x < 800; x += 40) {
  for(var y = 0; y < 600; y += 40) {
    ctx.fillRect(x, y, 2, 2);
  }
}

// Main content area
ctx.fillStyle = 'white';
ctx.fillRect(60, 60, 680, 480);

// Header section
var headerGradient = ctx.createLinearGradient(60, 60, 60, 160);
headerGradient.addColorStop(0, '#3498db');
headerGradient.addColorStop(1, '#2980b9');
ctx.fillStyle = headerGradient;
ctx.fillRect(60, 60, 680, 100);

// Title
ctx.fillStyle = 'white';
ctx.font = 'bold 26px Arial';
ctx.textAlign = 'center';
ctx.fillText('PROFESSIONAL CERTIFICATE', 400, 95);
ctx.font = '14px Arial';
ctx.fillText('OF SUCCESSFUL COMPLETION', 400, 115);

// Category and duration section
ctx.fillStyle = '#e74c3c';
ctx.fillRect(200, 180, 400, 35);
ctx.fillStyle = 'white';
ctx.font = 'bold 16px Arial';
ctx.fillText('${category}', 400, 202);

// Duration info
ctx.fillStyle = '#27ae60';
ctx.fillRect(250, 220, 300, 25);
ctx.fillStyle = 'white';
ctx.font = 'bold 14px Arial';
ctx.fillText('${duration} • ${durationMonths} Month Program', 400, 237);

// Main certification text
ctx.fillStyle = '#2c3e50';
ctx.font = '15px Arial';
ctx.fillText('This certificate confirms that', 400, 275);

// Recipient name with highlight
ctx.fillStyle = '#ecf0f1';
ctx.fillRect(200, 290, 400, 45);
ctx.strokeStyle = '#3498db';
ctx.lineWidth = 2;
ctx.strokeRect(200, 290, 400, 45);

ctx.fillStyle = '#2c3e50';
ctx.font = 'bold 22px Arial';
ctx.fillText('${recipientName}', 400, 318);

// Achievement description
ctx.font = '13px Arial';
ctx.fillText('has successfully completed all required coursework and', 400, 355);
ctx.fillText('demonstrated proficiency in ${category}', 400, 375);
ctx.fillText('during the period from ${startDate} to ${endDate}', 400, 395);
ctx.fillText('meeting all standards for professional certification', 400, 415);

// Completion date highlight
ctx.fillStyle = '#f39c12';
ctx.fillRect(250, 435, 300, 25);
ctx.fillStyle = 'white';
ctx.font = 'bold 12px Arial';
ctx.fillText('Completed on: ${endDate}', 400, 452);

// Footer with signature
ctx.strokeStyle = '#bdc3c7';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(500, 490);
ctx.lineTo(680, 490);
ctx.stroke();

ctx.fillStyle = '#2c3e50';
ctx.font = '11px Arial';
ctx.textAlign = 'right';
ctx.fillText('Authorized Signature', 640, 510);

// Corporate seal with date
ctx.beginPath();
ctx.arc(150, 470, 35, 0, 2 * Math.PI);
ctx.fillStyle = '#f39c12';
ctx.fill();
ctx.strokeStyle = '#e67e22';
ctx.lineWidth = 3;
ctx.stroke();

ctx.fillStyle = 'white';
ctx.font = 'bold 9px Arial';
ctx.textAlign = 'center';
ctx.fillText('VERIFIED', 150, 465);
ctx.fillText('${endDate.split(' ')[2]}', 150, 478);

// Reset text alignment
ctx.textAlign = 'center';
      `
    }
  ];

  try {
    console.log('✅ Returning 5 professional certificates with dates and duration');
    res.json({ designs: professionalDesigns });
    
  } catch (err) {
    console.error('❌ API Error:', err);
    res.status(500).json({ 
      error: 'Error generating certificates',
      designs: professionalDesigns
    });
  }
});

app.listen(5000, () => {
  console.log('🚀 Certificate Generator Server started at http://localhost:5000');
  console.log('📁 Serving static files from frontend directory');
  console.log('🎓 Ready to generate 5 professional certificates with dates and duration!');
});
