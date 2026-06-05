export type ContactChannelIcon = 'phone' | 'mail' | 'map-pin' | 'clock';

export interface ContactChannel {
  icon: ContactChannelIcon;
  label: string;
  value: string;
  subtext: string;
  link: string | null;
}

export const channels: ContactChannel[] = [
  {
    icon: 'phone',
    label: 'CONTACT.CARDS.PHONE.LABEL',
    value: '+49 176 61653937',
    subtext: 'CONTACT.CARDS.PHONE.SUBTEXT',
    link: 'tel:+4917661653937',
  },
  {
    icon: 'mail',
    label: 'CONTACT.CARDS.EMAIL.LABEL',
    value: 'hello@borvi.de',
    subtext: 'CONTACT.CARDS.EMAIL.SUBTEXT',
    link: 'mailto:hello@borvi.de',
  },
  {
    icon: 'map-pin',
    label: 'CONTACT.CARDS.ADDRESS.LABEL',
    value: 'Maisach 82216 / München',
    subtext: 'CONTACT.CARDS.ADDRESS.SUBTEXT',
    link: 'https://www.google.com/maps?q=Maisach+82216,+München,+Germany',
  },
  {
    icon: 'clock',
    label: 'CONTACT.CARDS.HOURS.LABEL',
    value: 'Mo-Sa 8:00 - 20:00 Uhr',
    subtext: 'CONTACT.CARDS.HOURS.SUBTEXT',
    link: null,
  },
];
