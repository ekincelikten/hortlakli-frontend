
const socket = io();
let currentPhase = 'lobby';
let currentRole = '';

function joinGame() {
  const nickname = document.getElementById('nicknameInput').value.trim();
  if (!nickname) {
    alert("Lütfen bir nickname girin.");
    return;
  }

  socket.emit('joinGame', nickname);
  document.getElementById('joinSection').style.display = 'none';
}

socket.on('assignRole', ({ role, avatar }) => {
  currentRole = role;
  document.getElementById('myRole').innerText = `Rolün: ${role}`;
  document.getElementById('myAvatar').src = avatar;
});

socket.on('phaseChange', (phase) => {
  currentPhase = phase;
  document.getElementById('phaseDisplay').innerText = `Faz: ${phase}`;
});

socket.on('updatePlayers', (players) => {
  const container = document.getElementById('players');
  container.innerHTML = '';
  players.forEach(p => {
    if (!p.isAlive) return;
    const card = document.createElement('div');
    card.className = 'avatar-card';
    card.innerHTML = `
      <img src="${p.avatar}" alt="${p.nickname}" data-nick="${p.nickname}">
      <p>${p.nickname}</p>
    `;
    card.onclick = () => handleAvatarClick(p.nickname);
    container.appendChild(card);
  });
});

socket.on('investigationResult', ({ target, isHortlak }) => {
  const mesaj = isHortlak ? `${target} bir hortlak!` : `${target} masum.`;
  alert(mesaj);
});

function handleAvatarClick(nickname) {
  if (currentPhase !== 'night') return;

  switch (currentRole) {
    case 'Dedektif':
      socket.emit('dedektifAvatarTiklama', nickname);
      break;
    case 'Gulyabani':
      socket.emit('nightAction', { action: 'kill', target: nickname });
      break;
    case 'İfrit':
      socket.emit('nightAction', { action: 'silence', target: nickname });
      break;
    case 'Doktor':
      socket.emit('nightAction', { action: 'protect', target: nickname });
      break;
    case 'Gardiyan':
      socket.emit('nightAction', { action: 'jail', target: nickname });
      break;
  }
}
