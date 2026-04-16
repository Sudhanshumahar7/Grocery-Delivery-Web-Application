// ─── Enums ───────────────────────────────────────────────────────────────────

export enum ProductCategory {
  FruitsAndVegetables = 'fresh-fruits-&-vegetable',
  CookingOilAndGhee = 'cooking-oil-&-ghee',
  MeatAndFish = 'meat-&-fish',
  BakeryAndSnacks = 'bakery-&-snacks',
  DairyAndEggs = 'dairy-&-eggs',
  Beverages = 'beverages',
  Pulses = 'pulses',
  Rice = 'rice',
  Noodles = 'noodles-&-pasta',
  Chips = 'chips-&-crisps',
  FastFood = 'fast-food',
  Spices = 'spices-&-herbs',
}

export enum OrderStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Preparing = 'preparing',
  OnTheWay = 'on_the_way',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
  Failed = 'failed',
}

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  brand?: string;
  description?: string;
  nutrition?: NutritionInfo;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  isExclusiveOffer?: boolean;
  isBestSelling?: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  zone?: string;
  area?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: string;
  promoCode?: string;
  discount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Zone {
  id: string;
  name: string;
  areas: Area[];
}

export interface Area {
  id: string;
  name: string;
  zoneId: string;
}

export interface FilterOptions {
  categories: ProductCategory[];
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly: boolean;
}

export interface CategoryMeta {
  slug: ProductCategory;
  label: string;
  emoji: string;
  bgColor: string;
  textColor: string;
}
