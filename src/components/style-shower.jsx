import React from 'react'

export default function StyleShower({ styles }) {
  return (
    <div className='flex gap-10 h-[40px]'>
      {styles.heading &&
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-10 h-10'>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M11 7h2v10h-2v-4H7v4H5V7h2v4h4zm6.57 0A4.737 4.737 0 0115 9v1h2v7h2V7z"></path>
        </svg>
      }
      {styles.bold &&
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-10 h-10'>
        <path d="M333.49 238a122 122 0 0027-65.21C367.87 96.49 308 32 233.42 32H34a16 16 0 00-16 16v48a16 16 0 0016 16h31.87v288H34a16 16 0 00-16 16v48a16 16 0 0016 16h209.32c70.8 0 134.14-51.75 141-122.4 4.74-48.45-16.39-92.06-50.83-119.6zM145.66 112h87.76a48 48 0 010 96h-87.76zm87.76 288h-87.76V288h87.76a56 56 0 010 112z"></path>
      </svg>
      }
      {styles.font &&
        <div className='h-10 w-10 bg-[red]'></div>
      }
      {styles.highlight &&
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512" className='w-10 h-10'>
         <path d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04zm124.61-240.01a36.592 36.592 0 00-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"></path>
       </svg>
      }
      {styles.underline &&
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-10 h-10'>
        <path d="M32 64h32v160c0 88.22 71.78 160 160 160s160-71.78 160-160V64h32a16 16 0 0016-16V16a16 16 0 00-16-16H272a16 16 0 00-16 16v32a16 16 0 0016 16h32v160a80 80 0 01-160 0V64h32a16 16 0 0016-16V16a16 16 0 00-16-16H32a16 16 0 00-16 16v32a16 16 0 0016 16zm400 384H16a16 16 0 00-16 16v32a16 16 0 0016 16h416a16 16 0 0016-16v-32a16 16 0 00-16-16z"></path>
      </svg>
      }
    </div>
  )
}
