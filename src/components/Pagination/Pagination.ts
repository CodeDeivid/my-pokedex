import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const ArrowLeft = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ArrowRight = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export function renderPagination(containerId: string, props: PaginationProps) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { currentPage, totalPages, onPageChange } = props;

  const maxVisiblePages = 3;
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  let pagesHtml = '';

  for (let i = startPage; i <= endPage; i++) {
    const isCurrent = i === currentPage;

    pagesHtml += `
      <button 
        class="page-number ${isCurrent ? 'active' : ''}" 
        data-page="${i}"
        aria-label="Ir para a página ${i}"
        ${isCurrent ? 'aria-current="page"' : ''}
      >
        ${i}
      </button>
    `;
  }

  container.innerHTML = `
    <nav aria-label="Navegação de paginação" class="pagination-container">
      <button 
        id="prev-btn" 
        class="pagination-nav" 
        ${currentPage === 1 ? 'disabled' : ''}
        aria-label="Página anterior"
      >
        ${ArrowLeft}
        <span>Anterior</span>
      </button>
      
      <div class="pagination-numbers">
        ${pagesHtml}
      </div>
      
      <button 
        id="next-btn" 
        class="pagination-nav" 
        ${currentPage === totalPages ? 'disabled' : ''}
        aria-label="Próxima página"
      >
        <span>Próximo</span>
        ${ArrowRight}
      </button>
    </nav>
  `;

  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    });
  }

  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    });
  }

  const numbersContainer = container.querySelector('.pagination-numbers');
  if (numbersContainer) {
    numbersContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('.page-number');

      if (button) {
        const page = Number(button.getAttribute('data-page'));
        if (page !== currentPage && !isNaN(page)) {
          onPageChange(page);
        }
      }
    });
  }
}