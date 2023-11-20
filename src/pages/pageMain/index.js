import React, { useState } from 'react';
import RHFTextField from '../../hookForms/RHFTextField';
import { useForm } from 'react-hook-form';


function PageMain(){
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [text, setText] = useState("");
  

    const handleClick = () => {
      setLoggedIn(true)
    }
    
    const methods = useForm()

    const {
        register,
        getValues,
        setValue,
        onSubmit
    } = methods

    React.useEffect(() => {
      console.log("texto ", getValues())
    },[text])


    return(
      <div>
      {
        !isLoggedIn ? (
          <div>
            <h1>Login</h1>
          
            <button onClick={handleClick}>Logar</button>

            <RHFTextField
              name={text}
              value={text}
              label="Oh god"
              input={"true"}

            />
          </div>
      ) : (
        <div>
          <h1>Bem-vindo! Você está logado.</h1>
        </div>
      )}
    </div>
       
    )
}

export default PageMain