import React, { useState, useEffect } from 'react'
import { normalMode } from '../data/normal.js'
import { useForm } from 'react-hook-form'

const normal = normalMode;

const Game = () => {
const [wordOne, setWordOne] = useState('')
const [wordTwo, setWordTwo] = useState('')
const [shuffledWord, setShuffledWord] = useState('')
const [letters, setLetters] = useState([])
const [letterEffect , setLetterEffect] = useState([])
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
    const shuffledWordArray = shuffledWord.split('')
    setLetters(shuffledWordArray)
};

//Function that will compare the user input to the two words
const compareWords = () => {
    const combinedOne = userInputOne + userInputTwo
    const guessOne = combinedOne.replace(/\s/g, '')
    const combinedTwo = userInputTwo + userInputOne
    const guessTwo = combinedTwo.replace(/\s/g, '')

    if (guessOne === finalAnswer || guessTwo === finalAnswer) {
        alert('You Win!')
    } else {
        alert('Try Again')
    }
}

const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInputOne(value.toUpperCase());
    setUserInputTwo(value.toUpperCase());
    };


useEffect(() => {
    setLetters(
      letters.map((letter) =>
        userInputOne.includes(letter) ? (
          <span className="text-green-500">{letter}</span>
        ) : (
          letter
        )
      )
    );
  }, [userInputOne]);




  return (
    <div className='bg-gray-400'>
        <h1>Anagram</h1>
        <button onClick={randomWords}>Start Game</button>
        <div>
            <h1>{wordOne.name}</h1>
            <h1>{wordTwo.name}</h1>
            <h1>{shuffledWord}</h1>
        </div>

    <div className='flex flex-row flex-wrap justify-center'>
    {letters}
    </div>

        {/* <div className='flex flex-row flex-wrap justify-center '>
            {shuffledWordArray.map((letter, index) => {
                return (
                    <div key={index} className="h-4 w-4 p-4 m-4">
                        <h1>{letter}</h1>
                        </div>
                )
            })}
        </div> */}

{/* third]) */}
        



        {/* Two input fields that will compare user inputs to wordOne and wordTwo */}
        <form onSubmit={handleSubmit(compareWords)}>
        <div className='flex flex-col'>
            <input
            // {...register('userInputOne', { required: true })}
            value={userInputOne}
            // onChange={(e) => setUserInputOne(e.target.value.toUpperCase())}
            onChange={handleInputChange}
            className='p-2 m-2'
             type='text' />
            <input
            // {...register('userInputTwo', { required: true })}
            value={userInputTwo}
            // onChange={(e) => setUserInputTwo(e.target.value.toUpperCase())}
            onChange={handleInputChange}
            className='p-2 m-2'
             type='text' />
        </div>
        <button type='submit'>Submit</button>                                           
        </form>


    </div>
  )
}

export default Game