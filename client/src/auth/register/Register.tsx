import React from 'react';
import {Button, Container, Stack, TextField} from "@mui/material";
import {useForm} from 'react-hook-form';
import {RegisterDTO} from "../../common/types";
import {useAuth} from "../hooks/useAuth";

const RegisterPage = () => {
    const {register, handleSubmit, formState: {isValid}} = useForm<RegisterDTO>();
    const {registerUser} = useAuth();
    return (
        <Container maxWidth="xs" sx={{height: '100%'}}>
            <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%', marginTop: '50px' }}>
                <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
                       onSubmit={handleSubmit(registerUser)}>
                    <TextField label="Username" variant="outlined" autoFocus {...register('username', {required: true})}/>
                    <TextField label="Password" type="password"
                               variant="outlined" {...register('password', {required: true})}/>
                    <Button variant="contained" type="submit" disabled={!isValid}>Register</Button>
                </Stack>
            </Stack>
        </Container>
    )
}
export default RegisterPage;