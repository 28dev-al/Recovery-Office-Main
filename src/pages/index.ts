/**
 * Main pages export file
 * 
 * This file exports all pages from the application for easy importing
 * in other parts of the codebase.
 */

// Main pages
export { default as Home } from './Home/Home';
export { default as Services } from './Services/Services';
export { default as About } from './About';
export { default as Contact } from './Contact/Contact';
export { default as Blog } from './Blog/Blog';
export { FAQPage as FAQ } from './FAQ/FAQPage';
export { default as Booking } from './Booking';
export { default as NotFound } from './NotFound/NotFound';
export { default as ComponentTest } from './ComponentTest/ComponentTest';

// Auth pages
export { LoginPage } from './Auth/LoginPage';

// Dashboard pages
export { DashboardPage } from './Dashboard/DashboardPage';
export { BookingsPage } from './Dashboard/BookingsPage';
export { default as ClientsPage } from './Dashboard/ClientsPage';
export { default as ServicesPage } from './Dashboard/ServicesPage';
export { default as AnalyticsPage } from './Dashboard/AnalyticsPage';

// Service pages
export { InvestmentFraudRecoveryPage } from './Services/InvestmentFraudRecoveryPage';
export { CryptocurrencyRecoveryPage } from './Services/CryptocurrencyRecoveryPage';
export { FinancialScamRecoveryPage } from './Services/FinancialScamRecoveryPage';
export { RegulatoryComplaintPage } from './Services/RegulatoryComplaintPage';

// Legal pages
export { default as Privacy } from './legal/Privacy';
export { default as Terms } from './legal/Terms';
export { default as Accessibility } from './legal/Accessibility';

// Legal page components
export { PrivacyPolicyPage } from './legal/PrivacyPolicy/PrivacyPolicyPage';
export { TermsOfServicePage } from './legal/TermsOfService/TermsOfServicePage';

// Data Security page
export { DataSecurityPage } from './DataSecurity/DataSecurityPage';





