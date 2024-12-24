// Import jest-dom matchers
import '@testing-library/jest-dom';

// Setup global Jest DOM matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null;
    return {
      pass,
      message: () => `expected element to ${pass ? 'not ' : ''}be in the document`,
    };
  },
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
