const fs = require("fs")

const dirPath = '2kk'

const files = fs.readdirSync(`${__dirname}\\${dirPath}`)

let wordsSet = new Set()

let allFilesWords = []


files.forEach((file) => {
    let words = fs.readFileSync(`${__dirname}\\${dirPath}\\${file}`, { encoding: "utf8" }).split(/\s+/g)
    allFilesWords.push(words)
    words.forEach(word => {
        wordsSet.add(word)
    })

})


const uniqueValues = () => {
    let uniqueValues = 0;
    let wordCounter = 0;
    for (const uniqueWord of wordsSet) {
        for (const file of allFilesWords) {
            for (const word of file) {
                if (word == uniqueWord) {
                    wordCounter++
                }
                if (wordCounter > 1) {
                    break
                }

            }
            if (wordCounter > 1) {
                wordCounter = 0
                break
            }
        }
        if (wordCounter == 1) uniqueValues++

    }
    return uniqueValues
}
const existInAllFiles = () => {
    let existInAllFiles = 0
    let existInFile = false
    for (const uniqueWord of wordsSet) {
        for (const file of allFilesWords) {
            existInFile = false
            for (const word of file) {
                if (word == uniqueWord) {
                    existInFile = true
                    break
                }
            }
            if (!existInFile) {
                break   
            } 
        }
        if (existInFile) {
            existInAllFiles++
        }
    }
    return existInAllFiles
}

const existInAtLeastTen = () => { 
    let existInAtLeastTen = 0
    let fileExistCounter = 0
    
    for (const uniqueWord of wordsSet) {
        for (const file of allFilesWords) {
            
            for (const word of file) {
                if (word == uniqueWord) {
                    fileExistCounter++
                    break
                }
            }
            if (fileExistCounter>9) {
                fileExistCounter = 0
                existInAtLeastTen++
                break
            }
        }
    }
    return existInAtLeastTen
}

console.log(`Unique values: ${uniqueValues()}`);
console.log(`Exist in all files: ${existInAllFiles()}`);
console.log(`Exist in at least ten files: ${existInAtLeastTen()}`);

