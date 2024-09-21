import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";

export default function App() {

  const [inputTextValue, setInputTextValue] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [passwordLengh, setPasswordLengh] = useState(1);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const [button, setButton] = useState(<FaRegCopy />);

  const [weakone, setWeakone] = useState(false);
  const [weaktwo, setWeaktwo] = useState(false);
  const [weakthree, setWeakthree] = useState(false);
  const [weakfour, setWeakfour] = useState(false);

  const calculateBackground = () => {
    const min = 1;
    const max = 20;
    const val = passwordLengh;
  
    return `linear-gradient(to right, hsl(127, 100%, 82%) ${(val - min) / (max - min) * 100}%, #000 ${(val - min) / (max - min) * 100}%)`;
  }
  

  function generatePassword(lengh , includeLowercase , includeUppercase , includeNumbers , includeSymbols){

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz' ;
    const uppercaseChars = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
    const numbersChars = '0123456789' ;
    const symbolsChars = '!@#$%^&*()_+=-' ;

    let allowedChars = "" ;
    let password = "" ;

    allowedChars += includeLowercase ? lowercaseChars : "";
    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeNumbers ? numbersChars : "";
    allowedChars += includeSymbols ? symbolsChars : "";

    if(lengh <= 0){
        return ``
    }
    if(allowedChars.length === 0){
        return ``
    }
    for(let i = 0 ; i < lengh ; i++){
        const randomIndex = Math.floor(Math.random() * allowedChars.length); 
        password += allowedChars[randomIndex];
    }
    
    return password ;
  }

  const password = generatePassword(passwordLengh , includeLowercase , includeUppercase , includeNumbers , includeSymbols);

  useEffect(() => {
    setButton(<FaRegCopy />);
  }, [refresh]);

  useEffect(() => {
    if(inputTextValue !== '') {
      if (passwordLengh <= 5) {
        setWeakone(true);
        setWeakfour(false);
        setWeakthree(false);
        setWeaktwo(false);
      } else if (passwordLengh <= 10) {
        setWeaktwo(true);
        setWeakone(false);
        setWeakthree(false);
        setWeakfour(false);
      } else if (passwordLengh <= 15) {
        setWeakthree(true);
        setWeakone(false);
        setWeaktwo(false);
        setWeakfour(false);
      } else if (passwordLengh <= 20) {
        setWeakfour(true);
      } 
    }
  }, [inputTextValue, passwordLengh]);

  return (
    <div className='bg-[hsl(248,15%,11%)]'>
    <div className='min-h-[100vh] max-w-[1920px] mx-auto flex flex-col justify-center items-center'>
      <div className="container max-w-[30rem]">
      <header className='my-4'>
        <h2 className='text-center my-4 text-gray font-medium text-xl'>Password Generator</h2>
        <div className='flex items-center w-full relative'>
          <input 
          className='py-4 px-6 w-full bg-tosi placeholder-[hsla(0,0%,100%,0.2)] font-bold text-2xl text-white'
          placeholder='P4$5W0rD!' 
          value={inputTextValue} 
          type="text" 
          disabled
          />
          <button
          className='absolute right-7 text-green scale-150 transition-all duration-600 hover:text-white'
          onClick={() => navigator.clipboard.writeText(inputTextValue).then(() => {
            inputTextValue.length === 0 ? setButton(<FaRegCopy />) : setButton(`Text Copied`);
          })}>{button}</button>
        </div>
      </header>
      <main className='bg-tosi p-6'>
        <div className='flex items-center justify-between'>
          <h5 className='text-white mb-3 '>Character Length</h5>
          <h6 className='pr-3 text-green scale-150'>{passwordLengh}</h6>
        </div>
        <input 
        className='uniq mb-7'
        onChange={e => setPasswordLengh(e.target.value)}
        value={passwordLengh}
        type="range"
        min={`1`} 
        max={`20`}
        style={{
          background: calculateBackground(),
          height: '8px',
          outline: 'none',
          opacity: '0.7',
        }}
        />
        <div className='flex flex-col items-start space-y-3 mb-4'>
          <button className='flex items-center gap-2'>
            <input
            className='uni cursor-pointer'
            id='checkOne' 
            type="checkbox" 
            value={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            <label className='text-white cursor-pointer' htmlFor="checkOne">Include Uppercase Letters</label>
          </button>
          <button className='flex items-center gap-2'>
            <input 
            className='uni cursor-pointer'
            id='checkTwo' 
            type="checkbox" 
            onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            <label className='text-white cursor-pointer' htmlFor="checkTwo">Include Lowercase Letters</label>
          </button>
          <button className='flex items-center gap-2'>
            <input 
            className='uni cursor-pointer'
            id='checkThree' 
            type="checkbox" 
            onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            <label className='text-white cursor-pointer' htmlFor="checkThree">Include Numbers</label>
          </button>
          <button className='flex items-center gap-2'>
            <input 
            className='uni cursor-pointer'
            id='checkFour' 
            type="checkbox" 
            onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            <label className='text-white cursor-pointer' htmlFor="checkFour">Include Symbols</label>
          </button>
        </div>
        <div className='bg-[hsl(248,15%,11%)] flex items-center justify-between p-4 mb-6'>
          <h6 className='font-medium text-gray'>STRENGH</h6>
          <div className='flex gap-2'>
            <div className={weakfour ? 'bg-green h-7 w-[0.7rem]' : weakthree ? 'bg-yellow h-7 w-[0.7rem]' : weaktwo ? 'bg-orange h-7 w-[0.7rem] ' : weakone ? 'bg-red h-7 w-[0.7rem]' : 'h-7 w-[0.7rem] border-2 border-white'}></div>
            <div className={weakfour ? 'bg-green h-7 w-[0.7rem]' : weakthree ? 'bg-yellow h-7 w-[0.7rem]' : weaktwo ? 'bg-orange h-7 w-[0.7rem] ' : 'h-7 w-[0.7rem] border-2 border-white'}></div>
            <div className={weakfour ? 'bg-green h-7 w-[0.7rem]' : weakthree ? 'bg-yellow h-7 w-[0.7rem]' : 'h-7 w-[0.7rem] border-2 border-white'}></div>
            <div className={weakfour ? 'bg-green h-7 w-[0.7rem]' : 'h-7 w-[0.7rem] border-2 border-white'}></div>
          </div>
        </div>
        <button  
        onClick={() => {
          setRefresh(refresh + 1);
          setInputTextValue(password);
        }}
        className='flex items-center gap-5 w-full justify-center p-4 bg-green text-lg font-bold border-2 transition-all duration-600 hover:border-2 hover:border-green hover:text-green hover:bg-transparent'>GENERATE <FaArrowRight /></button>
      </main>
      </div>
    </div>
    </div>
  );
}
