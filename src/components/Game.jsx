import React, { useState } from 'react'
import { normalMode } from '../data/normal.js'

const normal = normalMode;

const Game = () => {
const [wordOne, setWordOne] = useState('')
const [wordTwo, setWordTwo] = useState('')
const [shuffledWord, setShuffledWord] = useState('')
const shuffledWordArray = shuffledWord.split('')

//Function to randomoly select two words from the normal mode array
const randomWords = () => {
    const randomWordOne = normal[Math.floor(Math.random() * normal.length)]
    const randomWordTwo = normal[Math.floor(Math.random() * normal.length)]
    setWordOne(randomWordOne)
    setWordTwo(randomWordTwo)
    //console.log(randomWordOne.name)
    shuffle(randomWordOne, randomWordTwo)
}

//Function that takes the two words and randomoly shuffles the letters into one word without spaces and all caps
const shuffle = (randomWordOne, randomWordTwo) => {
    const wordOneLetters = randomWordOne.name.split('')
    const wordTwoLetters = randomWordTwo.name.split('')
    const combinedLetters = wordOneLetters.concat(wordTwoLetters)
    const shuffledLetters = combinedLetters.sort(() => Math.random() - 0.5)
    const shuffledWord = shuffledLetters.join('').toUpperCase().replace(/\s/g, '')
    setShuffledWord(shuffledWord)
};



  return (
    <div className='bg-gray-400'>
        <h1>Anagram</h1>
        <button onClick={randomWords}>Start Game</button>
        <div>
            <h1>{wordOne.name}</h1>
            <h1>{wordTwo.name}</h1>
            <h1>{shuffledWord}</h1>
        </div>
        <div className='flex flex-row'>
            {/* Map through the shuffledWordArray to create a container for each item */}
            {shuffledWordArray.map((letter, index) => {
                return (
                    <div key={index} className="h-4 w-4 p-4 m-4">
                        <h1>{letter}</h1>
                        </div>
                )
            })}

        </div>
        {/* Two input fields that will compare user inputs to wordOne and wordTwo */}
        <div>
            <input type='text' />
            <input type='text' />
            </div>
    </div>
  )
}

export default Game