import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useReducer } from 'react'



interface State {
    count: number
}


type Action = { type: 'increment' } | { type: 'decrement' }

const initialState = {
    count: 0
}

function reducer(state: State, action: Action,) {

    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }

        default:
            throw new Error("UnHandled Case")
    }
}

const Counter = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <View>
            <Text>Counter : {state.count}</Text>

            <Button onPress={() => dispatch({ type: 'increment' })} title='Increment' />

            <Button onPress={() => dispatch({ type: 'decrement' })} title='Decrement' />
        </View>
    )
}

export default Counter

const styles = StyleSheet.create({})