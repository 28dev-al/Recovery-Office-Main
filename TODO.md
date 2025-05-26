# Recovery Office Booking System Backend TODO

This document outlines the tasks required to implement the backend for the Recovery Office booking system. The frontend is already implemented but currently displays a "Booking System Error" due to the absence of a functional backend.

## Phase 1: Core Backend Setup

- [x] Initialize Node.js/Express.js project structure
- [x] Set up project dependencies (express, mongoose, cors, dotenv, etc.)
- [x] Configure environment variables (.env) for development, staging, and production
- [x] Set up MongoDB connection
- [x] Implement basic server configuration (middleware, routes structure)
- [x] Create initial deployment scripts for Netlify serverless functions
- [x] Set up error handling middleware
- [x] Configure CORS to allow frontend domain (https://recovery28.netlify.app/)
- [x] Implement request logging for debugging

## Phase 2: Data Models & Database

- [x] Create Service schema:
  ```js
  {
    id: String,
    name: String,
    description: String,
    duration: Number, // in minutes
    price: { type: Number, optional: true },
    icon: String, // URL to service icon
    isActive: Boolean
  }
  ```
- [x] Create Booking schema:
  ```js
  {
    id: String,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: Date,
    timeSlot: String,
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'] },
    createdAt: Date,
    updatedAt: Date,
    notes: { type: String, optional: true }
  }
  ```
- [x] Create Client schema:
  ```js
  {
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    createdAt: Date,
    updatedAt: Date
  }
  ```
- [x] Create TimeSlot schema:
  ```js
  {
    date: Date,
    slot: String, // e.g., "09:00-10:00"
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    isAvailable: Boolean
  }
  ```
- [x] Create seed data for services (matching frontend service icons and types)
- [x] Create seed data for initial available time slots
- [x] Implement database indexes for performance optimization
- [ ] Set up database backup strategy

## Phase 3: API Endpoints Implementation

### Services Endpoints
- [x] GET /api/services - List all available services
- [x] GET /api/services/:id - Get specific service details
- [x] Ensure service data format matches the frontend expectations (verify with ServiceSelection.tsx component)

### Booking Flow Endpoints
- [x] GET /api/slots?serviceId=&date= - Get available time slots
- [x] POST /api/bookings - Create new booking
- [x] GET /api/bookings/:id - Retrieve booking details
- [x] PATCH /api/bookings/:id - Update booking
- [x] DELETE /api/bookings/:id - Cancel booking
- [x] Format responses to match frontend expectations (verify with booking step components)

### Client Information Endpoints
- [x] POST /api/clients - Register client during booking
- [x] GET /api/clients/:id - Retrieve client information

### Admin/Dashboard Endpoints
- [x] GET /api/bookings - Admin endpoint to list all bookings
- [x] PATCH /api/slots - Manage available slots
- [ ] GET /api/admin/dashboard - Dashboard statistics and metrics

## Phase 4: Business Logic & Validation

- [x] Implement input validation with Joi or express-validator
- [x] Add booking validation logic:
  - [x] Prevent double-bookings
  - [x] Implement business hours and availability rules
  - [x] Add buffer time between appointments if required
- [x] Implement unique booking reference generator
- [x] Add status management for bookings (scheduled, completed, cancelled)
- [x] Add data sanitization for all inputs
- [x] Implement proper error responses that match frontend error handling

## Phase 5: Authentication & Security

- [ ] Implement JWT-based authentication with refresh tokens
- [ ] Set up secure routes for admin access
- [x] Add rate limiting for API endpoints
- [ ] Implement HTTPS/SSL for secure data transmission
- [x] Set up CORS policy to restrict to frontend domain
- [ ] Implement audit logging for all booking activities
- [ ] Add GDPR compliance measures for handling personal data
- [ ] Implement API keys for frontend-to-backend communication

## Phase 6: Notifications & Integrations

- [x] Set up email service integration (SendGrid/Nodemailer)
- [x] Implement email templates for:
  - [x] Booking confirmations
  - [x] Booking notifications to staff
  - [ ] Reminder emails
- [ ] Add SMS notification service (optional)
- [ ] Implement Google Calendar/Outlook integration for staff (optional)
- [ ] Set up payment gateway integration if required (optional)

## Phase 7: Testing & Quality Assurance

- [ ] Write unit tests for all API endpoints using Jest
- [ ] Implement integration tests with Supertest
- [ ] Create test data and mock services
- [ ] Test the entire booking flow with the frontend
- [ ] Performance testing for API endpoints
- [ ] Security testing (penetration testing)
- [ ] Conduct error handling testing
- [ ] Verify frontend compatibility with all API responses

## Phase 8: Documentation & Deployment

- [ ] Create API documentation with Swagger/OpenAPI
- [ ] Document database schema with diagrams
- [ ] Create deployment guides for production
- [ ] Document environment setup instructions
- [ ] Prepare monitoring and maintenance plan
- [ ] Set up CI/CD pipeline for automated testing and deployment
- [ ] Create user documentation for admin interface

## Phase 9: Frontend Integration

- [ ] Update frontend configuration to point to new backend API
- [ ] Test all booking steps with real backend:
  - [ ] Service selection
  - [ ] Date/time selection
  - [ ] Client information collection
  - [ ] Booking confirmation
- [ ] Fix any integration issues
- [ ] Implement better error handling in the frontend
- [ ] Update frontend loading states to handle API response times

## Phase 10: Launch & Post-Launch

- [ ] Final review of all components
- [ ] Soft launch with limited availability
- [ ] Monitor for any issues
- [ ] Full launch
- [ ] Set up analytics for booking system usage
- [ ] Plan for feature enhancements based on user feedback

## Notes Specific to Recovery Office Codebase

- The frontend uses React Context API for managing booking state (`BookingContext.tsx`)
- Error handling is currently implemented with an error boundary that shows "Booking System Error"
- Service icons are stored as URLs in the frontend
- The booking flow consists of multiple steps defined in the frontend
- Make sure API responses match the TypeScript interfaces defined in the frontend

## Implementation Plan

### Week 1: Foundation and Core Services
- [x] Complete core backend setup
- [x] Implement service and time slot models and endpoints
- [x] Create client and booking models and basic endpoints
- [x] Set up initial authentication system
- [x] Implement seed scripts for development

### Week 2: Booking Flow Implementation
- [x] Complete booking creation flow
- [x] Implement booking validation logic
- [x] Create client registration endpoints
- [x] Add email notifications for bookings
- [ ] Implement admin booking management features

### Week 3: Testing and Integration
- [ ] Write unit and integration tests
- [ ] Update frontend to use new backend APIs
- [ ] Test entire booking flow with frontend
- [ ] Fix integration issues
- [ ] Implement additional security measures

### Week 4: Deployment and Polish
- [ ] Create API documentation
- [ ] Set up production environment
- [ ] Conduct performance and security testing
- [ ] Set up monitoring and analytics
- [ ] Prepare for launch 