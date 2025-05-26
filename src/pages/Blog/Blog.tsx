// TODO: This file contains direct window access without SSR checks
import * as React from 'react';
import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { useInView } from 'react-intersection-observer';

// Import design system components
import SectionTitle from '../../design-system/components/typography/SectionTitle';

import Container from '../../design-system/components/layout/Container';

import Card from '../../design-system/components/data-display/Card';

import Button from '../../design-system/components/button/Button';

import { FadeIn, ScrollReveal } from '../../animation';

import { FlowerOfLife, OliveBranch } from '../../design-system/botanical';


// Import sacred geometry constants
import { PHI, PHI_INVERSE, SACRED_EASINGS } from '../../constants/sacred-geometry';
import getFibonacciByIndex from '../../utils/getFibonacciByIndex';

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  publishDate: string;
  readTime: number;
  category: string;
  imageUrl: string;
  tags: string[];
  slug: string;
}

// Blog page props
interface BlogProps {
  className?: string;
  style?: React.CSSProperties;
}

// Define the active prop interface for FilterButton
interface FilterButtonProps {
  $active: boolean;
}

// Sample blog posts data (in a real app, this would come from an API)
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Financial Recovery: A Comprehensive Guide',
    excerpt: 'Learn about the process of financial recovery, common scams, and how to protect yourself from future fraud.',
    content: 'Full content would be here...',
    author: 'Dr. Sarah Johnson',
    authorRole: 'Senior Financial Recovery Specialist',
    authorImage: '/assets/images/team/sarah-johnson.jpg',
    publishDate: '2023-06-15',
    readTime: 8,
    category: 'Financial Recovery',
    imageUrl: '/assets/images/blog/financial-recovery-guide.jpg',
    tags: ['Financial Recovery', 'Fraud Prevention', 'Investment Scams'],
    slug: 'understanding-financial-recovery-guide'
  },
  {
    id: '2',
    title: 'The Psychology of Investment Scams: Why People Fall Victim',
    excerpt: 'Explore the psychological tactics used by fraudsters and how to recognize manipulation techniques.',
    content: 'Full content would be here...',
    author: 'Dr. Michael Chen',
    authorRole: 'Behavioral Finance Expert',
    authorImage: '/assets/images/team/michael-chen.jpg',
    publishDate: '2023-05-22',
    readTime: 6,
    category: 'Psychology',
    imageUrl: '/assets/images/blog/psychology-of-scams.jpg',
    tags: ['Psychology', 'Investment Scams', 'Behavioral Finance'],
    slug: 'psychology-of-investment-scams'
  },
  {
    id: '3',
    title: 'Regulatory Framework: Your Rights in Financial Recovery',
    excerpt: 'Understand the legal framework surrounding financial recovery and your rights as a victim of fraud.',
    content: 'Full content would be here...',
    author: 'Elena Rodriguez',
    authorRole: 'Legal Compliance Director',
    authorImage: '/assets/images/team/elena-rodriguez.jpg',
    publishDate: '2023-04-10',
    readTime: 10,
    category: 'Legal',
    imageUrl: '/assets/images/blog/regulatory-framework.jpg',
    tags: ['Legal', 'Regulatory Compliance', 'Consumer Rights'],
    slug: 'regulatory-framework-financial-recovery'
  },
  {
    id: '4',
    title: 'Cryptocurrency Fraud: New Challenges in Financial Recovery',
    excerpt: 'Explore the unique challenges of recovering assets lost to cryptocurrency fraud and emerging solutions.',
    content: 'Full content would be here...',
    author: 'James Wilson',
    authorRole: 'Digital Asset Recovery Specialist',
    authorImage: '/assets/images/team/james-wilson.jpg',
    publishDate: '2023-03-18',
    readTime: 7,
    category: 'Cryptocurrency',
    imageUrl: '/assets/images/blog/cryptocurrency-fraud.jpg',
    tags: ['Cryptocurrency', 'Digital Assets', 'Blockchain'],
    slug: 'cryptocurrency-fraud-recovery'
  },
  {
    id: '5',
    title: 'Success Stories: Recovering $2.5M from an International Ponzi Scheme',
    excerpt: 'A detailed case study of how we helped a client recover significant assets from a complex international fraud.',
    content: 'Full content would be here...',
    author: 'Dr. Sarah Johnson',
    authorRole: 'Senior Financial Recovery Specialist',
    authorImage: '/assets/images/team/sarah-johnson.jpg',
    publishDate: '2023-02-05',
    readTime: 9,
    category: 'Case Studies',
    imageUrl: '/assets/images/blog/success-story-ponzi.jpg',
    tags: ['Case Studies', 'Ponzi Scheme', 'International Recovery'],
    slug: 'success-story-ponzi-scheme'
  },
  {
    id: '6',
    title: 'The Future of Financial Recovery: AI and Blockchain Solutions',
    excerpt: 'How emerging technologies are transforming the landscape of financial recovery and fraud prevention.',
    content: 'Full content would be here...',
    author: 'Dr. Michael Chen',
    authorRole: 'Behavioral Finance Expert',
    authorImage: '/assets/images/team/michael-chen.jpg',
    publishDate: '2023-01-12',
    readTime: 8,
    category: 'Technology',
    imageUrl: '/assets/images/blog/future-of-recovery.jpg',
    tags: ['Technology', 'AI', 'Blockchain', 'Future Trends'],
    slug: 'future-of-financial-recovery'
  }
];

