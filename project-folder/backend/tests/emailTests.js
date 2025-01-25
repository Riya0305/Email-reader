const { categorizeEmail } = require('../utils/filters');

test('Categorize email with "Promotion" in subject', () => {
  const result = categorizeEmail('Huge Promotion on Shoes!');
  expect(result).toBe('Promotions');
});

test('Categorize email with no matching keywords', () => {
  const result = categorizeEmail('Hello World!');
  expect(result).toBe('Uncategorized');
});
