import { PageHeader } from '@/components/layout';
import { Plus } from 'lucide-react';

export function ReviewsHeader() {
  return (
    <PageHeader
      title="Müşteri Yorumları"
      description="Müşteri yorumlarını onaylayın veya reddedin. Varsayılan olarak onay bekleyen yorumlar gösterilir."
      actionButton={{
        label: 'Yeni Yorum',
        onClick: () => {},
        icon: <Plus className="h-4 w-4 mr-2" />
      }}
    />
  );
} 