const { assert } = require('console')
const fs = require('fs')

let path = fs.existsSync('./input.txt') ? './input.txt' : 0
let output
if (path && fs.existsSync('./output.txt')) output = fs.readFileSync('./output.txt', 'utf8').trim().split('\n')

const input = fs.readFileSync(path, 'utf8').trim().split('\n')
let currentLine = 0
function ReadLine() {
  return input[currentLine++]
}

let TestCases = parseInt(ReadLine())
for (let i = 1; i <= TestCases; i++) {
  let [G00, G01, G02] = ReadLine().split(' ')
  let [G10, G12] = ReadLine().split(' ')
  let [G20, G21, G22] = ReadLine().split(' ')
  Log(`Case #${i}: ${solve([G00, G01, G02, G10, G12, G20, G21, G22])}`, i)
}

function solve(matrix) {
  const [G00, G01, G02, G10, G12, G20, G21, G22] = matrix

  const common =
    (+G22 + +G02 == 2 * +G12) + (+G22 + +G20 == 2 * +G21) + (+G20 + +G00 == 2 * +G10) + (+G02 + +G00 == 2 * +G01)

  const varies = [
    [G22, G00],
    [G12, G10],
    [G21, G01],
    [G02, G20],
  ]

  const sums = varies.map(pair => +pair[0] + +pair[1]).filter(sum => sum / 2 === Math.ceil(sum / 2))
  let occurences = {}
  for (let sum of sums) {
    occurences[sum] ? occurences[sum]++ : (occurences[sum] = 1)
  }
  let maxOccurence = {
    key: 1,
    value: 0,
  }
  for (let i of Object.keys(occurences)) {
    if (occurences[i] > maxOccurence.value) maxOccurence = { key: i, value: occurences[i] }
  }
  return common + maxOccurence.value
}

function Log(text, index) {
  console.log(text)
  if (path && fs.existsSync('./output.txt')) {
    assert(text == output[index - 1], `Expected to get ${output[index - 1]}, got ${text}`)
    console.log()
  }
}
