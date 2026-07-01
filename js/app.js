// Cargar datos del localStorage o usar valores por defecto
function loadGames() {
  const saved = localStorage.getItem('la10games_games');
  if (saved) {
    return JSON.parse(saved);
  }
  return [
    { id: 1, title: 'EA Sports FC 25', genre: 'Deportes', console: 'PS5', price: 5499 },
    { id: 2, title: 'Grand Theft Auto V', genre: 'Acción', console: 'PS4/PS5', price: 3999 },
    { id: 3, title: 'God of War Ragnarök', genre: 'Acción', console: 'PS5', price: 4999 },
    { id: 4, title: 'Gran Turismo 7', genre: 'Carreras', console: 'PS5', price: 4599 },
    { id: 5, title: 'The Last of Us Parte II', genre: 'Aventura', console: 'PS4', price: 2499 },
    { id: 6, title: 'Spider-Man 2', genre: 'Acción', console: 'PS5', price: 4899 },
    { id: 7, title: 'eFootball 2025', genre: 'Deportes', console: 'PS4/PS5', price: 3299 },
    { id: 8, title: 'Elden Ring', genre: 'RPG', console: 'PS5', price: 4199 },
  ];
}

function loadWhatsApp() {
  return localStorage.getItem('la10games_whatsapp') || '5490000000000';
}

function saveGames(games) {
  localStorage.setItem('la10games_games', JSON.stringify(games));
  initCatalog();
}

function saveWhatsApp(number) {
  localStorage.setItem('la10games_whatsapp', number);
  updateWhatsAppLinks(number);
}

let games = loadGames();
let whatsappNumber = loadWhatsApp();

// Renderizar catálogo
function initCatalog() {
  const container = document.getElementById('catalog-container');
  container.innerHTML = games.map(game => `
    <div class="game-card">
      <div class="game-cover"><span class="console-tag">${game.console}</span></div>
      <div class="game-info">
        <h3>${game.title}</h3>
        <div class="genre">${game.genre}</div>
        <div class="game-price-row">
          <span class="price">$${game.price.toLocaleString('es-AR')}</span>
          <a href="https://wa.me/${whatsappNumber}?text=Hola%20quiero%20comprar%20${encodeURIComponent(game.title)}%20por%20%24${game.price}" target="_blank" class="buy-mini">Pedir</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Panel Admin
function initAdmin() {
  const adminBtn = document.getElementById('admin-btn');
  const adminModal = document.getElementById('admin-modal');
  const closeAdmin = document.getElementById('close-admin');
  const whatsappInput = document.getElementById('whatsapp-input');
  const saveWhatsappBtn = document.getElementById('save-whatsapp');
  const gamesList = document.getElementById('games-list');
  const addGameBtn = document.getElementById('add-game');
  const resetBtn = document.getElementById('reset-all');

  // Abrir admin
  adminBtn.addEventListener('click', () => {
    adminModal.classList.remove('hidden');
    whatsappInput.value = whatsappNumber;
    renderGamesList();
  });

  // Cerrar admin
  closeAdmin.addEventListener('click', () => {
    adminModal.classList.add('hidden');
  });

  adminModal.addEventListener('click', (e) => {
    if (e.target === adminModal) {
      adminModal.classList.add('hidden');
    }
  });

  // Guardar WhatsApp
  saveWhatsappBtn.addEventListener('click', () => {
    const newNumber = whatsappInput.value.trim();
    if (newNumber && newNumber.length >= 10) {
      whatsappNumber = newNumber;
      saveWhatsApp(newNumber);
      alert('✅ WhatsApp guardado!');
    } else {
      alert('⚠️ Número de WhatsApp inválido');
    }
  });

  // Renderizar lista de juegos
  function renderGamesList() {
    gamesList.innerHTML = games.map((game, idx) => `
      <div class="game-edit-item">
        <h4>${game.title}</h4>
        <div class="edit-row">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" value="${game.title}" data-id="${game.id}" data-field="title">
          </div>
          <div class="form-group">
            <label>Género</label>
            <input type="text" value="${game.genre}" data-id="${game.id}" data-field="genre">
          </div>
        </div>
        <div class="edit-row">
          <div class="form-group">
            <label>Consola</label>
            <select data-id="${game.id}" data-field="console">
              <option value="PS4" ${game.console === 'PS4' ? 'selected' : ''}>PS4</option>
              <option value="PS5" ${game.console === 'PS5' ? 'selected' : ''}>PS5</option>
              <option value="PS4/PS5" ${game.console === 'PS4/PS5' ? 'selected' : ''}>PS4/PS5</option>
            </select>
          </div>
          <div class="form-group">
            <label>Precio ($)</label>
            <input type="number" value="${game.price}" data-id="${game.id}" data-field="price">
          </div>
        </div>
        <div class="game-edit-item edit-buttons">
          <button class="edit-btn" onclick="window.saveGameChanges(${game.id})">✓ Guardar</button>
          <button class="delete-btn" onclick="window.deleteGame(${game.id})">🗑️ Eliminar</button>
        </div>
      </div>
    `).join('');
  }

  // Agregar juego
  addGameBtn.addEventListener('click', () => {
    const newGame = {
      id: Math.max(...games.map(g => g.id), 0) + 1,
      title: 'Nuevo Juego',
      genre: 'Género',
      console: 'PS5',
      price: 5000
    };
    games.push(newGame);
    saveGames(games);
    renderGamesList();
  });

  // Restaurar predeterminados
  resetBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro? Se eliminarán todos los cambios.')) {
      localStorage.removeItem('la10games_games');
      games = loadGames();
      saveGames(games);
      renderGamesList();
      alert('✅ Juegos restaurados');
    }
  });

  // Guardar cambios de un juego
  window.saveGameChanges = function(id) {
    const game = games.find(g => g.id === id);
    if (!game) return;

    const inputs = document.querySelectorAll(`[data-id="${id}"]`);
    inputs.forEach(input => {
      const field = input.dataset.field;
      const value = input.value;
      if (field === 'price') {
        game[field] = parseInt(value);
      } else {
        game[field] = value;
      }
    });

    saveGames(games);
    renderGamesList();
    alert('✅ Cambios guardados');
  };

  // Eliminar juego
  window.deleteGame = function(id) {
    if (confirm('¿Eliminar este juego?')) {
      games = games.filter(g => g.id !== id);
      saveGames(games);
      renderGamesList();
      alert('✅ Juego eliminado');
    }
  };

  // Actualizar links de WhatsApp en la página
  function updateWhatsAppLinks(number) {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      let href = link.href;
      href = href.replace(/wa\.me\/\d+/, `wa.me/${number}`);
      link.href = href;
    });
  }
}

// Iniciar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    initAdmin();
  });
} else {
  initCatalog();
  initAdmin();
}
