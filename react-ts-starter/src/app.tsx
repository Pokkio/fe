/*
 * @Description:
 * @Author: Pokkio
 * @Date: 2021-02-18 16:30:15
 * @LastEditTime: 2021-02-18 21:53:26
 * @LastEditors: Pokkio
 */
import React from 'react'

interface IProperties {
  name: string
  age: number
}

function App(properties: IProperties): React.ReactElement {
  const { name, age } = properties
  return (
    <div className="app">
      <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
    </div>
  )
}

export default App
