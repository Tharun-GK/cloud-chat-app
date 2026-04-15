let currentUser = "";

// Fake signup
function signup() {
    alert("Signup (Firebase not connected yet)");
}

// Fake login
function login() {
    const email = document.getElementById("email").value;

    if (!email) {
        alert("Enter email");
        return;
    }

    currentUser = email;

    document.getElementById("auth").style.display = "none";
    document.getElementById("chat").style.display = "block";
}

// Send message
function sendMessage() {
    const msg = document.getElementById("messageInput").value;

    if (!msg) return;

    const time = new Date().toLocaleTimeString();

    const msgDiv = document.createElement("div");
    msgDiv.textContent = `[${time}] ${currentUser}: ${msg}`;

    document.getElementById("messages").appendChild(msgDiv);

    document.getElementById("messageInput").value = "";
}