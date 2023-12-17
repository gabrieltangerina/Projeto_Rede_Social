document.addEventListener("DOMContentLoaded", function () {
    let flashMessages = document.getElementById("flash-messages");
    if (flashMessages) {
        setTimeout(function () {
            flashMessages.style.display = "none";
        }, 1500);
    }
});
