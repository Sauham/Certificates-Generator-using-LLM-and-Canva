# 🎓 AI Certificate Generator using Canvas.js and LLM

> Generate professional certificates with AI-powered design using Canvas.js, HTML5 Canvas, and Google Gemini API


## 📋 Problem Statement

**Problem 2: Generate Certificates using Canvas.js and LLM/OpenAI API**

🎯 **Task:** Generate certificates for a given category name using Canvas.js, powered by LLMs or OpenAI API.

📥 **Input:**
- 🔹 A category name (e.g., "Summer Code Camp Certificate", "AI for Farmers")
- 🔹 Recipient name
- 🔹 Course start and end dates
- 🔹 Use backgrounds and assets from third-party sources (Pixabay, Icon Finder, SVG Repo, etc.)

📤 **Output:**
- 🔹 Generate five certificate designs
- 🔹 Render on the webpage using Canvas.js
- 🔹 Show corresponding Canvas.js code below each
- 🔹 Include completion dates and course duration

## ✨ Features

- 🤖 **AI-Powered Generation**: Uses Google Gemini API for intelligent certificate design
- 🎨 **5 Professional Templates**: Elegant, Modern, Classic, Contemporary, and Corporate designs
- 📅 **Date Integration**: Start/end date selection with automatic duration calculation
- 🖼️ **Canvas.js Rendering**: Real-time certificate rendering using HTML5 Canvas and CSS
- 📋 **Code Export**: Copy-paste ready Canvas.js code for each design
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⏱️ **Duration Calculation**: Automatic course duration in months and days
- 🎯 **Professional Output**: Print-ready certificate designs

## 🚀 Demo

![Certificate Generator Demo](https://via.placeholder.com/800x400/667eea/white?text=Certificate+Generator+Demo)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gemini API
- **Canvas**: HTML5 Canvas API
- **Styling**: CSS3 with Gradients and Animations
- **Date Handling**: JavaScript Date API

## 📁 Project Structure

```
certificate-generator/
├── backend/
│   └── server.js              # Express server with API endpoints
├── frontend/
│   ├── index.html            # Main HTML interface
│   └── script.js             # Frontend JavaScript logic
├── package.json              # Node.js dependencies
├── package-lock.json         # Dependency lock file
└── README.md                 # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (comes with Node.js)
- Google Gemini API key

### 1. Clone the Repository

```
git clone https://github.com/Sauham/Certificates-Generator-using-LLM-and-Canva.git
cd Certificates-Generator-using-LLM-and-Canva
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure API Key

Open `backend/server.js` and replace the API key:

```
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
```

### 4. Start the Server

```
node backend/server.js
```

### 5. Open in Browser

Navigate to: `http://localhost:5000`

## 🎯 Usage

### Basic Usage

1. **Enter Certificate Details**:
   - Certificate Category (e.g., "AI for Farmers", "Web Development Bootcamp")
   - Your Name
   - Course Start Date
   - Course End Date

2. **Generate Certificates**:
   - Click "Generate 5 Certificate Designs"
   - Wait for AI to generate professional designs

3. **View Results**:
   - Browse through 5 different certificate styles
   - Each certificate includes your name, dates, and duration
   - Copy the Canvas.js code for any design you like

### Certificate Types Generated

1. **🏆 Elegant Professional** - Classic formal design with borders and seals
2. **🎨 Modern Minimalist** - Contemporary gradient style with clean typography
3. **📜 Classic Ornate** - Traditional parchment design with decorative elements
4. **🌟 Contemporary Award** - Modern award-style with trophy icon
5. **🎖️ Premium Corporate** - Business professional template with verification seal

## 📊 API Endpoints

### `POST /api/generate`

Generate certificate designs based on input parameters.

**Request Body:**
```
{
  "category": "AI for Farmers",
  "recipientName": "John Doe",
  "startDate": "January 1, 2024",
  "endDate": "March 31, 2024",
  "duration": "3 months",
  "durationMonths": 3
}
```

**Response:**
```
{
  "designs": [
    {
      "designName": "🏆 Elegant Professional Certificate",
      "canvasjsCode": "// Canvas.js code here..."
    }
    // ... 4 more designs
  ]
}
```

### `GET /api/test`

Health check endpoint to verify server status.

## 🎨 Customization

### Adding New Certificate Templates

1. Open `backend/server.js`
2. Add a new design object to the `professionalDesigns` array:

```
{
  designName: "🆕 Your Custom Design",
  canvasjsCode: `
    // Your Canvas.js or HTML/CSS code here
    var canvas = document.createElement('canvas');
    // ... your design code
  `
}
```

### Modifying Existing Templates

Each certificate template includes:
- **Canvas-based designs**: Use HTML5 Canvas API for precise graphics
- **HTML/CSS designs**: Use modern CSS with gradients and animations
- **Dynamic content**: Template variables for name, category, dates, and duration

## 🔍 Code Examples

### Canvas-based Certificate (Professional Style)

```
// Create canvas element
var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;

// Get context and draw
var ctx = canvas.getContext('2d');

// Background gradient
var gradient = ctx.createLinearGradient(0, 0, 800, 600);
gradient.addColorStop(0, '#f8f9fa');
gradient.addColorStop(1, '#e9ecef');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 800, 600);

// Add title, name, and other elements...
```

### HTML/CSS Certificate (Modern Style)

```
var certificateHTML = `

  CERTIFICATE
  ${category}
  ${recipientName}
  

`;
```

## 🚀 Deployment

### Local Deployment

The application runs locally on `http://localhost:5000` by default.

### Production Deployment

For production deployment, consider:

1. **Environment Variables**: Store API keys securely
2. **HTTPS**: Enable SSL/TLS encryption
3. **Domain**: Configure custom domain
4. **Monitoring**: Add error tracking and analytics

Example environment setup:
```
export GEMINI_API_KEY="your-api-key"
export PORT=5000
export NODE_ENV=production
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sauham**
- GitHub: [@Sauham](https://github.com/Sauham)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/sauham-vyas)

## 🙏 Acknowledgments

- **Google Gemini API** for AI-powered content generation
- **Canvas.js Community** for excellent documentation and examples
- **Express.js Team** for the robust web framework
- **Open Source Community** for inspiration and resources

## 📞 Support

If you have any questions or need help with the project:

1. **GitHub Issues**: [Create an issue](https://github.com/Sauham/Certificates-Generator-using-LLM-and-Canva/issues)
2. **Email**: sauhamv28@gmail.com
3. **Discussion**: Use GitHub Discussions for general questions

## 🔗 Related Projects

- [CanvasJS Examples](https://canvasjs.com/javascript-charts/)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Certificate Design Inspiration](https://www.canva.com/certificates/)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by [Sauham](https://github.com/Sauham)
```

