export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  estimatedLoss: number | string;
  lossType: string;
  urgencyLevel: string;
  description: string;
  source: string;
  leadStatus: string;
  priority: string;
  contactAttempts: number;
  qualificationScore: number;
  ipAddress: string;
  userAgent: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  confirmationSent: boolean;
  internalNotificationSent: boolean;
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalLeads: number;
  leadsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LeadsApiResponseSuccess {
  success: true;
  data: {
    leads: Lead[];
    pagination: Pagination;
    filters: Record<string, unknown>;
  };
}

export type LeadsApiResponse = LeadsApiResponseSuccess | Lead[]; 