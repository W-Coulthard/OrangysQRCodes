const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = async (e) => {
    e.preventDefault();
    form.querySelector('button[type="submit"]').disabled = true;

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert('Please enter a URL');
    } else {
        showSpinner();
        try {
            await generateQRCode(url, size);
            const saveUrl = qr.querySelector('img').src;
            createSaveBtn(saveUrl);
            hideGenerated();
        } catch (error) {
            console.error(error);
        } finally {
            hideSpinner();
            showGenerated();
            form.querySelector('button[type="submit"]').disabled = false;
        }
    }
};


const generateQRCode = async (url, size) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const qrcode = new QRCode('qrcode', {
                    text: url,
                    width: size,
                    height: size,
                });
                document.querySelector(".output").style.display = "block";
                resolve();
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
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
