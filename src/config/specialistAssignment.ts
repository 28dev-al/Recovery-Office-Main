/**
 * Specialist Assignment Configuration
 * Maps service types to specific team members for booking assignment
 */

export interface SpecialistInfo {
  name: string;
  title: string;
  photo: string;
  email: string;
}

export const specialistAssignment: Record<string, SpecialistInfo> = {
  "cryptocurrency-recovery": {
    name: "Alex Bianchi",
    title: "Senior Financial Recovery Specialist",
    photo: "https://i.ibb.co/ZRw4pvpj/Alex-Bianchi.jpg",
    email: "alex.bianchi@recoveryoffice.com"
  },
  "investment-fraud-recovery": {
    name: "Alex Bianchi", 
    title: "Senior Financial Recovery Specialist",
    photo: "https://i.ibb.co/ZRw4pvpj/Alex-Bianchi.jpg",
    email: "alex.bianchi@recoveryoffice.com"
  },
  "financial-scam-recovery": {
    name: "Mark Marandola",
    title: "Lead Recovery Consultant", 
    photo: "https://i.ibb.co/tMmKPttD/Mark-Marandola.jpg",
    email: "mark.marandola@recoveryoffice.com"
  },
  "regulatory-complaint-assistance": {
    name: "Jessica Davies",
    title: "Regulatory Compliance Specialist",
    photo: "https://i.ibb.co/Hprgydmw/Jesica-davies.jpg",
    email: "jessica.davies@recoveryoffice.com"
  },
  // NEW: Add blockchain/technical cases to Daniel
  "blockchain-analysis": {
    name: "Daniel Fouberg",
    title: "Senior Digital Forensics Specialist",
    photo: "https://i.ibb.co/G4CnwgWF/Daniel-Fouberg.jpg",
    email: "daniel.fouberg@recoveryoffice.com"
  },
  "digital-forensics": {
    name: "Daniel Fouberg",
    title: "Senior Digital Forensics Specialist",
    photo: "https://i.ibb.co/G4CnwgWF/Daniel-Fouberg.jpg",
    email: "daniel.fouberg@recoveryoffice.com"
  },
  // Default assignment for any unmatched services
  "default": {
    name: "Mark Marandola",
    title: "Lead Recovery Consultant",
    photo: "https://i.ibb.co/tMmKPttD/Mark-Marandola.jpg",
    email: "mark.marandola@recoveryoffice.com"
  }
};

export function getSpecialistForService(serviceId: string): SpecialistInfo {
  return specialistAssignment[serviceId] || specialistAssignment.default;
} 