// Styled components
const BlogPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background[50]};
  padding-top: ${getFibonacciByIndex(9)}px; // 34px
  padding-bottom: ${getFibonacciByIndex(11)}px; // 89px
`;

const BlogHeader = styled.div`
  width: 100%;
  max-width: ${getFibonacciByIndex(12)}px; // 144px * 10 = 1440px
  margin: 0 auto;
  padding: 0 ${getFibonacciByIndex(7)}px; // 13px
  margin-bottom: ${getFibonacciByIndex(10)}px; // 55px
`;

const BlogFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${getFibonacciByIndex(5)}px; // 5px
  margin-bottom: ${getFibonacciByIndex(8)}px; // 21px
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterButton = styled.button<FilterButtonProps>`
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.primary[500] : 'transparent'};
  color: ${({ $active, theme }) => 
    $active ? theme.colors.white : theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.primary[500]};
  border-radius: ${getFibonacciByIndex(3)}px; // 3px
  padding: ${getFibonacciByIndex(4)}px ${getFibonacciByIndex(6)}px; // 5px 8px
  font-size: ${16 / PHI}px; // ~9.9px
  cursor: pointer;
  transition: all 0.3s cubic-bezier(${SACRED_EASINGS.standard.join(', ')});
  
  &:hover {
    background-color: ${({ $active, theme }) => 
      $active ? theme.colors.primary[600] : theme.colors.primary[50]};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${getFibonacciByIndex(10) * 10}px; // 55px * 10 = 550px
  margin-bottom: ${getFibonacciByIndex(9)}px; // 34px
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${getFibonacciByIndex(5)}px ${getFibonacciByIndex(7)}px; // 5px 13px
  padding-left: ${getFibonacciByIndex(8) + getFibonacciByIndex(5)}px; // 21px + 5px = 26px
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${getFibonacciByIndex(3)}px; // 3px
  font-size: ${16 / PHI}px; // ~9.9px
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 ${getFibonacciByIndex(2)}px ${props => props.theme.colors.primary[200]};
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: ${getFibonacciByIndex(5)}px; // 5px
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text.tertiary};
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${getFibonacciByIndex(10) * 5}px, 1fr)); // 55px * 5 = 275px
  gap: ${getFibonacciByIndex(8)}px; // 21px
  width: 100%;
  max-width: ${getFibonacciByIndex(12)}px; // 144px * 10 = 1440px
  margin: 0 auto;
  padding: 0 ${getFibonacciByIndex(7)}px; // 13px
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(${SACRED_EASINGS.standard.join(', ')});
  
  &:hover {
    transform: translateY(-${getFibonacciByIndex(3)}px); // -3px
  }
