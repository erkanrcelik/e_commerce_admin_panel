'use client';

import { Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import type { AdminCategory } from '@/types/admin-categories';

interface CategoryCardProps {
  category: AdminCategory;
  onEdit: (category: AdminCategory) => void;
  onDelete: (category: AdminCategory) => void;
  onToggleStatus: (category: AdminCategory) => void;
}

/**
 * Category card component for displaying category information
 * Supports admin category structure with imageUrl and proper Next.js image optimization
 */
export function CategoryCard({
  category,
  onEdit,
  onDelete,
  onToggleStatus,
}: CategoryCardProps) {
  /**
   * Get the display image URL with fallback
   */
  const getImageUrl = () => {
    // API has image field, check imageUrl for backward compatibility
    if (category.image) {
      return category.image;
    }
    if (category.imageUrl) {
      return category.imageUrl;
    }
    // Fallback to a placeholder image
    return `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop`;
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={getImageUrl()}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onToggleStatus(category)}
            className="h-8 w-8 p-0"
            title={
              category.isActive ? 'Deactivate category' : 'Activate category'
            }
          >
            {category.isActive ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {category.description}
            </p>
          </div>
          <div className="flex gap-1 ml-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(category)}
              className="h-8 w-8 p-0"
              title="Edit category"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(category)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              title="Delete category"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant={category.isActive ? 'default' : 'secondary'}>
            {category.isActive ? 'Active' : 'Inactive'}
          </Badge>
          <div className="text-xs text-muted-foreground">
            Created: {new Date(category.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
