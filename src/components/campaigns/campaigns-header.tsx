'use client';

import { PageHeader } from '@/components/layout/page-header';

interface CampaignsHeaderProps {
  onAddCampaign: () => void;
}

/**
 * Header component for campaigns page
 * Contains title, description and add campaign action button
 */
export function CampaignsHeader({ onAddCampaign }: CampaignsHeaderProps) {
  return (
    <PageHeader
      title="Campaigns"
      description="Manage platform campaigns, discounts and promotional offers"
      actionButton={{
        label: 'Add Campaign',
        onClick: onAddCampaign,
      }}
    />
  );
}
