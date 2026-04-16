import Link from 'next/link';
import type { CategoryMeta } from '@/types';

interface CategoryCardProps {
  category: CategoryMeta;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div
        className={`${category.bgColor} rounded-2xl p-4 flex flex-col items-center justify-center gap-2 aspect-square hover:scale-105 transition-transform duration-200 group cursor-pointer`}
      >
        <span className="text-4xl group-hover:scale-110 transition-transform duration-200 select-none">
          {category.emoji}
        </span>
        <p className={`text-xs font-semibold text-center leading-tight ${category.textColor}`}>
          {category.label}
        </p>
      </div>
    </Link>
  );
}
