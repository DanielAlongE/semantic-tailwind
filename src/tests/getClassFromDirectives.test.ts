import { computePropsAsDirectives, darkModeClassSwap } from "../react/helper"
// test('adds 1 + 2 to equal 3', () => {
//   const tailwindcss = require('tailwindcss');
//   console.log(tailwindcss.process())
//   expect(1+2).toBe(3);
// });

test('check if baseClass compute', () => {
  const [cls] = computePropsAsDirectives({name:"test", baseClass:"py-2"}, {})
  expect(cls).toBe("py-2")
});

test('check if props are preserved', () => {
  const [,props] = computePropsAsDirectives({name:"test", baseClass:"py-2"}, {tabIndex:0})
  expect(Object.keys(props).length).toBe(1)
});


test('check if directves and props compute', () => {
  const [cls, props] = computePropsAsDirectives({name:"test", baseClass:"py-2", directives:{primary:"bg-blue-500", size:{mini:"text-xs"}}}, {primary:true, size:"mini"})
  expect(Object.keys(props).length).toBe(0)
  expect(cls).toContain("text-xs")
  expect(cls).toContain("bg-blue-500")
});


test('check if string[] are valid classNames', () => {
  const [cls, props] = computePropsAsDirectives({name:"test", baseClass:["py-2"], directives:{primary:["bg-blue-500"], size:{mini:["text-xs"]}}}, {primary:true, size:"mini"})
  expect(Object.keys(props).length).toBe(0)
  expect(cls).toContain("py-2")
  expect(cls).toContain("text-xs")
  expect(cls).toContain("bg-blue-500")
});

test('check if classNames remains the same', () => {
  const classNames = "bg-blue-500 text-white active:bg-blue-900 focus:bg-blue-300 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 focus:opacity-50";
  const cls = darkModeClassSwap([], classNames)
  expect(cls).toBe(classNames)
});

test('check if darkMode swap happened', () => {
  const classNames = "bg-blue-500 text-white active:bg-blue-900 focus:bg-blue-300 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 focus:opacity-50";
  const cls = darkModeClassSwap([
    ["bg-blue-500", "bg-black"],
    ["text-white", "text-blue-500"],
    ["bg-blue", "bg-gray"]
  ], classNames)

  const wordCount = (str: string, word: string): number => {
    const arr = str.match(new RegExp(word, "g")) || []
    return arr.length
  } 

  expect(cls).toContain("bg-black")
  expect(cls).toContain("text-blue-500")
  expect(wordCount(cls, "bg-gray")).toBe(2)
});