import React, {Component} from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth ,signInWithGoogle} from '../../firebase/firebase.utils'

class SignIn extends Component{
    constructor(props){
        super(props);

        this.state={
            email:'',
            password:''
        }
    }
    handleSubmit = async event =>{
        event.preventDefault()
        const {email, password} = this.state;
       try{
           await auth.signInWithEmailAndPassword(email , password)
           this.setState({email: '' ,password: ''})
       }catch(error){
        console.log(error)
       }

    }
    handleChange = event =>{
       const {value , name} = event.target;
       this.setState({ [name]: value})
    }
    render(){
        const {email , password} =this.state;
        return(
            <div className= 'sign-in'>
            <h2>I alread have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={this.handleSubmit}>
                <FormInput 
                name="email" 
                type="email" 
                value= {email}  
                label="Email"
                handleChange={this.handleChange}
                requires/>
          
                <FormInput name="password" type="password"  handleChange={this.handleChange} value= {password} label="Password" requires/>
            
            <div className='buttons'>

                <CustomButton type="submit">
                    Sign in
                </CustomButton>
                <CustomButton onClick= {signInWithGoogle} isGoogleSignIn>
                {' '}
                    Sign in with Google  {' '}
                </CustomButton>
            </div>
            </form>

            </div>
        )
    }
}

export default SignIn