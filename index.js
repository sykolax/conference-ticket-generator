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

fileDropZone.addEventListener("click", (event) => {
    // ignore children click
    if (event.target === fileDropZone || event.target === fileDropZoneImage) {
        triggerInputFile();
    } 
})

fileInput.addEventListener("change", (event) => {
    avatar = event.target.files[0];
    if (avatar) {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            displayAvatar(event.target.result);
        }

        fileReader.readAsDataURL(avatar);
        renderModifyButtons();
    } else {
        // Display previous 
    }
})

function renderModifyButtons() {
    // make file drop zone non clickable
    disableClick(fileDropZone);

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

    // parent div is non clickable now, button click needs to be abled
    allowclick(fileRemoveBtn);
    allowclick(fileChangeBtn);

    fileChangeBtn.addEventListener('click', () => {
        triggerInputFile();
    });

    fileRemoveBtn.addEventListener('click', () => {
        //revert back to the original file drop zone setting 
        const avatarImg = document.querySelector('.avatar-uploaded-image');
        avatarImg.replaceWith(fileDropZoneImage);
        btnContainer.replaceWith(fileDropZoneMessage);
        allowclick(fileDropZone);
    })  
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
    avatarImg.classList.add('avatar-uploaded-image');
    currentImg.replaceWith(avatarImg);
    //current thing
}

// TODO : 1) file type check 2) Submit button -> construct a user object 