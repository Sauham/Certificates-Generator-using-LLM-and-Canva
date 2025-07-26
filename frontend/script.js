// Calculate and display duration when dates change
function updateDuration() {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const durationDisplay = document.getElementById('duration-display');
  const durationText = document.getElementById('duration-text');

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end > start) {
      const months = calculateMonths(start, end);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      let durationString = '';
      if (months >= 1) {
        durationString = `${months} month${months > 1 ? 's' : ''}`;
        if (days % 30 > 0) {
          const extraDays = days % 30;
          durationString += ` and ${extraDays} day${extraDays > 1 ? 's' : ''}`;
        }
      } else {
        durationString = `${days} day${days > 1 ? 's' : ''}`;
      }
      
      durationText.textContent = durationString;
      durationDisplay.style.display = 'block';
    } else {
      durationDisplay.style.display = 'none';
    }
  } else {
    durationDisplay.style.display = 'none';
  }
}

function calculateMonths(start, end) {
  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();
  
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Add event listeners for date inputs
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('start-date').addEventListener('change', updateDuration);
  document.getElementById('end-date').addEventListener('change', updateDuration);
  
  // Set default dates (3 months course)
  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);
  
  document.getElementById('start-date').value = threeMonthsAgo.toISOString().split('T')[0];
  document.getElementById('end-date').value = today.toISOString().split('T')[0];
  
  updateDuration();
});

document.getElementById('generator-form').onsubmit = async function (e) {
  e.preventDefault();
  
  const category = document.getElementById('category').value.trim();
  const recipientName = document.getElementById('recipient-name').value.trim();
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const resultsDiv = document.getElementById('results');
  
  if (!category) {
    resultsDiv.innerHTML = '<div class="error">❌ Please enter a certificate category</div>';
    return;
  }

  if (!recipientName) {
    resultsDiv.innerHTML = '<div class="error">❌ Please enter your name</div>';
    return;
  }

  if (!startDate || !endDate) {
    resultsDiv.innerHTML = '<div class="error">❌ Please select both start and end dates</div>';
    return;
  }

  if (new Date(endDate) <= new Date(startDate)) {
    resultsDiv.innerHTML = '<div class="error">❌ End date must be after start date</div>';
    return;
  }
  
  // Calculate duration
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = calculateMonths(start, end);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  let duration = '';
  if (months >= 1) {
    duration = `${months} month${months > 1 ? 's' : ''}`;
    if (days % 30 > 0) {
      const extraDays = days % 30;
      duration += ` and ${extraDays} day${extraDays > 1 ? 's' : ''}`;
    }
  } else {
    duration = `${days} day${days > 1 ? 's' : ''}`;
  }
  
  // Show loading state
  resultsDiv.innerHTML = '<div class="loading">🔄 Generating 5 professional certificate designs...</div>';
  
  try {
    console.log('Sending request to API...');
    
    const res = await fetch('http://localhost:5000/api/generate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        category, 
        recipientName, 
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        duration,
        durationMonths: months
      })
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('API Response:', data);
    
    const designs = data.designs || [];
    
    if (designs.length === 0) {
      resultsDiv.innerHTML = '<div class="error">❌ No designs generated. Please try again.</div>';
      return;
    }
    
    let html = `<div class="success-message">✅ Successfully generated ${designs.length} certificate designs for ${recipientName}!<br>📅 Course Duration: ${duration} (${formatDate(startDate)} to ${formatDate(endDate)})</div>`;
    
    designs.forEach((design, idx) => {
      const chartId = 'chart' + idx;
      html += `
        <div class="design">
          <h2>🏆 ${design.designName || 'Certificate Design ' + (idx + 1)}</h2>
          <div class="certificate-container">
            <div id="${chartId}" style="width:100%; min-height:400px;"></div>
          </div>
          <div class="code-section">
            <h3>📋 Canvas.js Code:</h3>
            <textarea readonly id="code-${idx}">${design.canvasjsCode}</textarea>
            <button class="copy-btn" onclick="copyCode(${idx})">📋 Copy Code</button>
          </div>
        </div>
      `;
    });
    
    resultsDiv.innerHTML = html;
    
    // Render each certificate with delay to ensure DOM is ready
    setTimeout(() => {
      designs.forEach((design, idx) => {
        try {
          const chartContainer = 'chart' + idx;
          console.log(`Rendering certificate ${idx}:`, design.designName);
          
          if (design.canvasjsCode.includes('canvas.getContext') || design.canvasjsCode.includes('document.createElement(\'canvas\')')) {
            // Handle Canvas-based certificates
            renderCanvasCertificate(chartContainer, design.canvasjsCode);
          } else if (design.canvasjsCode.includes('innerHTML')) {
            // Handle HTML-based certificates
            renderHTMLCertificate(chartContainer, design.canvasjsCode);
          } else {
            // Handle other certificate types
            renderGenericCertificate(chartContainer, design.canvasjsCode);
          }
          
        } catch (e) {
          console.error('Certificate render error:', e);
          document.getElementById('chart' + idx).innerHTML = 
            '<div style="padding:40px; text-align:center; color:#dc3545; border:2px dashed #dc3545; border-radius:8px;">❌ Error rendering certificate: ' + e.message + '</div>';
        }
      });
    }, 100);
    
  } catch (error) {
    console.error('Request failed:', error);
    resultsDiv.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
  }
};

function renderCanvasCertificate(containerId, code) {
  try {
    console.log('Rendering canvas certificate for:', containerId);
    
    // Clear the container first
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // Execute the canvas code directly
    const func = new Function('containerId', code);
    func(containerId);
    
    console.log('Canvas certificate rendered successfully');
  } catch (e) {
    console.error('Canvas render error:', e);
    document.getElementById(containerId).innerHTML = 
      '<div style="padding:20px; text-align:center; color:#dc3545;">Error rendering canvas certificate</div>';
  }
}

function renderHTMLCertificate(containerId, code) {
  try {
    console.log('Rendering HTML certificate for:', containerId);
    
    // Execute HTML code
    const func = new Function('containerId', code);
    func(containerId);
    
    console.log('HTML certificate rendered successfully');
  } catch (e) {
    console.error('HTML render error:', e);
    document.getElementById(containerId).innerHTML = 
      '<div style="padding:20px; text-align:center; color:#dc3545;">Error rendering HTML certificate</div>';
  }
}

function renderGenericCertificate(containerId, code) {
  try {
    console.log('Rendering generic certificate for:', containerId);
    
    const func = new Function('containerId', code);
    func(containerId);
  } catch (e) {
    console.error('Generic render failed:', e);
    document.getElementById(containerId).innerHTML = 
      '<div style="padding:20px; text-align:center;">Unable to render this certificate type</div>';
  }
}

function copyCode(index) {
  const textarea = document.getElementById(`code-${index}`);
  if (textarea) {
    textarea.select();
    document.execCommand('copy');
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#28a745';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  }
}

// Test connection on page load
window.addEventListener('load', function() {
  console.log('🎓 Certificate Generator loaded successfully');
  
  // Test if we can reach the server
  fetch('http://localhost:5000/api/test')
    .then(res => res.ok ? console.log('✅ Server connection successful') : console.warn('⚠️ Server connection issue'))
    .catch(err => console.warn('⚠️ Cannot connect to server:', err.message));
});
