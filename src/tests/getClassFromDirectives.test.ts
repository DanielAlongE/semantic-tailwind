import { getClassesAndProps, darkModeClassSwap, handleComputed } from "../react/helper"
// test('adds 1 + 2 to equal 3', () => {
//   const tailwindcss = require('tailwindcss');
//   console.log(tailwindcss.process())
//   expect(1+2).toBe(3);
// });

test('check if baseClass compute', () => {
  const [cls] = getClassesAndProps({name:"test", baseClass:"py-2"}, {})
  expect(cls).toBe("py-2")
});

test('check if default directive compute', () => {
  const [cls] = getClassesAndProps({name:"test", baseClass:"", directives:{default:"text-black"}}, {})
  expect(cls).toContain("text-black")
});

test('check if props are preserved', () => {
  const [,props] = getClassesAndProps({name:"test", baseClass:"py-2"}, {tabIndex:0})
  expect(Object.keys(props).length).toBe(1)
});


test('check if directves and props compute', () => {
  const [cls, props] = getClassesAndProps({name:"test", baseClass:"py-2", directives:{primary:"bg-blue-500", size:{mini:"text-xs"}}}, {primary:true, size:"mini"})
  expect(Object.keys(props).length).toBe(0)
  expect(cls).toContain("text-xs")
  expect(cls).toContain("bg-blue-500")
});


test('check if string[] are valid classNames', () => {
  const [cls, props] = getClassesAndProps({name:"test", baseClass:["py-2"], directives:{primary:["bg-blue-500"], size:{mini:["text-xs"]}}}, {primary:true, size:"mini"})
  expect(Object.keys(props).length).toBe(0)
  expect(cls).toContain("py-2")
  expect(cls).toContain("text-xs")
  expect(cls).toContain("bg-blue-500")
});

test('check if computed directives work on boolean', () => {
  const [cls] = getClassesAndProps({
    name:"test", 
    baseClass:"", 
    directives:{ primary:["blue-500"]},
    computed: { primary:"bg-#"}
  },
    {primary:true})
  expect(cls).toContain("bg-blue-500")
});

test('check if computed directives work on string', () => {
  const [cls] = getClassesAndProps({
    name:"test", 
    baseClass:"", 
    directives:{ color:{blue: "blue-500"}},
    computed: { color:"text-# bg-#"}
  },
    {color:"blue"})
  expect(cls).toContain("bg-blue-500")
  expect(cls).toContain("text-blue-500")
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

test('check if handleComputed stays unchanged without # ', () => {
  const cls = handleComputed("text-black", "blue-900")
  expect(cls).toBe("text-black")
});

test('check if handleComputed replaces #', () => {
  const cls = handleComputed("text-# bg-#", "blue-900")
  expect(cls).toContain("text-blue-900")
  expect(cls).toContain("bg-blue-900")
});