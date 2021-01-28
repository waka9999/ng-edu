import { ImageWidget, LinksWidget } from 'projects/templates/src/lib/footer';

export const linksWidgets: LinksWidget[] = [
  {
    id: 1,
    category: 'Company',
    items: [
      { id: 1, href: '#', title: 'About Us', text: 'About Us' },
      { id: 2, href: '#', title: 'Blog', text: 'Blog' },
      { id: 3, href: '#', title: 'Contact', text: 'Contact' },
      { id: 4, href: '#', title: 'Faqs', text: 'Faqs' },
    ],
  },
  {
    id: 2,
    category: 'Links',
    items: [
      { id: 1, href: '#', title: 'Courses', text: 'Courses' },
      { id: 2, href: '#', title: 'Events', text: 'Events' },
      { id: 3, href: '#', title: 'Gallery', text: 'Gallery' },
      { id: 4, href: '#', title: 'Faqs', text: 'Faqs' },
    ],
  },
  {
    id: 3,
    category: 'Site',
    items: [
      { id: 1, href: '#', title: 'Privacy', text: 'Privacy' },
      { id: 2, href: '#', title: 'Site Map', text: 'Site Map' },
      { id: 3, href: '#', title: 'Terms', text: 'Terms' },
      { id: 4, href: '#', title: 'Help', text: 'Help' },
    ],
  },
  {
    id: 4,
    category: 'Links',
    items: [
      { id: 1, href: '#', title: 'Courses', text: 'Courses' },
      { id: 2, href: '#', title: 'Events', text: 'Events' },
      { id: 3, href: '#', title: 'Gallery', text: 'Gallery' },
      { id: 4, href: '#', title: 'Faqs', text: 'Faqs' },
    ],
  },
];

export const imageWidget: ImageWidget = {
  id: 1,
  title: 'edu',
  url: '/assets/images/qrcode.png',
};
