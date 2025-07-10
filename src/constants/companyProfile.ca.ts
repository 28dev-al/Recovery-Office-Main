export interface CompanyProfile {
  address: string;
  email: string;
  businessNumber: string;
  registryId: string;
  registeredOffice: string;
  regulatorPrimary: string;
  regulatorPrimaryUrl: string;
  regulatorList: string[];
  complianceFramework: string[];
}

// Centralised Canadian profile used across the app for localisation & compliance.
export const COMPANY_PROFILE_CA: CompanyProfile = {
  address: "Suite 2700, 1 First Canadian Place, Toronto, ON M5X 1A4",
  email: "contact@recovery-office.com",
  businessNumber: "877332510",
  registryId: "3950042",
  registeredOffice: "LAVAL, Quebec",
  regulatorPrimary: "CIRO",
  regulatorPrimaryUrl: "https://www.ciro.ca",
  regulatorList: [
    "Canadian Investment Regulatory Organization (CIRO)",
    "Canadian Securities Administrators (CSA)",
    "Financial Services Regulatory Authority of Ontario (FSRA)",
    "Alberta Securities Commission (ASC)",
    "British Columbia Securities Commission (BCSC)",
    "Autorité des marchés financiers (AMF) - Quebec"
  ],
  complianceFramework: [
    "FINTRAC (Financial Transactions and Reports Analysis Centre)",
    "PIPEDA (Personal Information Protection and Electronic Documents Act)",
    "OBSI (Ombudsman for Banking Services and Investments)",
    "CAFC (Canadian Anti-Fraud Centre)"
  ]
}; 