import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDice} from '@fortawesome/free-solid-svg-icons'

import './styles.css'

export default class Random extends React.Component {

    state = {
        min: 1,
        max: 10,
        current: 0,
        number: 0
    }

    inputChanged = (e) => {
        if (e.target.id === 'min') {
            this.setState({ ...this.state, min: e.target.value })
        }
        else {
            this.setState({ ...this.state, max: e.target.value })
        }
    }

    randomNumber = () => {
        let min = Math.ceil(this.state.min)
        let max = Math.floor(this.state.max)
        let number = Math.floor(Math.random() * (max - min + 1)) + min;

        this.setState({ ...this.state, number})

        this.roll()
    }

    roll = () => {
        
        let min = this.state.min
        let max = this.state.max

        let inc = (min, max) => {
            let current = this.state.current

            if(current < max){
                current++
            }
            else{
                current = min
            }

            this.setState({...this.state, current})
            console.log('Rolling...')
        }

        let stopInterval = setInterval(() => inc(min,max), 50)

        let showNumber = (stopInterval) => {
            clearInterval(stopInterval)
            let number = this.state.number
            this.setState({...this.state, current: number})
            console.log('Stoped!')
        } 

        setTimeout(() => showNumber(stopInterval), 2000)
    }

    render() {
        return (
            <div className='container'>
                <div className='header'>
                    <FontAwesomeIcon icon={faDice} className='icon'/>
                    <h1>Randomerator</h1>
                </div>
                <div className='content'>
                    <div className='form'>
                        <label>Min</label>
                        <input id='min' type='text' value={this.state.min} onChange={this.inputChanged} />
                        <label>Max</label>
                        <input id='max' type='text' value={this.state.max} onChange={this.inputChanged} />
                        <h1>{this.state.current}</h1>
                        <a href='#' onClick={this.randomNumber}>Run!</a>
                    </div>
                </div>
            </div>
        )
    }
}