import React, { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { BlogHero } from './components/BlogHero';
import { blogCategories } from './data/blogCategories';
import { allBlogPosts } from './data/blogPosts';
import { formatCurrencyCAD } from '../../utils/formatters';

// Import design system tokens
const PREMIUM_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64
};

const PREMIUM_COLORS = {
  primary: '#1a365d',
  secondary: '#d69e2e',
  background: '#f7fafc',
  text: '#2d3748',
  textLight: '#4a5568',
  border: '#e2e8f0',
  white: '#ffffff',
  highlight: '#edf2f7'
};

const TYPOGRAPHY = {
  sizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

const BlogContainer = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.background} 0%, ${PREMIUM_COLORS.white} 100%);
  min-height: 100vh;
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${PREMIUM_SPACING.lg}px;

  @media (max-width: 768px) {
    padding: 0 ${PREMIUM_SPACING.md}px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${PREMIUM_SPACING.xxl}px;
  margin: ${PREMIUM_SPACING.xxxl}px 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.xl}px;
  }
`;

const BlogContent = styled.section`
  /* Main blog content area */
`;

const BlogSidebar = styled.aside`
  /* Sidebar for categories, recent posts, CTA */
  background: ${PREMIUM_COLORS.white};
  border-radius: 16px;
  padding: ${PREMIUM_SPACING.xl}px;
  height: fit-content;
  position: sticky;
  top: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 1024px) {
    position: static;
    margin-top: ${PREMIUM_SPACING.xl}px;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${TYPOGRAPHY.sizes.xxxl};
  font-weight: ${TYPOGRAPHY.weights.bold};
  color: ${PREMIUM_COLORS.primary};
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${TYPOGRAPHY.sizes.xxl};
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${PREMIUM_SPACING.md}px;
  margin-bottom: ${PREMIUM_SPACING.xl}px;
  padding: ${PREMIUM_SPACING.lg}px;
  background: ${PREMIUM_COLORS.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    gap: ${PREMIUM_SPACING.sm}px;
    padding: ${PREMIUM_SPACING.md}px;
  }
`;

const FilterChip = styled.button<{ active: boolean }>`
  background: ${props => props.active ? PREMIUM_COLORS.primary : PREMIUM_COLORS.highlight};
  color: ${props => props.active ? PREMIUM_COLORS.white : PREMIUM_COLORS.text};
  border: 1px solid ${props => props.active ? PREMIUM_COLORS.primary : PREMIUM_COLORS.border};
  border-radius: 20px;
  padding: ${PREMIUM_SPACING.sm}px ${PREMIUM_SPACING.lg}px;
  font-size: ${TYPOGRAPHY.sizes.sm};
  font-weight: ${TYPOGRAPHY.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? PREMIUM_COLORS.primary : PREMIUM_COLORS.primary};
    color: ${PREMIUM_COLORS.white};
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${PREMIUM_COLORS.secondary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.md}px;
    font-size: 0.75rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${PREMIUM_SPACING.xl}px;
  margin-bottom: ${PREMIUM_SPACING.xxl}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.lg}px;
  }
`;

const BlogCard = styled.article`
  background: ${PREMIUM_COLORS.white};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, ${PREMIUM_COLORS.secondary} 100%);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm0-20C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0z'/%3E%3C/g%3E%3C/svg%3E") repeat;
  }
`;

const CardContent = styled.div`
  padding: ${PREMIUM_SPACING.xl}px;
