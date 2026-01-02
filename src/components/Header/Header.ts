import './Header.css';

export function Header(): string {
  return `
    <header class="main-header">
      <img src="/logo.png" alt="PokéDex Logo" style="height: 39px; object-fit: contain;" />
      
      <nav class="nav-list" aria-label="Navegação Principal">
        <a href="#" class="nav-item active">Home</a>
        <a href="#" class="nav-item">Pokédex</a>
      </nav>
    </header>
  `;
}
