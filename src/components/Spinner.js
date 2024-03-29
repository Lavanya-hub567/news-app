import React, { Component } from 'react'
import load from './load.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <h1>
        <img src={load} alt='Loading...'/>
        </h1>
      </div>
    )
  }
}
