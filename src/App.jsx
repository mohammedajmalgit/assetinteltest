import { useState } from 'react';
import './App.css';
import MyEditor from './components/editor';
import StyleShower from './components/style-shower';

function App() {
  const [styles, setStyles] = useState({
    heading: false,
    bold: false,
    font: false,
    underline: false,
    highlight: false,
  })
  return (
    <div className="flex flex-col w-full p-[30px]">
      <div className='flex justify-center items-center w-full relative'>
        <p className='mx-auto text-black font-[600] text-[24px]'>Demo editor by Mohammed Ajmal</p>
       
      </div>
      <div>
        <StyleShower styles={styles} />
      </div>
      <div className='border-[2px] border-black mt-[50px] min-h-[400px]'>
        <MyEditor styles={styles} setStyles={setStyles} />
      </div>
    </div>
  );
}

export default App;
