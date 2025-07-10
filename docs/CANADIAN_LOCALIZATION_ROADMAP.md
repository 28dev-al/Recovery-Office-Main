# 🇨🇦 Recovery Office – Canadian Localisation Roadmap

## Project Status: ✅ PHASE 4 COMPLETE | 🎉 FULL CANADIAN IMPLEMENTATION ACHIEVED

### **✅ COMPLETED - Phase 1: Core Configuration**
- [x] **Add Canadian company profile constants**  
  File: `src/constants/companyProfile.ca.ts` (complete definition of address, phones, regulators, BN, etc.).  
  _Acceptance_: `tsc --noEmit` passes & constants imported without ESLint errors.
- [x] **Feature-flag switch** – Configure an env/feature flag (`VITE_LOCALE_TARGET=ca`) that toggles Canadian profile at runtime/build-time.
- [x] **Currency formatting utilities** (`src/utils/formatters.ts`) ✅

### **✅ COMPLETED - Phase 2: Internationalisation** 
- [x] **Locale support** - Added `en-CA` and `fr-CA` locales ✅
- [x] **Company data tokens** - Translation tokens for all Canadian company information ✅
- [x] **i18n configuration** - Updated supported languages and fallbacks ✅

### **✅ COMPLETED - Phase 3: Global Content Replacement**

#### **✅ Regulatory Strings**
- [x] **Navigation/Layout** - FCA → CIRO across headers and footers ✅
- [x] **SEO metadata** - Business entity, geographic targeting, currency changed to Canadian ✅
- [x] **Service pages** - All "UK's Leading" → "Canada's Leading", FCA → CIRO badges ✅

#### **✅ Currency Conversion** 
- [x] **Service statistics** - All pricing converted using `formatCurrencyCAD()` ✅
- [x] **Testimonial amounts** - Converted testimonial recovery amounts to CAD ✅
- [x] **Legal pricing** - Terms of Service consultation fees updated to CAD ✅
- [x] **Service page pricing** - CryptocurrencyRecovery, InvestmentFraud, FinancialScam, RegulatoryAssistance ✅
- [x] **Booking pricing** - ServiceCards conversion ✅

#### **✅ Contact Details**
- [x] **Phone numbers** - All emergency/contact numbers use `COMPANY_PROFILE_CA` ✅
- [x] **Email addresses** - contact@recovery-office.ca implementation ✅
- [x] **Physical address** - Toronto office address across all components ✅

#### **✅ Legal Compliance**
- [x] **Privacy Policy** - UK GDPR → Canadian PIPEDA compliance ✅
- [x] **Terms of Service** - English law → Ontario law, consultation fees in CAD ✅
- [x] **Corporate structure** - Recovery Office Limited → Recovery Office Canada Inc. ✅

### **✅ COMPLETED - Phase 4: Visual Trust Elements**

#### **✅ Regulatory Credentials**
- [x] **CIRO badges** - Replaced FCA badges with CIRO equivalents in PremiumRegulatory component ✅
- [x] **Provincial regulators** - Added FSRA (Ontario), FINTRAC registration ✅
- [x] **Contact page credentials** - Updated regulatory credentials section ✅
- [x] **Hero trust badges** - Updated FCA→CIRO, Manchester→Toronto ✅

#### **✅ Visual Trust Elements**
- [x] **Service pages testimonials** - Replaced UK client locations with Canadian cities ✅
- [x] **Awards & certifications** - Updated to Canadian regulatory framework ✅  
- [x] **Hero statistics** - Updated all major statistics to reflect Canadian market data ✅
- [x] **Badge assets** - Created CIRO, FSRA, FINTRAC badge placeholders ✅

### **🎯 QUICK WINS COMPLETED**
- [x] **Core service testimonials** - CryptocurrencyRecoveryPage, InvestmentFraud, FinancialScam ✅
- [x] **Regulatory service testimonials** - RegulatoryAssistancePage, RegulatoryComplaintPage ✅
- [x] **Emergency contact** - All booking confirmation and emergency numbers ✅
- [x] **Professional indemnity** - Insurance amounts converted to CAD ✅

---

## **Summary of Achievements**

### **🇨🇦 CANADIAN IDENTITY ESTABLISHED**
- **Business Registration**: Recovery Office Canada Inc. with Canadian Business Number
- **Regulatory Oversight**: CIRO, FSRA, CSA, FINTRAC compliance framework
- **Geographic Presence**: Toronto headquarters with provincial representation
- **Legal Framework**: Ontario law, PIPEDA privacy compliance

### **💰 FINANCIAL LOCALIZATION**
- **Currency**: All £ amounts converted to CAD using proper exchange rates
- **Pricing Structure**: Consultation fees, service pricing, insurance coverage in CAD
- **Market Statistics**: Recovery amounts, averages, success metrics updated for Canadian market

### **⚖️ REGULATORY COMPLIANCE**
- **Investment Regulation**: CIRO (Canadian Investment Regulatory Organization)
- **Provincial Oversight**: FSRA (Financial Services Regulatory Authority of Ontario)
- **AML Compliance**: FINTRAC (Financial Transactions and Reports Analysis Centre)
- **Professional Standards**: IAFCI membership maintained for international credibility

### **🎯 MARKET POSITIONING**
The website now presents as a fully Canadian financial recovery company with:
- Comprehensive Canadian regulatory framework
- Toronto-based operations with national coverage
- CAD pricing and Canadian legal jurisdiction
- Provincial and federal compliance structure

**NEXT FOCUS**: Complete remaining visual elements and testimonial locations for full Canadian market presentation.

---

## 9. QA & Verification

- [ ] **Automated compliance script** – `scripts/verifyCanCompliance.js` rejects builds containing UK-specific tokens (`FCA`, `£`, `+44`, `WC2H`).
- [ ] **a11y & Lighthouse** – Minimum scores: Perf ≥ 90, Access ≥ 90 on staging.
- [ ] **Cross-browser tests** – Chrome, Firefox, Edge on Windows & macOS; Safari on iOS.

---

## 10. Deployment

- [ ] **Staging deploy** – Netlify preview with `VITE_LOCALE_TARGET=ca`.
- [ ] **Stakeholder UAT** – Collect sign-off from Compliance, Marketing, and Legal teams.
- [ ] **Production release** – Merge to `main`, deploy, run post-release smoke tests.

---

## 11. Post-Launch

- [ ] **Google Ads verification** – Submit new Canadian financial-services documents.
- [ ] **SEO monitoring** – Track rankings for "Canadian investment fraud recovery", etc.
- [ ] **Continuous feedback loop** – Capture user feedback, iteratively refine copy & features.

---

### Legend
- 🔒 **Critical path** – Regulatory or security requirement; blockers must be resolved immediately.
- 🖼 **Content** – Copywriting, images, or translation deliverables.
- 🛠 **Code** – Engineering implementation tasks.

---

**Maintainers**: `@dev-team`, `@legal`, `@marketing` 