`;

const CategoryBadge = styled.span`
  background: ${PREMIUM_COLORS.secondary};
  color: ${PREMIUM_COLORS.white};
  padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.md}px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: ${TYPOGRAPHY.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardTitle = styled.h3`
  font-size: ${TYPOGRAPHY.sizes.xl};
  font-weight: ${TYPOGRAPHY.weights.semibold};
  color: ${PREMIUM_COLORS.primary};
  margin: ${PREMIUM_SPACING.lg}px 0 ${PREMIUM_SPACING.md}px;
  line-height: 1.3;
`;

const CardExcerpt = styled.p`
  font-size: ${TYPOGRAPHY.sizes.md};
  color: ${PREMIUM_COLORS.textLight};
  line-height: 1.5;
  margin-bottom: ${PREMIUM_SPACING.lg}px;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${TYPOGRAPHY.sizes.sm};
  color: ${PREMIUM_COLORS.textLight};

  .read-time {
    font-weight: ${TYPOGRAPHY.weights.medium};
  }
`;

const SidebarSection = styled.div`
  margin-bottom: ${PREMIUM_SPACING.xl}px;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: ${TYPOGRAPHY.sizes.lg};
    font-weight: ${TYPOGRAPHY.weights.semibold};
    color: ${PREMIUM_COLORS.primary};
    margin-bottom: ${PREMIUM_SPACING.lg}px;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${PREMIUM_COLORS.text};
    text-decoration: none;
    padding: ${PREMIUM_SPACING.md}px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: ${PREMIUM_COLORS.highlight};
      color: ${PREMIUM_COLORS.primary};
    }

    .count {
      background: ${PREMIUM_COLORS.highlight};
      color: ${PREMIUM_COLORS.textLight};
      padding: ${PREMIUM_SPACING.xs}px ${PREMIUM_SPACING.sm}px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: ${TYPOGRAPHY.weights.medium};
    }
  }
`;

const ConsultationCTA = styled.div`
  background: linear-gradient(135deg, ${PREMIUM_COLORS.primary} 0%, #2c5282 100%);
  color: ${PREMIUM_COLORS.white};
  padding: ${PREMIUM_SPACING.xl}px;
  border-radius: 12px;
  text-align: center;

  h3 {
    color: ${PREMIUM_COLORS.white};
    margin-bottom: ${PREMIUM_SPACING.md}px;
  }

  p {
    margin-bottom: ${PREMIUM_SPACING.lg}px;
    opacity: 0.9;
  }

  .cta-button {
    display: inline-block;
    background: ${PREMIUM_COLORS.secondary};
    color: ${PREMIUM_COLORS.white};
    padding: ${PREMIUM_SPACING.md}px ${PREMIUM_SPACING.xl}px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: ${TYPOGRAPHY.weights.semibold};
    transition: all 0.3s ease;

    &:hover {
      background: #b7791f;
      transform: translateY(-2px);
    }
  }
`;

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter posts based on selected category and search query
  const filteredPosts = useMemo(() => {
    let posts = allBlogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.length > 2) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return posts;
  }, [selectedCategory, searchQuery]);

  // Handle category filter
  const handleCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Get category display name
  const getCategoryName = (categoryId: string) => {
    const category = blogCategories.find(cat => cat.id === categoryId);
    return category ? category.name : 'All Posts';
  };

  return (
    <>
      <Helmet>
        <title>Financial Asset Recovery Blog | Expert Insights & Case Studies | Recovery Office</title>
        <meta 
          name="description" 
          content="Expert insights on financial asset recovery, investment fraud recovery, and cryptocurrency recovery from Canada's leading specialists. $750M+ recovered, 185+ expert articles." 
        />
        <meta 
          name="keywords" 
          content="financial asset recovery, investment fraud recovery, cryptocurrency recovery, Ponzi scheme recovery, UK financial recovery specialists, recovery case studies" 
        />
        <link rel="canonical" href="https://recovery-office.com/blog" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Financial Asset Recovery Blog | Recovery Office" />
        <meta property="og:description" content="Expert insights on financial asset recovery from Canadian specialists who have recovered $750M+ in client assets." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://recovery-office.com/blog" />
        <meta property="og:image" content="https://recovery-office.com/assets/images/blog-og.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Asset Recovery Blog | Recovery Office" />
        <meta name="twitter:description" content="Expert insights on financial asset recovery from UK specialists." />
        <meta name="twitter:image" content="https://recovery-office.com/assets/images/blog-twitter.jpg" />
        
        {/* Structured data for blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Financial Asset Recovery Blog",
            "description": "Expert insights and case studies on financial asset recovery",
            "url": "https://recovery-office.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Recovery Office",
              "url": "https://recovery-office.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://recovery-office.com/logo.png"
              }
            },
            "author": {
              "@type": "Organization",
              "name": "Recovery Office Expert Team"
            }
          })}
        </script>
      </Helmet>

      <BlogContainer>
        <BlogHero 
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
        />
        
        <MainContent>
          <ContentGrid>
            <BlogContent>
              <SectionTitle>
                {selectedCategory === 'all' ? 'Latest Insights' : getCategoryName(selectedCategory)}
              </SectionTitle>
              
              <FilterBar>
                <FilterChip 
                  active={selectedCategory === 'all'}
                  onClick={() => handleCategoryFilter('all')}
                >
                  All Posts ({allBlogPosts.length})
                </FilterChip>
                {blogCategories.filter(cat => cat.featured).map(category => (
                  <FilterChip
                    key={category.id}
                    active={selectedCategory === category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                  >
                    {category.name} ({category.posts})
                  </FilterChip>
                ))}
              </FilterBar>

              <BlogGrid>
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} onClick={() => window.location.href = `/blog/${post.slug}`}>
                    <CardImage />
                    <CardContent>
                      <CategoryBadge>
                        {getCategoryName(post.category)}
                      </CategoryBadge>
                      <CardTitle>{post.title}</CardTitle>
                      <CardExcerpt>{post.excerpt}</CardExcerpt>
                      <CardMeta>
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        <span className="read-time">{post.readTime} min read</span>
                      </CardMeta>
                    </CardContent>
                  </BlogCard>
                ))}
              </BlogGrid>

              {filteredPosts.length === 0 && (
                <div style={{ textAlign: 'center', padding: `${PREMIUM_SPACING.xxl}px` }}>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.lg, color: PREMIUM_COLORS.textLight }}>
                    No posts found matching your criteria.
                  </p>
                  <p style={{ fontSize: TYPOGRAPHY.sizes.md, color: PREMIUM_COLORS.textLight }}>
                    Try adjusting your search terms or browse all categories.
                  </p>
                </div>
              )}
            </BlogContent>

            <BlogSidebar>
              <SidebarSection>
                <h3>Categories</h3>
                <CategoryList>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryFilter('all'); }}>
                      <span>All Posts</span>
                      <span className="count">{allBlogPosts.length}</span>
                    </a>
                  </li>
                  {blogCategories.map(category => (
                    <li key={category.id}>
                      <a 
                        href={`/blog/category/${category.slug}`}
                        onClick={(e) => { e.preventDefault(); handleCategoryFilter(category.id); }}
                      >
                        <span>{category.name}</span>
                        <span className="count">{category.posts}</span>
                      </a>
                    </li>
                  ))}
                </CategoryList>
              </SidebarSection>

              <SidebarSection>
                <ConsultationCTA>
                  <h3>Need Expert Guidance?</h3>
                  <p>
                    Get personalized advice for your specific recovery case from our specialists.
                  </p>
                  <a href="/booking" className="cta-button">
                    Schedule Consultation
                  </a>
                </ConsultationCTA>
              </SidebarSection>
            </BlogSidebar>
          </ContentGrid>
        </MainContent>
      </BlogContainer>
    </>
  );
}; 