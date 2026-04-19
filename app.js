
const firebaseConfig = {
  apiKey: "AIzaSyDhw2uuMpZ1UmB1itFFwk8V3RIvXhOeQVA",
  authDomain: "cloud-chat-app-493311.firebaseapp.com",
  projectId: "cloud-chat-app-493311",
  storageBucket: "cloud-chat-app-493311.firebasestorage.app",
  messagingSenderId: "660856358009",
  appId: "1:660856358009:web:1b2fe5606bd328543800a8",
  measurementId: "G-T9GRFCLYZP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = "";

// Signup
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Signup successful"))
        .catch(err => alert(err.message));
}

// Login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            currentUser = email;
            document.getElementById("auth").style.display = "none";
            document.getElementById("chat").style.display = "block";
            loadMessages();
        })
        .catch(err => alert(err.message));
}

// Send message
function sendMessage() {
    const msg = document.getElementById("messageInput").value;

    db.collection("messages").add({
        text: msg,
        user: currentUser,
        timestamp: new Date()
    });

    document.getElementById("messageInput").value = "";
}

// Load messages (real-time)
function loadMessages() {
    db.collection("messages")
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML = "";

        snapshot.forEach(doc => {
            const data = doc.data();
            const msgDiv = document.createElement("div");
            msgDiv.textContent = `${data.user}: ${data.text}`;
            messagesDiv.appendChild(msgDiv);
        });
    });
}