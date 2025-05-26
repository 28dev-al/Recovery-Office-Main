/**
 * ContactMap Section Component
 * 
 * Map section for the Contact page showing office locations.
 * Features botanical markers and sacred geometry proportions.
 */

import * as React from 'react';
import { useState } from 'react';
import { Box, Container } from '../../../design-system/components/layout';
import { Section, SectionTitle, SectionContent } from '../../../design-system/components/layout/Section';
import { Text, Heading } from '../../../design-system/components/typography';
import { Card } from '../../../design-system/components/data-display';
import { FlowerOfLife } from '../../../design-system/botanical';

import { ScrollReveal, FadeIn } from '../../../animation';
import { PHI } from '../../../constants/sacred-geometry';

// Office location interface
export interface OfficeLocation {
  id: string;
  name: string;
  address: string[];
  email: string;
  phone: string;
  fax?: string;
  hours: {
    [key: string]: string;
  };
}

// Map marker component with botanical styling
interface MapMarkerProps {
  selected: boolean;
  onClick?: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ selected, onClick }) => (
  <div
    style={{
      position: 'relative',
      width: `${PHI * 24}px`,
      height: `${PHI * 24}px`,
      cursor: 'pointer'
    }}
  >
    <button
      onClick={onClick}
      aria-pressed={selected}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 2,
        cursor: 'pointer'
      }}
      aria-label="Select office location"
    />
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      style={{
        backgroundColor: selected ? '#4a6eb3' : '#86b378',
        borderRadius: '50%',
        boxShadow: selected 
          ? '0 0 0 2px white, 0 0 0 4px #4a6eb3, 0 4px 8px rgba(0,0,0,0.2)'
          : '0 0 0 2px white, 0 0 0 3px #86b378, 0 2px 4px rgba(0,0,0,0.1)',
        transform: selected ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease'
      }}
    />
    <Box
      position="absolute"
      top="50%"
      left="50%"
      style={{
        transform: 'translate(-50%, -50%)',
        opacity: 0.9,
        transition: 'opacity 0.3s ease'
      }}
    >
      <FlowerOfLife 
        size="xs" 
        primaryColor="white" 
        secondaryColor="rgba(255,255,255,0.8)" 
      />
    </Box>
  </div>
);

// Info window component
interface InfoWindowProps {
  office: OfficeLocation;
}

const InfoWindow: React.FC<InfoWindowProps> = ({ office }) => (
  <Card
    elevation={3}
    padding={`${PHI * 16}px`}
    borderRadius="8px"
    style={{
      backgroundColor: 'white',
      maxWidth: `${PHI * PHI * 100}px`,
      position: 'absolute',
      bottom: `${PHI * 32}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}
  >
    <Heading as="h4" variant="h6" marginBottom={`${PHI * 8}px`}>
      {office.name}
    </Heading>
    {office.address.map((line: string, index: number) => (
      <Text key={`address-info-${index}`} variant="body2">
        {line}{index < office.address.length - 1 ? <br /> : null}
      </Text>
    ))}
    <Text variant="body2" marginTop={`${PHI * 8}px`}>
      <strong>Hours:</strong> {office.hours['Monday - Friday']}
    </Text>
    <Text variant="body2">
      <strong>Phone:</strong> {office.phone}
    </Text>
  </Card>
);

interface ContactMapProps {
  /**
   * Office locations to display on the map
   */
  locations?: OfficeLocation[];
  /**
   * Height of the map in pixels
   */
  height?: number;
  /**
   * Background color for the map section
   */
  backgroundColor?: string;
}

const ContactMap: React.FC<ContactMapProps> = ({ 
  locations = [], 
  height = PHI * 300,
  backgroundColor = "#f0f4f8"
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    locations.length > 0 ? locations[0]?.id || null : null
  );

  // Get the selected office data
  const selectedOffice = locations.find(office => office.id === selectedLocation) || 
    (locations.length > 0 ? locations[0] : null);

  return (
    <Section backgroundColor={backgroundColor}>
      <Container>
        <ScrollReveal>
          <SectionTitle 
            title="Visit Our Office" 
            subtitle="Located in the heart of Golden Springs"
            decoratorBefore={<FlowerOfLife size="sm" opacity={0.15} />}
            decoratorAfter={<FlowerOfLife size="sm" opacity={0.15} />}
          />
          <SectionContent>
            <FadeIn>
              <div 
                style={{
                  height: `${height}px`, 
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                aria-label="Map showing office locations"
              >
                {/* This would be a real map integration in production */}
                <Box 
                  width="100%" 
                  height="100%" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  backgroundColor="#dde4ed"
                  position="relative"
                >
                  {locations.length === 0 ? (
                    <Text variant="subtitle1">Interactive Map Would Be Displayed Here</Text>
                  ) : (
                    <>
                      {/* Placeholder for map */}
                      <Box 
                        position="absolute" 
                        top="0" 
                        left="0"
                        width="100%"
                        height="100%"
                      >
                        <Text 
                          variant="body2" 
                          position="absolute" 
                          top="50%" 
                          left="50%" 
                          style={{ 
                            transform: 'translate(-50%, -50%)', 
                            opacity: 0.7,
                            zIndex: 1
                          }}
                        >
                          Map Background
                        </Text>
                      </Box>
                      
                      {/* Map markers */}
                      <Box 
                        position="absolute" 
                        bottom="30%" 
                        left="50%" 
                        style={{ transform: 'translateX(-50%)' }}
                        zIndex={2}
                      >
                        <MapMarker 
                          selected={selectedLocation === (locations[0]?.id || '')}
                          onClick={() => setSelectedLocation(locations[0]?.id || null)}
                        />
                      </Box>
                      
                      {/* Info window for selected location */}
                      {selectedOffice && (
                        <InfoWindow office={selectedOffice} />
                      )}
                    </>
                  )}
                </Box>
              </div>
            </FadeIn>
            
            {/* Additional instructions */}
            <Box 
              mt={`${PHI * 16}px`} 
              textAlign="center"
              maxWidth={`${PHI * 500}px`}
              mx="auto"
            >
              <Text variant="body2" color="gray.600">
                We're conveniently located near public transportation and offer ample parking.
                Please call if you need specific directions to our office.
              </Text>
            </Box>
          </SectionContent>
        </ScrollReveal>
      </Container>
    </Section>
  );
};

export default ContactMap; 












