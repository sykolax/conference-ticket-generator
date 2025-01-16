const fileDropZone = document.querySelector(".file-drop-zone");
const fileInput = document.querySelector("#avatar-upload");
const fileDropZoneImage = document.querySelector(".file-drop-zone img");

fileDropZone.addEventListener("click", () => {
    fileInput.click();
})

fileInput.addEventListener("change", (event) => {
    avatar = event.target.files[0];
    if (avatar) {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            displayAvatar(event.target.result);
        }

        fileReader.readAsDataURL(avatar);
    }
})

function displayAvatar(avatar) {
    fileDropZoneImage.src = avatar;
    fileDropZoneImage.classList.remove("upload-icon");
    fileDropZoneImage.classList.add("avatar-uploaded-image");
    console.log(avatar);
}

// TODO : 1) file type check 2) Submit button -> construct a user object 