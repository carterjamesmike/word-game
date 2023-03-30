import React, { useState, useEffect } from 'react'
import { nameData } from '../data/nameData.js'
import { useForm } from 'react-hook-form'

const names = nameData;

const Game = () => {
const [wordOne, setWordOne] = useState('')
const [wordTwo, setWordTwo] = useState('')
const [shuffledWord, setShuffledWord] = useState('')
const [letters, setLetters] = useState([])
const [userInputOne, setUserInputOne] = useState('')
const [userInputTwo, setUserInputTwo] = useState('')
const [finalAnswer, setFinalAnswer] = useState('')
const { register, handleSubmit } = useForm()
const [guessArrayOne, setGuessArrayOne] = useState([])
const [guessArrayTwo, setGuessArrayTwo] = useState([])
const [currentGuess, setCurrentGuess] = useState([])
const [gameMode, setGameMode] = useState(false)
const [displayAnswer, setDisplayAnswer] = useState(false)


//Function to randomoly select two words from the normal mode array
const randomWords = () => {
    setGameMode(true)
    const randomWordOne = names[Math.floor(Math.random() * names.length)]
    const randomWordTwo = names[Math.floor(Math.random() * names.length)]
    setWordOne(randomWordOne)
    setWordTwo(randomWordTwo)
    shuffle(randomWordOne, randomWordTwo)
}

const randomWord = () => {
    setGameMode(false)
    const randomWordOne = names[Math.floor(Math.random() * names.length)]
    setWordOne(randomWordOne)
    console.log(randomWordOne)
    shuffle1(randomWordOne)
}

//Function that takes the two words and randomoly shuffles the letters into one word without spaces and all caps
const shuffle = (randomWordOne, randomWordTwo) => {
    setDisplayAnswer(false)
    setCurrentGuess('')
    const combinedWords = randomWordOne.name + randomWordTwo.name
    const joinedAnswer = combinedWords.toUpperCase().replace(/\s/g, '')
    setFinalAnswer(joinedAnswer)
    const wordOneLetters = randomWordOne.name.split('')
    const wordTwoLetters = randomWordTwo.name.split('')
    const combinedLettersArr = wordOneLetters.concat(wordTwoLetters)
    const shuffledLetters = combinedLettersArr.sort(() => Math.random() - 0.5)
    const shuffledWord = shuffledLetters.join('').toUpperCase().replace(/\s/g, '')
    setShuffledWord(shuffledWord)
    const shuffledWordArray = shuffledWord.split('')
    setLetters(shuffledWordArray)
};

const shuffle1 = (randomWordOne) => {
    setDisplayAnswer(false)
    setCurrentGuess('')
    const wordOneFinal = randomWordOne.name.toUpperCase().replace(/\s/g, '')
    setFinalAnswer(wordOneFinal)
    const wordOneLetters = randomWordOne.name.split('')
    const shuffledLetters = wordOneLetters.sort(() => Math.random() - 0.5)
    const shuffledWord = shuffledLetters.join('').toUpperCase().replace(/\s/g, '')
    setShuffledWord(shuffledWord)
    const shuffledWordArray = shuffledWord.split('')
    setLetters(shuffledWordArray)
};


//Function that will compare the user input to the two words
const compareWords = () => {
    const combinedOne = userInputOne + userInputTwo
    const guessOne = combinedOne.replace(/\s/g, '').toUpperCase()
    const combinedTwo = userInputTwo + userInputOne
    const guessTwo = combinedTwo.replace(/\s/g, '').toUpperCase()
    console.log(guessOne)
    console.log(guessTwo)
    console.log(finalAnswer)

    if (guessOne === finalAnswer || guessTwo === finalAnswer) {
        alert('You Win!')
    } else {
        alert('Try Again')
    }
}

const handleInputChange1 = (e) => {
    setUserInputOne(e.target.value)
    addToGuessArrayOne(e)
    };

const handleInputChange2 = (e) => {
    setUserInputTwo(e.target.value)
    addToGuessArrayTwo(e)
    };


const addToGuessArrayOne = (e) => {
    setGuessArrayOne(e.target.value)
    combineGuessArrays()
}

const addToGuessArrayTwo = (e) => {
    setGuessArrayTwo(e.target.value)
    combineGuessArrays()
}

//Function that will split, capitalize, and combine guessArrayOne and guessArrayTwo into one array
const combineGuessArrays = () => {
    const guessArrayCombine = guessArrayOne + guessArrayTwo
    const assistArray = guessArrayCombine.replace(/\s/g, '').toUpperCase()
    setCurrentGuess(assistArray)
}

const giveUp = () => {
    setDisplayAnswer(true)
}

useEffect(() => {
    combineGuessArrays()
}, [guessArrayOne, guessArrayTwo, currentGuess])

  return (
    <div className='bg-gray-800'>
        <h1 className='text-gray-200 poppins font-bold'>Harry Pottter Anagram</h1>

        <div className='inline-flex'>
            <button className='bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r m-2' onClick={randomWord}>New One Word Game</button>
            <button className='bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r m-2' onClick={randomWords}>New Two Word Game</button>            
        </div>

        
        <div>
            <h1 className='poppins text-gray-300 font-bold text-l'>{shuffledWord}</h1>
        </div>

        <div className='flex flex-row flex-wrap justify-center poppins text-gray-300 font-bold text-2xl'>
            {letters.map((letter, index) => {
                return (
                    <div key={index} className="h-4 w-4 m-4">
                        <h1>{letter}</h1>
                        </div>
                )
            })}
        </div>

        <div>
            <h1 className='text-gray-300 poppins font-bold'>{currentGuess}</h1>
        </div>


        
        {/* Two input fields that will compare user inputs to wordOne and wordTwo */}
        <form onSubmit={handleSubmit(compareWords)}>
        <div className='flex flex-col'>
            <input
            value={userInputOne}
            onChange={handleInputChange1}
            className='p-2 m-2 bg-slate-300'
             type='text' />
            <input
            value={userInputTwo}
            onChange={handleInputChange2}
            className={!gameMode ? 'hidden' : 'p-2 m-2 bg-slate-300'}
             type='text' />
        </div>
         <div className='flex flex-row'>
        <button className='bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r w-[100px]' type='submit'>Submit</button> 
        
         </div>
                                         
        </form>
        <button className='bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r w-[100px] mt-2' onClick={giveUp}>Give Up</button>     
        <div className={!displayAnswer ? 'hidden' : 'p2'}>
            {!gameMode ? <h1 className='text-gray-300 font-bold poppins'>{wordOne.name}</h1> : <h1 className='text-gray-300 font-bold poppins'>{wordOne.name} {wordTwo.name}</h1>}
        </div>


    </div>
  )
}

export default Game