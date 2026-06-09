export type CategoryFilterId =
  | 'all'
  | 'tools'
  | 'household'
  | 'moving'
  | 'garden'
  | 'camping'
  | 'electronics';

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
    image: '/images/Tools/drill.png',
  },
  {
    id: 'dust',
    categoryFilter: 'tools',
    image: '/images/Tools/dust.png',
  },
  {
    id: 'DWE',
    categoryFilter: 'tools',
    image: '/images/Tools/DWE.png',
  },
  {
    id: 'ladder',
    categoryFilter: 'tools',
    image: '/images/Tools/ladder.png',
  },
  {
    id: 'Invertec',
    categoryFilter: 'tools',
    image: '/images/Tools/Invertec.png',
  },
  {
    id: 'saw',
    categoryFilter: 'tools',
    image: '/images/Tools/saw.png',
  },
  // {
  //   id: 'toolbox',
  //   categoryFilter: 'tools',
  //   image: '/images/Tools/toolbox.png',
  // },

  // HOUSEHOLD
  {
    id: 'cooker',
    categoryFilter: 'household',
    image: '/images/Household/mixer.png',
  },
  {
    id: 'fries',
    categoryFilter: 'household',
    image: '/images/Household/fries-1.png',
  },
  {
    id: 'cookingwear',
    categoryFilter: 'household',
    image: '/images/Household/cookingwear.png',
  },
  {
    id: 'Burner',
    categoryFilter: 'household',
    image: '/images/Household/Burner.png',
  },
  {
    id: 'cleaner',
    categoryFilter: 'household',
    image: '/images/Household/cleaner.png',
  },

  // MOVING
  {
    id: 'bike',
    categoryFilter: 'moving',
    image: '/images/Moving/BikeCycle.png',
  },
  {
    id: 'generator',
    categoryFilter: 'moving',
    image: '/images/Moving/Genrator.png',
  },
  {
    id: 'move',
    categoryFilter: 'moving',
    image: '/images/Moving/move.png',
  },
  {
    id: 'hand',
    categoryFilter: 'moving',
    image: '/images/Moving/hand.png',
  },
  {
    id: 'hand-1',
    categoryFilter: 'moving',
    image: '/images/Moving/hand-1.png',
  },
  // GARDEN
  {
    id: 'lawn',
    categoryFilter: 'garden',
    image: '/images/Garden/lawn.png',
  },
  {
    id: 'saw',
    categoryFilter: 'garden',
    image: '/images/Garden/saw.png',
  },
  {
    id: 'garden',
    categoryFilter: 'garden',
    image: '/images/Garden/garden.png',
  },
  {
    id: 'water',
    categoryFilter: 'garden',
    image: '/images/Garden/water.png',
  },
  {
    id: 'showel',
    categoryFilter: 'garden',
    image: '/images/Garden/showel.png',
  },

  // camping

  {
    id: 'tent',
    categoryFilter: 'camping',
    image: '/images/Camping/tent-2.png',
  },
  {
    id: 'chair',
    categoryFilter: 'camping',
    image: '/images/Camping/chair.png',
  },
  {
    id: 'camp',
    categoryFilter: 'camping',
    image: '/images/Camping/camp.png',
  },
  {
    id: 'selender',
    categoryFilter: 'camping',
    image: '/images/Camping/selender.png',
  },

  // Electronic

  {
    id: 'washer',
    categoryFilter: 'electronics',
    image: '/images/Electronics/washer.png',
  },
  {
    id: 'washing',
    categoryFilter: 'electronics',
    image: '/images/Electronics/washing.png',
  },
  {
    id: 'juicer',
    categoryFilter: 'electronics',
    image: '/images/Electronics/juicer.png',
  },
  {
    id: 'catle',
    categoryFilter: 'electronics',
    image: '/images/Electronics/catle.png',
  },
  {
    id: 'electric',
    categoryFilter: 'electronics',
    image: '/images/Electronics/electric-item.png',
  },
];

export const categoryFilters: { id: CategoryFilterId; labelKey: string }[] = [
  { id: 'all', labelKey: 'home.categories.filters.all' },
  { id: 'tools', labelKey: 'home.categories.filters.tools' },
  { id: 'household', labelKey: 'home.categories.filters.household' },
  { id: 'moving', labelKey: 'home.categories.filters.moving' },
  { id: 'garden', labelKey: 'home.categories.filters.garden' },
  { id: 'camping', labelKey: 'home.categories.filters.camping' },
  { id: 'electronics', labelKey: 'home.categories.filters.electronics' },
];
