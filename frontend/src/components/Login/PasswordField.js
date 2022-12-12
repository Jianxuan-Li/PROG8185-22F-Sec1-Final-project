
import React, { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'

import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({passwordRef, id='password',label='Password'}) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDown = (e) => {
        e.preventDefault()
    }

  return (
    <TextField
    autoFocus
    margin="dense"
    id={id}
    label={label}
    type={showPassword?'text':'password'}
    fullWidth
    variant="standard"
    inputRef={passwordRef}
    InputProps= {{minLength:6}}
    required
    inputProps={{
        endAdornment: (
            <InputAdornment position='end'>
               <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                {showPassword? <VisibilityOff /> : <Visibility />}
               </IconButton>
            </InputAdornment>
        )
    }}

   /> 
  )
}

export default PasswordField