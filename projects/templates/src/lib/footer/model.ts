export interface LinksWidget {
  id: number;
  category: string;
  items: LinkItem[];
}

export interface LinkItem {
  id: number;
  href: string;
  title: string;
  text: string;
}

export interface ImageWidget {
  id: number;
  title: string;
  url: string;
}