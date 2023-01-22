import React, { useState } from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import TextField from '@mui/joy/TextField'
import Button from '@mui/joy/Button'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleClick(event) {
    event.preventDefault()
    return axios
      .post('http://localhost:5001/api/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.data.id) {
          navigate('/home')
          localStorage.setItem('userId', response.data.data.id)
        } else {
          alert('Incorrect username or password')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <TextField
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            // pass down to FormLabel as children
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button onClick={handleClick}>
            <span>Log in</span>
          </Button>
          <Typography
            endDecorator={<NavLink to="/register"> Sign Up</NavLink>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  )
}

export default LoginScreen
