const fileDropZone = document.querySelector(".file-drop-zone");
const fileInput = document.querySelector("#avatar-upload");

fileDropZone.addEventListener("click", () => {
    fileInput.click();
})

fileInput.addEventListener("change", (event) => {
    avatar = event.target.files[0];
    displayAvatar(avatar);
})

function displayAvatar(avatar) {
    
    console.log(avatar);
}

// TODO : 1) file type check 2) Submit button -> construct a user object 