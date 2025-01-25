const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

let username = prompt("Enter your username (no 'admin' allowed):");

// Cek jika username adalah 'anos [admin]'
if (username === "anos [admin]") {
  let password = prompt("Enter password to access admin features:");
  
  // Cek password
  if (password !== "H^bgTNK8JPSi.+aEle]oodUX8#2o1tPuB$0{R5N]-6Mo4V]n4juOIZkTQ-BfM?&0dN4x;Vev3I7=!KX1_Xy+#QPZbc*BAYA>eaQW?y1_c?<hTanRn*%b*^sHtPS)Io<eA7]#JE_{72o&stD8g8yB2NLAc}PN@*v[2,dy8y1e}tn?,a8cI:-BoW@b+o%8OY2nocdh#]Os") {
    alert("Incorrect password! You are being set as 'Guest'.");
    username = "Guest";  // Set default username if password is wrong
  }
}

// Validasi username selain anos [admin]
if (username.toLowerCase().includes("admin") && username !== "anos [admin]") {
  alert("Username cannot contain 'admin' unless you're anos [admin].");
  username = "Guest"; // Default ke Guest kalau nggak valid
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { user: username, message: input.value });
    input.value = '';
  }
});

socket.on('chat message', (data) => {
  const item = document.createElement('div');
  item.textContent = `${data.user}: ${data.message}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});