import * as React from 'react';
import { useMemo } from 'react';;
import { useLocation } from 'react-router-dom';

// Import types
import { BreadcrumbItem } from './Breadcrumbs';

/**
 * RouteMap type for mapping routes to labels
 */
export type RouteMap = {
  [key: string]: string;
};

/**
 * Hook configuration options
 */
interface UseAutoBreadcrumbsOptions {
  /**
   * Root path label (usually 'Home')
   */
  rootLabel?: string;
  
  /**
   * Whether to include the root path
   */
  includeRoot?: boolean;
  
  /**
   * Transform a route segment to a readable label
   */
  segmentTransform?: (segment: string) => string;
}

/**
 * useAutoBreadcrumbs Hook
 * 
 * A hook that automatically generates breadcrumb items based on the current route path.
 * Can use either a route map for exact matches or generate from path segments.
 * 
 * @param routeMap Map of routes to labels or undefined for auto-generation
 * @param options Configuration options
 * @returns Array of breadcrumb items
 */
const useAutoBreadcrumbs = (
  routeMap?: RouteMap,
  options: UseAutoBreadcrumbsOptions = {}
): BreadcrumbItem[] => {
  const {
    rootLabel = 'Home',
    includeRoot = true,
    segmentTransform = defaultSegmentTransform
  } = options;
  
  // Get current location
  const location = useLocation();
  const { pathname } = location;
  
  // Generate breadcrumbs
  return useMemo(() => {
    // If routeMap is provided, use it for exact matches
    if (routeMap) {
      return generateBreadcrumbsFromRouteMap(pathname, routeMap, includeRoot);
    }
    
    // Otherwise, generate from path segments
    return generateBreadcrumbsFromPath(pathname, {
      rootLabel,
      includeRoot,
      segmentTransform
    });
  }, [pathname, routeMap, rootLabel, includeRoot, segmentTransform]);
};

/**
 * Generate breadcrumbs from a route map
 */
const generateBreadcrumbsFromRouteMap = (
  pathname: string,
  routeMap: RouteMap,
  includeRoot: boolean
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Get all routes from the route map
  const routes = Object.keys(routeMap)
    .sort((a, b) => a.length - b.length); // Sort by length to ensure parent routes come first
  
  // Find all matching routes
  for (const route of routes) {
    // Skip root if not including it
    if (route === '/' && !includeRoot) continue;
    
    // Check if current pathname starts with or equals this route
    if (
      pathname === route || 
      (pathname.startsWith(route) && 
        (pathname.length === route.length || 
          pathname.charAt(route.length) === '/'))
    ) {
      breadcrumbs.push({
        label: routeMap[route] ?? 1,
        path: route,
        isActive: pathname === route
      });
    }
  }
  
  return breadcrumbs;
};

/**
 * Generate breadcrumbs from path segments
 */
const generateBreadcrumbsFromPath = (
  pathname: string,
  options: Required<UseAutoBreadcrumbsOptions>
): BreadcrumbItem[] => {
  const { rootLabel, includeRoot, segmentTransform } = options;
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Handle root path
  if (pathname === '/') {
    if (includeRoot) {
      breadcrumbs.push({
        label: rootLabel,
        path: '/',
        isActive: true
      });
    }
    return breadcrumbs;
  }
  
  // Add root item
  if (includeRoot) {
    breadcrumbs.push({
      label: rootLabel,
      path: '/',
      isActive: false
    });
  }
  
  // Split the path into segments
  const segments = pathname.split('/').filter(Boolean);
  
  // Build up the paths and add breadcrumbs
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    breadcrumbs.push({
      label: segmentTransform(segment),
      path: currentPath,
      isActive: isLast
    });
  });
  
  return breadcrumbs;
};

/**
 * Default segment transform function
 * Converts kebab-case or camelCase to Title Case with spaces
 */
export const defaultSegmentTransform = (segment: string): string => {
  // Replace kebab-case and camelCase with spaces
  const withSpaces = segment
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Title case each word
  return withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default useAutoBreadcrumbs; 