`;

const BlogImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: ${getFibonacciByIndex(9) * 5}px; // 34px * 5 = 170px
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: ${getFibonacciByIndex(3)}px ${getFibonacciByIndex(3)}px 0 0; // 3px
`;

const BlogContent = styled.div`
  padding: ${getFibonacciByIndex(7)}px; // 13px
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const BlogCategory = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary[100]};
  color: ${props => props.theme.colors.primary[700]};
  padding: ${getFibonacciByIndex(2)}px ${getFibonacciByIndex(4)}px; // 2px 5px
  border-radius: ${getFibonacciByIndex(2)}px; // 2px
  font-size: ${16 / (PHI * PHI)}px; // ~6.1px
  margin-bottom: ${getFibonacciByIndex(4)}px; // 5px
`;

const BlogTitle = styled.h3`
  font-size: ${16 * PHI_INVERSE + 8}px; // ~18px
  margin-bottom: ${getFibonacciByIndex(4)}px; // 5px
  line-height: ${PHI};
  color: ${props => props.theme.colors.text.primary};
`;

const BlogExcerpt = styled.p`
  font-size: ${16 / PHI}px; // ~9.9px
  line-height: ${PHI};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${getFibonacciByIndex(6)}px; // 8px
  flex-grow: 1;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${getFibonacciByIndex(6)}px; // 8px
`;

const AuthorImage = styled.img`
  width: ${getFibonacciByIndex(7)}px; // 13px
  height: ${getFibonacciByIndex(7)}px; // 13px
  border-radius: 50%;
  margin-right: ${getFibonacciByIndex(4)}px; // 5px
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-size: ${16 / (PHI * PHI)}px; // ~6.1px
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const PublishDate = styled.span`
  font-size: ${16 / (PHI * PHI * PHI)}px; // ~3.8px
  color: ${props => props.theme.colors.text.tertiary};
`;

const ReadTime = styled.span`
  font-size: ${16 / (PHI * PHI * PHI)}px; // ~3.8px
  color: ${props => props.theme.colors.text.tertiary};
  margin-left: auto;
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${getFibonacciByIndex(3)}px; // 3px
  margin-top: auto;
`;

const BlogTag = styled.span`
  font-size: ${16 / (PHI * PHI * PHI)}px; // ~3.8px
  color: ${props => props.theme.colors.text.tertiary};
  background-color: ${props => props.theme.colors.background[100]};
  padding: ${getFibonacciByIndex(2)}px ${getFibonacciByIndex(3)}px; // 2px 3px
  border-radius: ${getFibonacciByIndex(2)}px; // 2px
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${getFibonacciByIndex(10)}px; // 55px
`;

const PaginationButton = styled.button<FilterButtonProps>`
  width: ${getFibonacciByIndex(7)}px; // 13px
  height: ${getFibonacciByIndex(7)}px; // 13px
  border-radius: 50%;
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.primary[500] : 'transparent'};
  border: 1px solid ${props => props.theme.colors.primary[500]};
  margin: 0 ${getFibonacciByIndex(3)}px; // 3px
  cursor: pointer;
  transition: all 0.3s cubic-bezier(${SACRED_EASINGS.standard.join(', ')});
  
  &:hover {
    background-color: ${({ $active, theme }) => 
      $active ? theme.colors.primary[600] : theme.colors.primary[50]};
  }
`;

const BotanicalAccent = styled.div`
  position: absolute;
  top: ${PHI_INVERSE * 100}%;
  right: ${PHI_INVERSE * 100}%;
  transform: translate(50%, -50%);
  opacity: 0.1;
  z-index: 0;
