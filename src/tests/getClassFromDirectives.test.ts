import { getClassesAndProps, findMatch, handleFilters, handleReferences, handleMatched } from "../react/helper"
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

test('check if skipList works', () => {
  const [cls, props] = getClassesAndProps({
    name:"test", baseClass:["py-2"], 
    directives:{primary:["bg-blue-500"], size:{mini:["text-xs"]}}}, 
    {primary:true, size:"mini"},
    ['primary', 'size']
    )
  expect(Object.keys(props).length).toBe(0)
  expect(cls).toBe("py-2")
});

test('check if matched props are computed', () => {
  const props = {primary:true, size:"mini", color:'red', dark:true}
  const [skipList, classNames] = handleMatched({
      "primary,color:red,dark": "text-@color bg-black",
      "color:red": "border-@color",
      "size:mini": "@size"
    }, props)

  const [cls] = getClassesAndProps({
    name:"test", baseClass:["py-2", classNames], 
    directives:{primary:["bg-blue-500"], color:{red:"red-500"}, size:{mini:["text-xs"]}},
  }, props, skipList)

  expect(cls).toContain("py-2")
  expect(cls).toContain("text-@color")
  expect(cls).toContain("border-@color")
  expect(cls).toContain("@size")
  expect(cls).toContain("bg-black")
});

test('check if findMatch returns false', () => {
  const [isMatch, directives] = findMatch("", {dark:true, color:"red"})
  expect(isMatch).toBe(false)
  expect(directives.length).toBe(0)
});

test('check if findMatch works as expected 1', () => {
  const [isMatch, directives] = findMatch("primary:false,color:red,size,dark", {dark:true, color:"red", primary:false, size:"one"})
  expect(isMatch).toBe(true)
  expect(directives).toContain("primary")
  expect(directives).toContain("dark")
  expect(directives).toContain("color")
  expect(directives).toContain("size")
});

// test('check if computed directives work on string', () => {
//   const [cls] = getClassesAndProps({
//     name:"test", 
//     baseClass:"", 
//     directives:{ color:{blue: "blue-500"}},
//     computed: { color:"text-# bg-#"}
//   },
//     {color:"blue"})
//   expect(cls).toContain("bg-blue-500")
//   expect(cls).toContain("text-blue-500")
// });


test('check if classNames remains the same with empty filter', () => {
  const classNames = "bg-blue-500 text-white active:bg-blue-900 focus:bg-blue-300 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 focus:opacity-50";
  const cls = handleFilters({},{dark: true}, classNames)
  expect(cls).toBe(classNames)
});

test('check if handleFilters replaces works as expected', () => {
  const cls = handleFilters(
    {
      dark: [
      ["bg-blue-500", "bg-black"],
      ["text-white", "text-blue-500"],
      ["bg-blue", "bg-gray"]
    ]
    }, 
      {dark: true}, 
      "bg-blue-500 text-white active:bg-blue-900 focus:bg-blue-300 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 focus:opacity-50"
    )

  const wordCount = (str: string, word: string): number => {
    const arr = str.match(new RegExp(word, "g")) || []
    return arr.length
  } 

  expect(cls).toContain("bg-black")
  expect(cls).toContain("text-blue-500")
  expect(wordCount(cls, "bg-gray")).toBe(2)
});

test('check if handleReference remains same without @reference', () => {
  const className = "text-white"
  const cls = handleReferences(
    {dark: "bg-dark"}, 
    {dark: true}, 
    className
    )

  expect(cls).toBe(className)
});

test('check if handleReference modifies @references', () => {
  const className = "bg-@color  @dark text-@size"
  const cls = handleReferences(
    {color: {default:"gray", red:"red", blue:"blue"}, dark:"text-black", size: {small:"sm"}}, 
    {dark: true, size:"small"}, 
    className
  )

    expect(cls).toContain("bg-gray")
    expect(cls).toContain("text-black")
    expect(cls).toContain("text-sm")
});