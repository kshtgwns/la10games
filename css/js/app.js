const games = [
  { id: 1, title: 'EA Sports FC 25', genre: 'Deportes', console: 'PS5', price: 5499 },
  { id: 2, title: 'Grand Theft Auto V', genre: 'Acción', console: 'PS4/PS5', price: 3999 },
  { id: 3, title: 'God of War Ragnarök', genre: 'Acción', console: 'PS5', price: 4999 },
  { id: 4, title: 'Gran Turismo 7', genre: 'Carreras', console: 'PS5', price: 4599 },
  { id: 5, title: 'The Last of Us Parte II', genre: 'Aventura', console: 'PS4', price: 2499 },
  { id: 6, title: 'Spider-Man 2', genre: 'Acción', console: 'PS5', price: 4899 },
  { id: 7, title: 'eFootball 2025', genre: 'Deportes', console: 'PS4/PS5', price: 3299 },
  { id: 8, title: 'Elden Ring', genre: 'RPG', console: 'PS5', price: 4199 },
];

const whatsappNumber = '5490000000000'; // REEMPLAZA CON TU NÚMERO

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
          <a href="https://wa.me/${whatsappNumber}?text=Hola%20quiero%20comprar%20${encodeURIComponent(game.title)}" target="_blank" class="buy-mini">Pedir</a>
        </div>
      </div>
    </div>
  `).join('');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCatalog);
} else {
  initCatalog();
}
