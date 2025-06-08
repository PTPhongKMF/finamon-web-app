import React from 'react'

export default function Test() {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_1fr]">
      <div className="bg-red-400 w-full h-full col-start-2 row-span-full">1</div>
      <div className="bg-green-400 w-full h-full">2</div>
      <div className="bg-blue-400 w-full h-full">3</div>

    </div>
  )
}
