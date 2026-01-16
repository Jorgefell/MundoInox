export interface Product {
  name: string;
  image: string;
  description: string;
  specifications: string[];
}

export interface Category {
  title: string;
  description: string;
  items: Product[];
}

export interface CategoryViewProps {
  category: Category;
  onBack: () => void;
}

export interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface ProductPageProps {
  searchQuery?: string;
}