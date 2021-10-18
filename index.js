const fs = require("fs")

const dirPath = '2kk'

const files = fs.readdirSync(`${__dirname}\\${dirPath}`)

let wordsSet = new Set()

let allFilesWords = []


files.forEach((file) => {
    let words = fs.readFileSync(`${__dirname}\\${dirPath}\\${file}`, { encoding: "utf8" }).split(/\s+/g)
    allFilesWords.push(words.sort())
    words.forEach(word => {
        wordsSet.add(word)
    })

})



const binarySearch = (elem, arr) => {

    let low = 0
    let high = arr.length - 1
    while (low <= high) {
        const mid = Math.round((low + high) / 2)
        if (arr[mid] > elem) {
            high = mid - 1
        } else if (arr[mid] < elem) {
            low = mid + 1
        } else return mid
    }
    return -1
}

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

const uniqueValuesBin = () => {
    let uniqueValues = 0;
    let wordCounter = 0
    for (const uniqueWord of wordsSet) {
        for (const file of allFilesWords) {
            const findedIndex = binarySearch(uniqueWord, file)

            if (findedIndex > -1) {
                wordCounter++
                if (file[findedIndex + 1] == uniqueWord) {
                    wordCounter++
                }
                if (file[findedIndex + 1] == uniqueWord) {
                    wordCounter++
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

const existInAllFilesBin = () => {
    let existInAllFiles = 0
    let existInFilesCount = 0
    for (const uniqueWord of wordsSet) {
        existInFilesCount = 0
        for (const file of allFilesWords) {
            if (binarySearch(uniqueWord, file) > -1) {
                existInFilesCount++
            }
        }
        if (existInFilesCount == 20) {
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
            if (fileExistCounter > 9) {
                fileExistCounter = 0
                existInAtLeastTen++
                break
            }
        }
    }
    return existInAtLeastTen
}

const existInAtLeastTenBin = () => {
    let existInAtLeastTen = 0
    let fileExistCounter = 0

    for (const uniqueWord of wordsSet) {
        for (const file of allFilesWords) {

            if (binarySearch(uniqueWord, file) > -1) {
                fileExistCounter++
            }

            if (fileExistCounter > 9) {
                fileExistCounter = 0
                existInAtLeastTen++
                break
            }
        }
    }
    return existInAtLeastTen
}


// console.time("Unique values")
// console.log(`Unique values: ${uniqueValues()}`);
// console.timeEnd("Unique values")

console.time("Unique values(Binary)")
console.log(`Unique values(Binary): ${uniqueValuesBin()}`);
console.timeEnd("Unique values(Binary)")

// console.time("All Files")
// console.log(`\n\nExist in all files: ${existInAllFiles()}`);
// console.timeEnd("All Files")

console.time("All Files Bin")
console.log(`Exist in all files(Binary): ${existInAllFilesBin()}`);
console.timeEnd("All Files Bin")

// console.time("At least ten")
// console.log(`\n\nExist in at least ten files: ${existInAtLeastTen()}`);
// console.timeEnd("At least ten")

console.time("At least ten Bin")
console.log(`Exist in at least ten files(Binary): ${existInAtLeastTenBin()}`);
console.timeEnd("At least ten Bin")
