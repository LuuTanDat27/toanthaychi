// List of valid codes
const validCodes = [
    '280407', '481562', '926374', '357819', '642903',
    '815647', '293048', '567123', '408935', '721690',
    '384516', '957028', '620473', '135892', '749061',
    '502837', '916425', '683094', '247518', '359670',
    '824159', '607382', '491526', '738204', '562891',
    '903475', '216843', '579012', '384627', '651930',
    '427815', '890346', '153792', '608425', '937164',
    '245078', '619532', '874901', '326457', '590813',
    '763249', '418506', '925731', '647082', '301895',
    '584217', '932640', '176583', '409725', '658931',
    '827304', '591468', '342790', '615823', '908457',
    '273614', '546089', '819235', '402768', '735912',
    '168547', '923085', '654371', '387902', '510624',
    '749136', '205893', '638417', '971520', '324689',
    '856073', '419258', '782941', '035672', '698413',
    '247506', '513829', '876042', '329175', '604938',
    '951267', '483590', '726814', '095382', '638451',
    '217904', '569378', '802145', '374690', '921583',
    '645207', '398514', '712869', '056342', '839701',
    '264835', '597108', '823456', '401789', '635902',
    '978314', '342067', '615829', '890473', '280407'
];

// Function to validate a code
const validateCode = (code) => {
    if (!validCodes.includes(code)) {
        // Block website access
        disableWebsite();
        // Show error message
        const errorMsg = document.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = 'Mã đăng nhập không hợp lệ. Vui lòng thử lại.';
        }
        return false;
    }
    return true;
};

// Function to disable website
const disableWebsite = () => {
    document.body.style.opacity = '0.5';
    document.body.style.pointerEvents = 'none';
    // Add overlay to prevent interaction
    const overlay = document.createElement('div');
    overlay.className = 'website-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9998;
    `;
    document.body.appendChild(overlay);

    // Ensure login modal is always on top and interactive
    const modal = document.querySelector('.login-modal');
    if (modal) {
        modal.style.zIndex = '9999';
        modal.style.pointerEvents = 'auto';
    }
};

// Function to enable website
const enableWebsite = () => {
    document.body.style.opacity = '1';
    document.body.style.pointerEvents = 'auto';
    // Remove overlay if exists
    const overlay = document.querySelector('.website-overlay');
    if (overlay) {
        overlay.remove();
    }
};

// Function to show login modal
const showLoginModal = () => {
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        pointer-events: auto;
    `;
    modal.innerHTML = `
        <div class="login-modal__content" style="pointer-events: auto;">
            <h2>Nhập mã đăng nhập</h2>
            <p>Vui lòng nhập mã người bán đã cung cấp để sử dụng website</p>
            <input type="text" id="loginCode" maxlength="6" placeholder="Nhập mã đăng nhập" autocomplete="off">
            <button id="submitCode">Xác nhận</button>
            <p class="error-message"></p>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add event listeners
    const input = modal.querySelector('#loginCode');
    const submitBtn = modal.querySelector('#submitCode');
    const errorMsg = modal.querySelector('.error-message');

    // Focus on input when modal opens
    input.focus();

    // Only allow numbers
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Handle Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    submitBtn.addEventListener('click', () => {
        const code = input.value;
        if (code.length !== 6) {
            errorMsg.textContent = 'Mã đăng nhập phải có 6 chữ số';
            return;
        }

        if (validateCode(code)) {
            localStorage.setItem('isAuthenticated', 'true');
            modal.remove();
            document.body.style.overflow = '';
            enableWebsite();
        } else {
            input.value = ''; // Clear input on error
            input.focus(); // Focus back on input
        }
    });
};

// Check authentication on page load
window.addEventListener('load', () => {
    if (!localStorage.getItem('isAuthenticated')) {
        disableWebsite();
        showLoginModal();
    }
}); 