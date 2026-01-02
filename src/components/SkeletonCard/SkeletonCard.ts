import './SkeletonCard.css';

export function SkeletonCard(): string {
  return `
    <div class="skeleton-card">
      <div class="skeleton-header">
        <div class="skeleton-text" style="width: 40px;"></div>
        <div class="skeleton-text" style="width: 30px;"></div>
      </div>
      <div class="skeleton-img"></div>
      <div class="skeleton-text skeleton-title"></div>
    </div>
  `;
}
