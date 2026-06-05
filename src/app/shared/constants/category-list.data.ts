export type CategoryFilterId =
  | 'all'
  | 'tools'
  | 'household'
  | 'moving'
  | 'garden';

export interface CategoryItem {
  id: string;
  categoryFilter: CategoryFilterId;
  image: string;
}

/** Equipment cards on home */
export const categoryList: CategoryItem[] = [
  // TOOLS
  {
    id: 'drill',
    categoryFilter: 'tools',
    image: '/images/Categories/drill.png',
  },
  {
    id: 'cleaner',
    categoryFilter: 'tools',
    image: '/images/Categories/Cleaner1.png',
  },
  {
    id: 'lawn',
    categoryFilter: 'tools',
    image: '/images/Categories/lawnmower1.png',
  },
  {
    id: 'ladder',
    categoryFilter: 'tools',
    image: '/images/Categories/ladder.png',
  },
  {
    id: 'handtools',
    categoryFilter: 'tools',
    image: '/images/Categories/drill.png',
  },

  // HOUSEHOLD
  {
    id: 'mixer',
    categoryFilter: 'household',
    image: '/images/Categories/mixer.png',
  },
  {
    id: 'airpurifier',
    categoryFilter: 'household',
    image: '/images/Categories/Cleaner1.png',
  },
  {
    id: 'speaker',
    categoryFilter: 'household',
    image: '/images/Categories/speakers.png',
  },
  {
    id: 'party',
    categoryFilter: 'household',
    image: '/images/Categories/party.png',
  },
  {
    id: 'lighting',
    categoryFilter: 'household',
    image: '/images/Categories/party.png',
  },
  {
    id: 'camera',
    categoryFilter: 'household',
    image: '/images/Categories/camera.png',
  },
  {
    id: 'security',
    categoryFilter: 'household',
    image: '/images/Categories/camera.png',
  },

  // MOVING
  {
    id: 'bike',
    categoryFilter: 'moving',
    image: '/images/Categories/BikeCycle.png',
  },
  {
    id: 'generator',
    categoryFilter: 'moving',
    image: '/images/Categories/Genrator.png',
  },
  {
    id: 'printer',
    categoryFilter: 'moving',
    image: '/images/Categories/printer.png',
  },

  // GARDEN
  {
    id: 'tent',
    categoryFilter: 'garden',
    image: '/images/Categories/tent.png',
  },
  {
    id: 'outdoor',
    categoryFilter: 'garden',
    image: '/images/Categories/BikeCycle.png',
  },
];

export const categoryFilters: { id: CategoryFilterId; labelKey: string }[] = [
  { id: 'all', labelKey: 'home.categories.filters.all' },
  { id: 'tools', labelKey: 'home.categories.filters.tools' },
  { id: 'household', labelKey: 'home.categories.filters.household' },
  { id: 'moving', labelKey: 'home.categories.filters.moving' },
  { id: 'garden', labelKey: 'home.categories.filters.garden' },
];
