/**
 * Blog article author type
 */
export interface BlogAuthor {
  id: string;
  name: string;
  bio?: string;
  avatar: string;
  role?: string;
  links?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

/**
 * Blog article category type
 */
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

/**
 * Blog article type
 */
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: BlogCategory;
  author: BlogAuthor;
  readTime?: number;
  tags?: string[];
  relatedArticles?: string[]; // Array of related article IDs
  isFeatured?: boolean;
  isDownloadable?: boolean;
  downloadUrl?: string;
  downloadType?: 'pdf' | 'docx' | 'xlsx';
}

/**
 * Blog search params
 */
export interface BlogSearchParams {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
  sortBy?: 'date' | 'title' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Resource types for downloadable content
 */
export type ResourceType = 'guide' | 'checklist' | 'template' | 'report' | 'case-study' | 'whitepaper'; 