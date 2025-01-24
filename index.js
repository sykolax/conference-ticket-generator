const MAX_FILE_SIZE = 1000 * 500; //500kB

const ticketForm = document.getElementById("ticketForm");

const fileDropZone = document.querySelector(".file-drop-zone");
const fileInput = document.querySelector("#avatar-upload");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const githubInput = document.querySelector("#github-username");
const submitButton = document.querySelector("#submit");
// original file drop zone setting
const fileDropZoneImage = document.querySelector(".file-drop-zone img");
const fileDropZoneMessage = document.querySelector(".file-drop-zone p");
const fileuploadInfoMessage = document.querySelector(".upload-info");

const inputs = [nameInput, emailInput, githubInput];
const errorMessages = document.querySelectorAll(".error-message");

let isDropZoneActive = true;

class User {
    constructor(name, email, github, avatar) {
        this.name = name || null;
        this.email = email || null; 
        this.github = github || null;
        this.avatar = avatar || null;
    }
}

const userInfo = new User();
console.log(userInfo);

submit.addEventListener('click', (event) => {
    event.preventDefault();

    const infoKeys = ["name", "email", "github"];

    console.log("hi!");
    if (!userInfo["avatar"]) {
        fileDropZone.classList.add('error-box');
        errorMessages[0].textContent = "Please upload your photo";
    } else {
        fileDropZone.classList.remove('error-box');
    }

    inputs.forEach((input, index) => {
        console.log(input, index);
        const value = input.value;
        if (isEmpty(value)) {
            input.classList.add('error-box');
            errorMessages[index + 1].textContent = "Please fill out this form";
        } else {
            input.classList.remove('error-box');
            errorMessages[index + 1].textContent = "";
            userInfo[infoKeys[index]] = value;
        }
    
    });
});

fileDropZone.addEventListener('click', () => {
    if (isDropZoneActive) {
        triggerInputFile();
    }
});

fileDropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
    fileDropZone.classList.add('dragging');
});

fileDropZone.addEventListener('drop', (event) => {
    fileDropZone.classList.remove('dragging');
    event.preventDefault(); 
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    processNewAvatar(file);
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    processNewAvatar(file);
});

emailInput.addEventListener('change', () => {
    // Check if it's valid
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error-box');
        errorMessages[2].textContent = "Please enter valid email address";
    } else {
        emailInput.classList.remove('error-box');
        errorMessages[2].textContent = "";
    }
});

emailInput.addEventListener('valid', () =>{
    emailInput.classList.remove('error-box');
});

function isEmpty(fieldValue) {
    return !fieldValue.trim().length;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function processNewAvatar(file) {
    // avatar = input file from user
    if (file.type.startsWith('image/')) {
        if (file.size > MAX_FILE_SIZE) {
            fileDropZone.classList.add('error-box');
            errorMessages[0].textContent ="The selected file must not be larger than 500 kB";
            return;
        } else {
            errorMessages[0].textContent = "";
            fileDropZone.classList.remove('error-box');
        }
        const reader = new FileReader();

        reader.onload = (event) => {
            displayAvatar(event.target.result);
            renderModifyButtons();
            userInfo["avatar"] = event.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function renderModifyButtons() {
    // remove click event 
    // fileDropZone.removeEventListener("click", triggerInputFile);
    isDropZoneActive = false;

    // class names for file modification
    const modifyBtnClass = 'file-modify-button';
    const modifyBtnContainerClass = 'file-modify-button-container';

    // create buttons and set their event listeners
    const btnContainer = document.createElement('div');
    btnContainer.classList.add(modifyBtnContainerClass);
    const fileRemoveBtn = document.createElement('button');
    fileRemoveBtn.setAttribute('type', 'button'); // disable default submit behavior
    const fileChangeBtn = document.createElement('button');
    fileChangeBtn.setAttribute('type', 'button');
    fileRemoveBtn.classList.add(modifyBtnClass);
    fileChangeBtn.classList.add(modifyBtnClass);
    fileRemoveBtn.textContent = 'Remove image';
    fileChangeBtn.textContent = 'Change image';
    btnContainer.appendChild(fileRemoveBtn);
    btnContainer.appendChild(fileChangeBtn);
    fileDropZoneMessage.replaceWith(btnContainer);

    fileChangeBtn.addEventListener('click', triggerInputFile);
    fileRemoveBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // to prevent the parent div to be clicked
        restoreDropZone();
    });
}

function restoreDropZone() {
        //revert back to the original file drop zone setting 
        const avatarImg = document.querySelector('.avatar-image');
        const btnContainer = document.querySelector('.file-modify-button-container');
        avatarImg.replaceWith(fileDropZoneImage);
        btnContainer.replaceWith(fileDropZoneMessage);
        isDropZoneActive = true;
}

function triggerInputFile() {
    fileInput.click();
}

function displayAvatar(avatar) {
    const avatarImg = document.createElement('img');
    const currentImg = document.querySelector('.file-drop-zone img');
    avatarImg.src = avatar;
    avatarImg.classList.add('avatar-image');
    currentImg.replaceWith(avatarImg);
    //current thing
}

// TODO : 1) file type check 2) Submit button -> construct a user object 3) Highlight drop zone when drag over