import { Component, computed, inject, signal } from '@angular/core';
import {
  LucideArrowRight,
  LucideSearch,
  LucideGrid3X3,
  LucideHammer,
  LucideHouse,
  LucideTruck,
  LucideTrees,
  LucideTent,
  LucideMonitor,
} from '@lucide/angular';

import {
  categoryFilters,
  categoryList,
  CategoryFilterId,
} from '../../../shared/constants/category-list.data';

import { TranslationService } from '../../../core/services/translation.service';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { SectionHeadingComponent } from '../../../shared/components/borvi/section-heading.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [
    AppImageComponent,
    SectionHeadingComponent,
    LucideSearch,
    LucideArrowRight,
    TranslatePipe,
    LucideGrid3X3,
    LucideHammer,
    LucideHouse,
    LucideTruck,
    LucideTrees,
    LucideTent,
    LucideMonitor,
  ],
  templateUrl: './categories-section.component.html',
})
export class CategoriesSectionComponent {
  private readonly i18n = inject(TranslationService);

  readonly activeFilter = signal<CategoryFilterId>('all');
  readonly searchQuery = signal('');

  readonly categoryFilters = categoryFilters;

  readonly filteredCategories = computed(() => {
    this.i18n.lang(); // reactive refresh

    const active = this.activeFilter();
    const query = this.searchQuery().toLowerCase().trim();

    return categoryList.filter((item) => {
      const matchesCategory =
        active === 'all' || item.categoryFilter === active;

      const title = this.i18n
        .instant(`home.catItems.${item.id}.title`)
        .toLowerCase();

      const matchesSearch = !query || title.includes(query);

      return matchesCategory && matchesSearch;
    });
  });

  readonly rows = computed(() => {
    const items = this.filteredCategories();
    const size = 6;

    const chunks: (typeof categoryList)[] = [];

    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }

    return chunks.slice(0, 3);
  });

  itemTitle(id: string): string {
    return this.i18n.instant(`home.catItems.${id}.title`);
  }

  itemCategory(id: string): string {
    return this.i18n.instant(`home.catItems.${id}.category`);
  }

  scrollToAppDownload(): void {
    document
      .getElementById('AppDownload')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