`;

const BotanicalAccent2 = styled.div`
  position: absolute;
  bottom: ${PHI_INVERSE * 100}%;
  left: ${PHI_INVERSE * 100}%;
  transform: translate(-50%, 50%);
  opacity: 0.1;
  z-index: 0;
`;

// Blog page component
const Blog: React.FC<BlogProps> = ({ className, style }) => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  
  // Get unique categories from blog posts
  const categories = ['All', ...Array.from(new Set(sampleBlogPosts.map(post => post.category)))];
  
  // Filter posts based on search query and active category
  const filteredPosts = sampleBlogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Intersection Observer for animations
  const [headerRef] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [gridRef] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Render blog posts
  const renderPosts = () => {
    if (currentPosts.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: `${getFibonacciByIndex(10)}px 0` }}>
          <h3>No posts found matching your criteria</h3>
          <p>Try adjusting your search or filter settings</p>
          <Button 
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            variant="secondary"
            style={{ marginTop: getFibonacciByIndex(7) }}
          >
            Reset Filters
          </Button>
        </div>
      );
    }
    
    return currentPosts.map((post) => (
      <BlogCard key={post.id}>
        <BlogImage $imageUrl={post.imageUrl} />
        <BlogContent>
          <BlogCategory>{post.category}</BlogCategory>
          <BlogTitle>{post.title}</BlogTitle>
          <BlogExcerpt>{post.excerpt}</BlogExcerpt>
          
          <BlogMeta>
            <AuthorImage src={post.authorImage} alt={post.author} />
            <AuthorInfo>
              <AuthorName>{post.author}</AuthorName>
              <PublishDate>{new Date(post.publishDate).toLocaleDateString()}</PublishDate>
            </AuthorInfo>
            <ReadTime>{post.readTime} min read</ReadTime>
          </BlogMeta>
          
          <BlogTags>
            {post.tags.slice(0, 3).map(tag => (
              <BlogTag key={tag}>#{tag}</BlogTag>
            ))}
          </BlogTags>
          
          <Button 
            variant="outline" 
            size="small"
            style={{ marginTop: `${getFibonacciByIndex(5)}px`, alignSelf: 'flex-start' }}
          >
            Read More
          </Button>
        </BlogContent>
      </BlogCard>
    ));
  };
  
  return (
    <BlogPageContainer className={className} style={style}>
      <Container>
        <BotanicalAccent>
          <FlowerOfLife
            size="xl"
            color="#4a6eb3"
            opacity={0.7}
          />
        </BotanicalAccent>
        
        <BotanicalAccent2>
          <OliveBranch
            size="lg"
            color="#4a6eb3"
            opacity={0.7}
          />
        </BotanicalAccent2>
        
        <BlogHeader ref={headerRef}>
          <FadeIn delay={0.1}>
            <SectionTitle 
              title="Recovery Office Blog" 
              subtitle="Insights, guides, and success stories from our financial recovery experts"
              align="center"
              size="large"
            />
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <BlogFilters>
              <FilterButton 
                $active={activeCategory === 'All'}
                onClick={() => setActiveCategory('All')}
              >
                All
              </FilterButton>
              {categories.slice(1).map(category => (
                <FilterButton 
                  key={category}
                  $active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </FilterButton>
              ))}
            </BlogFilters>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <SearchContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput 
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </FadeIn>
        </BlogHeader>
        
        <BlogGrid ref={gridRef}>
          <ScrollReveal>
            {renderPosts()}
          </ScrollReveal>
        </BlogGrid>
        
        {totalPages > 1 && (
          <PaginationContainer>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationButton 
                key={page}
                $active={currentPage === page}
                onClick={() => handlePageChange(page)}
              />
            ))}
          </PaginationContainer>
        )}
      </Container>
    </BlogPageContainer>
  );
};

export default Blog; 










