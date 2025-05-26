import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BlogArticle, ResourceType } from './types';
import { PHI } from '../../constants/sacred-geometry';

// Resource card container
const ResourceCardContainer = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

// Resource preview
const ResourcePreview = styled.div`
  position: relative;
  padding-top: 75%; /* 4:3 aspect ratio */
  background-color: ${props => props.theme.colors.background.light};
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Document preview overlay
const DocumentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ResourceCardContainer}:hover & {
    opacity: 1;
  }
`;

// Resource type badge
const TypeBadge = styled.div<{resourceType: ResourceType}>`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
  background-color: ${props => getTypeColor(props.resourceType).bg};
  color: ${props => getTypeColor(props.resourceType).text};
`;

// Resource content
const ResourceContent = styled.div`
  padding: ${PHI * 16}px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// Resource title
const ResourceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 ${PHI * 8}px;
  line-height: 1.4;
  color: ${props => props.theme.colors.text.primary};
`;

// Resource description
const ResourceDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
  margin: 0 0 ${PHI * 16}px;
  flex-grow: 1;
`;

// Resource meta
const ResourceMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${PHI * 12}px;
  padding-top: ${PHI * 12}px;
  border-top: 1px solid ${props => props.theme.colors.border.light};
  font-size: 0.85rem;
  color: ${props => props.theme.colors.text.secondary};
`;

// File details
const FileDetails = styled.div`
  display: flex;
  align-items: center;
`;

// File type
const FileType = styled.span`
  text-transform: uppercase;
  margin-right: 8px;
`;

// File size
const FileSize = styled.span``;

// Download button
const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary[600]};
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  margin-top: ${PHI * 16}px;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.primary[700]};
  }
`;

// Helper to get colors based on resource type
const getTypeColor = (type: ResourceType) => {
  switch (type) {
    case 'guide':
      return { bg: '#E3F2FD', text: '#1565C0' };
    case 'checklist':
      return { bg: '#E8F5E9', text: '#2E7D32' };
    case 'template':
      return { bg: '#F3E5F5', text: '#7B1FA2' };
    case 'report':
      return { bg: '#FFEBEE', text: '#C62828' };
    case 'case-study':
      return { bg: '#FFF8E1', text: '#F57F17' };
    case 'whitepaper':
      return { bg: '#E0F7FA', text: '#00838F' };
    default:
      return { bg: '#F5F5F5', text: '#424242' };
  }
};

// Helper to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Icons
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ResourceCardProps {
  resource: BlogArticle & {
    resourceType: ResourceType;
    fileSize?: number;
  };
  delay?: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, delay = 0 }) => {
  const {
    title,
    excerpt,
    image,
    downloadUrl,
    downloadType = 'pdf',
    resourceType,
    fileSize = 1024 * 1024 * 2.5 // Default 2.5MB
  } = resource;

  return (
    <ResourceCardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <ResourcePreview>
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <DocumentOverlay style={{ opacity: 1 }}>
            <DocumentIcon />
          </DocumentOverlay>
        )}
        
        {image && (
          <DocumentOverlay>
            <DocumentIcon />
          </DocumentOverlay>
        )}
        
        <TypeBadge resourceType={resourceType}>
          {resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}
        </TypeBadge>
      </ResourcePreview>
      
      <ResourceContent>
        <ResourceTitle>{title}</ResourceTitle>
        <ResourceDescription>{excerpt}</ResourceDescription>
        
        <ResourceMeta>
          <FileDetails>
            <FileType>{downloadType.toUpperCase()}</FileType>
            <FileSize>{formatFileSize(fileSize)}</FileSize>
          </FileDetails>
        </ResourceMeta>
        
        <DownloadButton href={downloadUrl} download>
          <DownloadIcon />
          Download
        </DownloadButton>
      </ResourceContent>
    </ResourceCardContainer>
  );
};

export default ResourceCard; 