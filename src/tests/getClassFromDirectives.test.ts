test('adds 1 + 2 to equal 3', () => {
  const tailwindcss = require('tailwindcss');
  console.log(tailwindcss.process())
  expect(1+2).toBe(3);
});