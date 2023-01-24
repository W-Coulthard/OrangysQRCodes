const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();
    form.querySelector('button[type="submit"]').disabled = true;

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert('Please enter a URL');
    } else {
        showSpinner();
       
        setTimeout(() => {
            generateQRCode(url, size);
            const saveUrl = qr.querySelector('img').src;
            createSaveBtn(saveUrl);
            hideGenerated();
            hideSpinner();
        }, 1000);

        setTimeout(() => {
            showGenerated();
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
    form.querySelector('button[type="submit"]').disabled = false;
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const hideGenerated = () => {
    document.getElementById("qrcode").style.display = "none";
    document.getElementById("generated").style.display = "none";
};

const showGenerated = () => {
    document.getElementById("qrcode").style.display = "flex";
    document.getElementById("generated").style.display = "block";
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

form.addEventListener('submit', onGenerateSubmit);