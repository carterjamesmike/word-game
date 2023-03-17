import React, { useState } from 'react'
import { normalMode } from '../data/normal.js'
import { useForm } from 'react-hook-form'

const normal = normalMode;

const Game = () => {
const [wordOne, setWordOne] = useState('')
const [wordTwo, setWordTwo] = useState('')
const [shuffledWord, setShuffledWord] = useState('')
const shuffledWordArray = shuffledWord.split('')
const [userInputOne, setUserInputOne] = useState('')
const [userInputTwo, setUserInputTwo] = useState('')
const [finalAnswer, setFinalAnswer] = useState('')
const { register, handleSubmit } = useForm()

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
    const combinedWords = randomWordOne.name + randomWordTwo.name
    const joinedAnswer = combinedWords.toUpperCase().replace(/\s/g, '')
    setFinalAnswer(joinedAnswer)
    const wordOneLetters = randomWordOne.name.split('')
    const wordTwoLetters = randomWordTwo.name.split('')
    const combinedLettersArr = wordOneLetters.concat(wordTwoLetters)
    const shuffledLetters = combinedLettersArr.sort(() => Math.random() - 0.5)
    const shuffledWord = shuffledLetters.join('').toUpperCase().replace(/\s/g, '')
    setShuffledWord(shuffledWord)
};

//Function that will compare the user input to the two words
const compareWords = () => {
    console.log(`User Input One: ${userInputOne}`)
    console.log(`User Input Two: ${userInputTwo}`)
    console.log(`Word One: ${wordOne.name}`)
    console.log(`Word Two: ${wordTwo.name}`)
    const combinedOne = userInputOne + userInputTwo
    const guessOne = combinedOne.toUpperCase().replace(/\s/g, '')
    const cpmbinedTwo = userInputTwo + userInputOne
    const guessTwo = cpmbinedTwo.toUpperCase().replace(/\s/g, '')

    console.log(`Guess One: ${guessOne}`)
    console.log(`Guess Two: ${guessTwo}`)
    console.log(`Final Answer: ${finalAnswer}`)

    if (guessOne === finalAnswer || guessTwo === finalAnswer) {
        alert('You Win!')
    } else {
        alert('Try Again')
    }
}




  return (
    <div className='bg-gray-400'>
        <h1>Anagram</h1>
        <button onClick={randomWords}>Start Game</button>
        <div>
            <h1>{wordOne.name}</h1>
            <h1>{wordTwo.name}</h1>
            <h1>{shuffledWord}</h1>
        </div>
        <div className='flex flex-row flex-wrap justify-center '>
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
        <form onSubmit={handleSubmit(compareWords)}>
        <div className='flex flex-col'>
            <input
            // {...register('userInputOne', { required: true })}
            onChange={(e) => setUserInputOne(e.target.value)}
            className='p-2 m-2'
             type='text' />
            <input
            // {...register('userInputTwo', { required: true })}
            onChange={(e) => setUserInputTwo(e.target.value)}
            className='p-2 m-2'
             type='text' />
        </div>
        <button type='submit'>Submit</button>                                           
        </form>


    </div>
  )
}

export default Game