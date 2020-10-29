import { computePropsAsDirectives } from "../templates/react"
// test('adds 1 + 2 to equal 3', () => {
//   const tailwindcss = require('tailwindcss');
//   console.log(tailwindcss.process())
//   expect(1+2).toBe(3);
// });

test('check if baseClass compute', () => {
  const [cls] = computePropsAsDirectives({name:"test", baseClass:"py-2"}, {})
  expect(cls).toBe("py-2")
});

test('check if directves and props compute', () => {
  const [cls, props] = computePropsAsDirectives({name:"test", baseClass:"py-2", directives:{primary:"bg-blue-500", size:{mini:"text-xs"}}}, {primary:true, size:"mini"})
  expect(Object.keys(props).length).toBe(0)
  expect(cls).toContain("text-xs")
  expect(cls).toContain("bg-blue-500")
});