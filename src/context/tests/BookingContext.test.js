"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("@testing-library/react");
var user_event_1 = require("@testing-library/user-event");
var BookingContext_1 = require("../BookingContext");
var booking_service_1 = require("@services/booking.service");
var useToast_1 = require("../hooks/useToast");
// Mock the booking service
jest.mock('../../services/booking.service', function () { return ({
    BookingService: {
        getAvailableServices: jest.fn(),
        getAvailableDates: jest.fn(),
        getAvailableTimeSlots: jest.fn(),
        submitBooking: jest.fn(),
        cancelBooking: jest.fn(),
        rescheduleBooking: jest.fn(),
        createPaymentIntent: jest.fn(),
    }
}); });
// Mock the toast hooks
jest.mock('../../hooks/useToast', function () { return ({
    useToast: jest.fn().mockReturnValue({
        successToast: jest.fn(),
        errorToast: jest.fn(),
        showToast: jest.fn(),
        toast: jest.fn()
    })
}); });
// Test component to access context
var TestComponent = function (_a) {
    var _b = _a.testId, testId = _b === void 0 ? 'test-component' : _b;
    var _c = (0, BookingContext_1.useBooking)(), state = _c.state, nextStep = _c.goToNextStep, prevStep = _c.goToPreviousStep, setSelectedService = _c.selectService, setSelectedDate = _c.selectDate, setSelectedTimeSlot = _c.selectTimeSlot, setClientInfo = _c.setClientInfo, fetchAvailableServices = _c.fetchAvailableServices, fetchAvailableDates = _c.fetchAvailableDates, fetchAvailableTimeSlots = _c.fetchAvailableTimeSlots, submitBooking = _c.submitBooking, cancelBooking = _c.cancelBooking, rescheduleBooking = _c.rescheduleBooking, createPaymentIntent = _c.createPaymentIntent;
    return (<div data-testid={testId}>
      <div data-testid="current-step">{state.currentStep}</div>
      <div data-testid="loading-services">{String(state.loadingServices)}</div>
      <div data-testid="loading-dates">{String(state.loadingDates)}</div>
      <div data-testid="loading-time-slots">{String(state.loadingTimeSlots)}</div>
      <div data-testid="loading-submission">{String(state.loadingSubmission)}</div>
      <div data-testid="loading-cancellation">{String(state.loadingCancellation)}</div>
      <div data-testid="loading-reschedule">{String(state.loadingReschedule)}</div>
      <div data-testid="loading-payment">{String(state.loadingPaymentIntent)}</div>
      <div data-testid="error">{state.error || 'no-error'}</div>
      
      <button data-testid="next-step" onClick={nextStep}>Next</button>
      <button data-testid="prev-step" onClick={prevStep}>Back</button>
      <button data-testid="fetch-services" onClick={function () { return fetchAvailableServices(); }}>
        Fetch Services
      </button>
      <button data-testid="fetch-dates" onClick={function () { return fetchAvailableDates('service-123'); }}>
        Fetch Dates
      </button>
      <button data-testid="fetch-time-slots" onClick={function () { return fetchAvailableTimeSlots('service-123', '2023-05-15'); }}>
        Fetch Time Slots
      </button>
      <button data-testid="submit-booking" onClick={function () { return submitBooking(); }}>
        Submit Booking
      </button>
      <button data-testid="create-payment" onClick={function () { return createPaymentIntent(); }}>
        Create Payment Intent
      </button>
      <button data-testid="cancel-booking" onClick={function () { return cancelBooking('booking-123'); }}>
        Cancel Booking
      </button>
      <button data-testid="reschedule-booking" onClick={function () { return rescheduleBooking('booking-123', '2023-05-16', 'slot-456'); }}>
        Reschedule Booking
      </button>
      <button data-testid="set-service" onClick={function () { return setSelectedService({ id: 'service-123', name: 'Test Service', duration: 60, price: 100 }); }}>
        Set Service
      </button>
      <button data-testid="set-date" onClick={function () { return setSelectedDate('2023-05-15'); }}>
        Set Date
      </button>
      <button data-testid="set-time-slot" onClick={function () { return setSelectedTimeSlot({ id: 'slot-123', startTime: '10:00', endTime: '11:00' }); }}>
        Set Time Slot
      </button>
      <button data-testid="set-client-info" onClick={function () { return setClientInfo({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            phone: '123-456-7890',
            dateOfBirth: '1990-01-01',
            acceptedTerms: true
        }); }}>
        Set Client Info
      </button>
    </div>);
};
describe('BookingContext', function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should initialize with the correct default state', function () {
        (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
        expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('1');
        expect(react_1.screen.getByTestId('loading-services')).toHaveTextContent('false');
        expect(react_1.screen.getByTestId('loading-dates')).toHaveTextContent('false');
        expect(react_1.screen.getByTestId('loading-time-slots')).toHaveTextContent('false');
        expect(react_1.screen.getByTestId('loading-submission')).toHaveTextContent('false');
        expect(react_1.screen.getByTestId('error')).toHaveTextContent('no-error');
    });
    it('should navigate through steps', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('1');
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('next-step'))];
                case 1:
                    _a.sent();
                    expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('2');
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('next-step'))];
                case 2:
                    _a.sent();
                    expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('3');
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('prev-step'))];
                case 3:
                    _a.sent();
                    expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('2');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fetch available services', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockServices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockServices = [
                        { id: 'service-1', name: 'Service 1', duration: 60, price: 100 },
                        { id: 'service-2', name: 'Service 2', duration: 90, price: 150 }
                    ];
                    booking_service_1.BookingService.getAvailableServices.mockResolvedValue({
                        data: mockServices,
                        success: true
                    });
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('fetch-services'))];
                case 1:
                    _a.sent();
                    expect(react_1.screen.getByTestId('loading-services')).toHaveTextContent('true');
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(booking_service_1.BookingService.getAvailableServices).toHaveBeenCalledTimes(1);
                            expect(react_1.screen.getByTestId('loading-services')).toHaveTextContent('false');
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fetch available dates', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockDates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockDates = ['2023-05-15', '2023-05-16', '2023-05-17'];
                    booking_service_1.BookingService.getAvailableDates.mockResolvedValue({
                        data: mockDates,
                        success: true
                    });
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('fetch-dates'))];
                case 1:
                    _a.sent();
                    expect(react_1.screen.getByTestId('loading-dates')).toHaveTextContent('true');
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(booking_service_1.BookingService.getAvailableDates).toHaveBeenCalledWith('service-123');
                            expect(react_1.screen.getByTestId('loading-dates')).toHaveTextContent('false');
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fetch available time slots', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTimeSlots;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTimeSlots = [
                        { id: 'slot-1', startTime: '10:00', endTime: '11:00' },
                        { id: 'slot-2', startTime: '11:30', endTime: '12:30' }
                    ];
                    booking_service_1.BookingService.getAvailableTimeSlots.mockResolvedValue({
                        data: mockTimeSlots,
                        success: true
                    });
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('fetch-time-slots'))];
                case 1:
                    _a.sent();
                    expect(react_1.screen.getByTestId('loading-time-slots')).toHaveTextContent('true');
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(booking_service_1.BookingService.getAvailableTimeSlots).toHaveBeenCalledWith('service-123', '2023-05-15');
                            expect(react_1.screen.getByTestId('loading-time-slots')).toHaveTextContent('false');
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle API errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    booking_service_1.BookingService.getAvailableServices.mockRejectedValue(new Error('API error'));
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('fetch-services'))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(react_1.screen.getByTestId('error')).toHaveTextContent('API error');
                            expect((0, useToast_1.useToast)().errorToast).toHaveBeenCalled();
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should submit booking', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    booking_service_1.BookingService.submitBooking.mockResolvedValue({
                        data: { bookingId: 'booking-123' },
                        success: true
                    });
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    // Set necessary booking data
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('set-service'))];
                case 1:
                    // Set necessary booking data
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('set-date'))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('set-time-slot'))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('set-client-info'))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('submit-booking'))];
                case 5:
                    _a.sent();
                    expect(react_1.screen.getByTestId('loading-submission')).toHaveTextContent('true');
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(booking_service_1.BookingService.submitBooking).toHaveBeenCalled();
                            expect(react_1.screen.getByTestId('loading-submission')).toHaveTextContent('false');
                            expect((0, useToast_1.useToast)().successToast).toHaveBeenCalled();
                        })];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create payment intent', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    booking_service_1.BookingService.createPaymentIntent.mockResolvedValue({
                        data: { clientSecret: 'secret-123' },
                        success: true
                    });
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    // Set necessary booking data
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('set-service'))];
                case 1:
                    // Set necessary booking data
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('create-payment'))];
                case 2:
                    _a.sent();
                    expect(react_1.screen.getByTestId('loading-payment')).toHaveTextContent('true');
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(booking_service_1.BookingService.createPaymentIntent).toHaveBeenCalled();
                            expect(react_1.screen.getByTestId('loading-payment')).toHaveTextContent('false');
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should cache API results', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockServices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockServices = [
                        { id: 'service-1', name: 'Service 1', duration: 60, price: 100 },
                        { id: 'service-2', name: 'Service 2', duration: 90, price: 150 }
                    ];
                    booking_service_1.BookingService.getAvailableServices.mockResolvedValue({
                        data: mockServices,
                        success: true
                    });
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    // First call should make the API request
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('fetch-services'))];
                case 1:
                    // First call should make the API request
                    _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            expect(booking_service_1.BookingService.getAvailableServices).toHaveBeenCalledTimes(1);
                        })];
                case 2:
                    _a.sent();
                    // Reset mocks to verify second call
                    jest.clearAllMocks();
                    // Second call should use cached data
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('fetch-services'))];
                case 3:
                    // Second call should use cached data
                    _a.sent();
                    // Should not make a second API call
                    expect(booking_service_1.BookingService.getAvailableServices).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle back navigation correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)(<BookingContext_1.BookingProvider>
        <TestComponent />
      </BookingContext_1.BookingProvider>);
                    // Navigate to step 3
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('next-step'))];
                case 1:
                    // Navigate to step 3
                    _a.sent();
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('next-step'))];
                case 2:
                    _a.sent();
                    expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('3');
                    // Go back to step 2
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('prev-step'))];
                case 3:
                    // Go back to step 2
                    _a.sent();
                    expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('2');
                    // Go back to step 1
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('prev-step'))];
                case 4:
                    // Go back to step 1
                    _a.sent();
                    expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('1');
                    // Cannot go back from step 1
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByTestId('prev-step'))];
                case 5:
                    // Cannot go back from step 1
                    _a.sent();
                    expect(react_1.screen.getByTestId('current-step')).toHaveTextContent('1');
                    return [2 /*return*/];
            }
        });
    }); });
});
