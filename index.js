const fileDropZone = document.querySelector(".file-drop-zone");
const fileInput = document.querySelector("#avatar-upload");
// original file drop zone setting
const fileDropZoneImage = document.querySelector(".file-drop-zone img");
const fileDropZoneMessage = document.querySelector(".file-drop-zone p");

let avatar;

class User {
    constructor(name, email, github, avatar) {
        this.name = name;
        this.email = email;
        this.github = github;
        this.avatar = avatar;
    }
}

fileDropZone.addEventListener('click', triggerInputFile);

fileDropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
});

fileDropZone.addEventListener('drop', (event) => {
    console.log('dropped!');
    event.preventDefault(); 
    event.stopPropagation();

    const files = event.dataTransfer.files;

    if (files.length) {
        // Warning
        const file = files[0];
        
        if (file.type.startsWith('image/')) {
            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                clearFileDropZone();
                displayAvatar(event.target.result);
                renderModifyButtons();
             }
             fileReader.readAsDataURL(file);

        }
    }
});

fileInput.addEventListener('change', (event) => {
    avatar = event.target.files[0];
    if (avatar) {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            displayAvatar(event.target.result);
            renderModifyButtons();
        }

        fileReader.readAsDataURL(avatar);
    }
});

function clearFileDropZone() {
    const avatarImage = document.querySelector(".avatar-image");
    const btnContainer = document.querySelector(".file-modify-button-container");

    if (avatarImage) {
        avatarImage.replaceWith(fileDropZoneImage);
    }
    if (btnContainer) {
        btnContainer.replaceWith(fileDropZoneMessage);
    }
}

function renderModifyButtons() {
    // remove click event 
    fileDropZone.removeEventListener("click", triggerInputFile);

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
    fileRemoveBtn.addEventListener('click', restoreDropZone);
}

function restoreDropZone() {
        //revert back to the original file drop zone setting 
        const avatarImg = document.querySelector('.avatar-image');
        avatarImg.replaceWith(fileDropZoneImage);
        btnContainer.replaceWith(fileDropZoneMessage);
        fileDropZone.addEventListener("click", triggerInputFile);
}

function allowclick(element) {
    element.classList.add('clickable');
}

function disableClick(element) {
    element.classList.add('non-clickable');
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