const socket = io('https://hortlakli-koy-demo-1.onrender.com');
let nickname = '';
let lobbyId = null;

function joinGame() {
  nickname = document.getElementById('nickname').value;
  if (!nickname) return;
  socket.emit('joinGame', nickname);
  document.getElementById('lobby').style.display = 'none';
  document.getElementById('game').style.display = 'block';
}

socket.on('assignRole', data => {
  document.getElementById('roleInfo').innerText = `Rolünüz: ${data.role}`;
});

socket.on('phaseChange', phase => {
  const chat = document.getElementById('chat');
  chat.innerHTML += `<p><em>Faz: ${phase}</em></p>`;
});

socket.on('updatePlayers', players => {
  const container = document.getElementById('players');
  container.innerHTML = '';
  players.forEach(p => {
    const img = document.createElement('img');
    img.src = p.avatar;
    img.title = p.nickname;
    img.onclick = () => alert(`${p.nickname} seçildi (görev tıklaması)`); // placeholder
    container.appendChild(img);
    container.appendChild(document.createTextNode(p.nickname));
    container.appendChild(document.createElement('br'));
  });
});