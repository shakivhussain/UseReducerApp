import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useReducer, useState } from 'react'



interface Todo {
    id: string
    todo: string
}

interface AddToDoActions {
    type: "ADD_TODO"
    payload: string
}

interface RemoveTodoAction {
    type: "REMOVE_TODO"
    payload: string
}

type Action = AddToDoActions | RemoveTodoAction



interface State {
    todos: Todo[]
}


const initialState = { todos: [] }

const reducer = (state: State, action: Action): State => {

    console.log("" + { action });

    switch (action.type) {
        case 'ADD_TODO':
            return {
                todos: [...state.todos, { id: Date.now().toString(), todo: action.payload }]
            }

        case "REMOVE_TODO":
            return {


                todos: state.todos.filter((todo) => todo.id != action.payload)
            }
        default:
            return state

    }
}



const Todo = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [inputValue, setInputValue] = useState<string>('')


    const handleAddTodo = () => {
        if (inputValue.trim()) {
            dispatch({ type: "ADD_TODO", payload: inputValue })
            setInputValue('')
        }
    }

    const handleRemoveTodo = (id: string) => {

        dispatch({ type: "REMOVE_TODO", payload: id })
    }

    return (
        <View>
            <Text>To Do</Text>

            <TextInput style={styles.input} placeholder='Enter Some Value' onChangeText={setInputValue} value={inputValue} />

            <Button title='Add Todo' onPress={() => handleAddTodo()} />


            <Text>{state.todos.length}</Text>

            <FlatList data={state.todos}
                renderItem={({ item }) =>
                    <View style={styles.todoItem}>

                        <Text style={styles.todoText}>{item.todo}</Text>
                        <TouchableOpacity onPress={() => handleRemoveTodo(item.id)} >
                            <Text style={styles.removeButton} >Remove</Text>
                        </TouchableOpacity>
                    </View>
                } keyExtractor={item => item.id} />



        </View>
    )
}



const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    todoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    todoText: {
        fontSize: 16,
    },
    removeButton: {
        color: "red",
    },
});

export default Todo