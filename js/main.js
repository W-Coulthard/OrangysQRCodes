const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert('Please enter a URL');
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();
            
            generateQRCode(url, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
    document.querySelector(".output").style.display = "block";
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) {
        saveLink.remove();
    }
};

const createSaveBtn = (saveURL) => { 
    const link = document.createElement('a');
    link.id = 'save-link';
    link.href = saveURL;
    link.download = 'qrcode';
    link.innerHTML = 'Save QR Code';
    document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);

const link = document.createElement('a');
link.id = 'save-link';
link.href = saveURL;
link.download = 'qrcode';
link.innerHTML = 'Save QR Code';
document.getElementById('generated').appendChild(link);


