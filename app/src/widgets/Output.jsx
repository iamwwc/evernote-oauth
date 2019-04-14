import React from 'react'
export function Output(obj) {
  let arr = []
  Object.keys(obj).forEach(key => {
    arr.push(
      <li className="result" key={key.toString()}>
        <span>{key}</span>
        <span>{obj[key]}</span>
      </li>
    )
  })
  return (
    <ol className="output">
      {arr}
    </ol>
  )
}