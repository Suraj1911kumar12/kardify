// import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Mainstacknavigator from './Navigation/Mainstacknavigator';
import { AuthProvider } from '../context/AuthContext';




const Route = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Mainstacknavigator />
            </AuthProvider>
        </NavigationContainer>
    )
}

export default Route