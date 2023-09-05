import React from 'react';
import {Button, Container, Stack, TextField} from "@mui/material";
import {useForm} from 'react-hook-form';
import {LoginDTO} from "../../common/types";
import {useAuth} from "../hooks/useAuth";

const LoginPage = () => {
    const {register, handleSubmit, formState: {isValid}} = useForm<LoginDTO>();
    const {login} = useAuth();
    return (
        <Container maxWidth="xs" sx={{height: '100%'}}>
            <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%', marginTop: '50px' }}>
                <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
                       onSubmit={handleSubmit(login)}>
                    <TextField label="Login" variant="outlined" autoFocus {...register('login', {required: true})}/>
                    <TextField label="Password" type="password"
                               variant="outlined" {...register('password', {required: true})}/>
                    <Button variant="contained" type="submit" disabled={!isValid}>Login</Button>
                </Stack>
            </Stack>
        </Container>
    )
}
export default LoginPage;