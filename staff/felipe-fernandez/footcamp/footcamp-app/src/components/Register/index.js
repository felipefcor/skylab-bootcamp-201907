import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Feedback from '../Feedback'
import InitialHeader from '../InitialHeader'

function Register(props) {
    const { history } = props
    const [error , setError] = useState(undefined) 

    function handleRegister (name, surname, email, password) {

        (async()=>{
            
            try {
               await logic.registerUser(name, surname, email, password)
               history.push('/register-success')
            
            } catch ({ message }) {
                setError(message)
            }
        })()
      }
    
    
    const handleFormSubmit = event => {
        event.preventDefault()
        handleRegister(name, surname, email, password)
    }


        const [name, setName] = useState(null)
        const [surname, setSurname] = useState(null)
        const [email, setEmail] = useState(null)
        const [password, setPassword] = useState(null)
  

    const handleNameInput = event => setName(event.target.value)
    const handleSurnameInput = event => setSurname(event.target.value)

    const handleEmailInput = event => setEmail(event.target.value)

    const handlePasswordInput = event => setPassword(event.target.value)


    const handleBack = () => {
        
            history.push('/')
      }


    
    return (
        <div >
            <InitialHeader />
            <div className="register">
            <h2>REGISTER</h2>
            <form onSubmit={handleFormSubmit}>
            <div class="form-inputs">
                <input
                   
                    type="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleNameInput}
                    
                />
            </div>
            <div class="form-inputs">
                <input
                   
                    type="surname"
                    name="surname"
                    placeholder="Surname"
                    onChange={handleSurnameInput}
                    
                />
            </div>
            <div class="form-inputs">
                <input
                    
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailInput}
                    
                />
            </div>
            <div class="form-inputs">
                <input
                    
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordInput}
                    
                />
            </div>
                <button className="button">Submit</button>
            </form>
            {error && <Feedback message={error}/>}
            <a href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}><i className="fas fa-arrow-circle-left fa-2x"></i></a>
        </div>
        </div>
    )
}

export default withRouter(Register)
