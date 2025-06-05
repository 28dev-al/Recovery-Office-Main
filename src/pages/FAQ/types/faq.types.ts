export interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  relatedQuestions: string[];
  urgencyLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  questionsCount: number;
  avgReadTime: string;
  questions: FAQQuestion[];
}

export interface QuickAnswer {
  id: string;
  trigger: string[];
  question: string;
  answer: string;
  cta: string;
  category?: string;
}

export interface GuidancePath {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  avgConsultationTime: string;
  successRate: string;
  icon: string;
  color: string;
  filterTags: string[];
}

export interface FAQSearchResult {
  question: FAQQuestion;
  category: FAQCategory;
  relevanceScore: number;
  matchedTags: string[];
}

export interface FAQAnalytics {
  questionId: string;
  views: number;
  searchQueries: string[];
  conversionToConsultation: boolean;
  lastViewed: string;
}

export interface FAQFilterOptions {
  categories: string[];
  tags: string[];
  urgencyLevel: ('low' | 'medium' | 'high')[];
  searchQuery: string;
} 