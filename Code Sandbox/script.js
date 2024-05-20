


const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const output = document.getElementById('output');
const saveButton = document.getElementById('save-button');
const resetButton = document.getElementById('reset-button');
const notificationModal = document.getElementById('notification-modal');
const modalMessage = document.getElementById('modal-message');
const modalCloseButton = document.getElementById('modal-close-button');


const defaultHtml = `<h1>Hello, Sandbox!</h1>\n<p>Start coding here.</p>`;
const defaultCss = `body {\n  font-family: sans-serif;\n  color: #333;\n}`;
const defaultJs = `console.log("Welcome to the Code Sandbox!");`;

function runCode() {
    const html = htmlCode.value;
    const css = cssCode.value;
    const js = jsCode.value;

    const fullCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;
    
    output.srcdoc = fullCode;
}


function saveCode() {
    try {
        localStorage.setItem('sandboxHtml', htmlCode.value);
        localStorage.setItem('sandboxCss', cssCode.value);
        localStorage.setItem('sandboxJs', jsCode.value);
        showNotification('Code saved successfully!');
    } catch (e) {
        showNotification('Error saving code. Please check browser settings.', true);
        console.error("Could not save to localStorage", e);
    }
}


function loadCode() {
    const savedHtml = localStorage.getItem('sandboxHtml');
    const savedCss = localStorage.getItem('sandboxCss');
    const savedJs = localStorage.getItem('sandboxJs');

    // If there's saved code, use it. Otherwise, use the defaults.
    htmlCode.value = savedHtml || defaultHtml;
    cssCode.value = savedCss || defaultCss;
    jsCode.value = savedJs || defaultJs;

    runCode(); // Run the code after loading
}

// Function to reset all the code to its default state
function resetCode() {
    const isConfirmed = window.confirm("Are you sure you want to reset all code? This action cannot be undone.");
    if (isConfirmed) {
        htmlCode.value = defaultHtml;
        cssCode.value = defaultCss;
        jsCode.value = defaultJs;
        localStorage.removeItem('sandboxHtml');
        localStorage.removeItem('sandboxCss');
        localStorage.removeItem('sandboxJs');
        runCode();
        showNotification('Code has been reset to defaults.');
    }
}

// Function to display a custom notification modal
function showNotification(message, isError = false) {
    modalMessage.textContent = message;
    notificationModal.classList.remove('hidden');
    
    // Auto-hide after 3 seconds unless it's an error
    if (!isError) {
        setTimeout(() => {
            notificationModal.classList.add('hidden');
        }, 3000);
    }
}

// --- Event Listeners ---
// Listen for input on all editors to run the code in real-time
htmlCode.addEventListener('input', runCode);
cssCode.addEventListener('input', runCode);
jsCode.addEventListener('input', runCode);

// Listen for clicks on the save and reset buttons
saveButton.addEventListener('click', saveCode);
resetButton.addEventListener('click', resetCode);
modalCloseButton.addEventListener('click', () => {
    notificationModal.classList.add('hidden');
});

// --- Initialization ---
// Load the code from local storage on page load
window.onload = loadCode;




const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const output = document.getElementById('output');
const saveButton = document.getElementById('save-button');
const resetButton = document.getElementById('reset-button');
const notificationModal = document.getElementById('notification-modal');
const modalMessage = document.getElementById('modal-message');
const modalCloseButton = document.getElementById('modal-close-button');

