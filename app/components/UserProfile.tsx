import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useReducer, useState } from 'react'


interface Profile {
    id: string
    name: string
    age: number
}

interface State {
    profiles: Profile[]
}

interface AddProfileAction {

    type: "ADD_PROFILE"
    payload: { name: string, age: number }
}

interface REMOVEProfileAction {

    type: "REMOVE_PROFILE"
    payload: string
}

interface UpdateProfileAction {

    type: "UPDATE_PROFILE"
    payload: { name: string, age: number, id: string }
}

type Action = AddProfileAction | REMOVEProfileAction | UpdateProfileAction





const initialState = { profiles: [] }
const reducer = (state: State, action: Action): State => {


    switch (action.type) {
        case "ADD_PROFILE":

            return {
                profiles: [...state.profiles, {
                    id: Date.now().toString(),
                    name: action.payload.name,
                    age: action.payload.age
                }]
            }

        case 'REMOVE_PROFILE':
            return {
                profiles: state.profiles.filter((profile) => profile.id != action.payload)
            }


        case 'UPDATE_PROFILE':
            return {

                profiles: state.profiles.map((profile) => profile.id == action.payload.id ? {
                    ...profile,
                    name: action.payload.name,
                    age: action.payload.age,
                } : profile)
            }
        default:
            return state

    }
}

const UserProfile = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)

    const handleAddPress = () => {
        if (name.trim() && age.trim()) {



            dispatch({
                type: "ADD_PROFILE",
                payload: { name, age: parseInt(age, 10), }
            }
            )

            setName("")
            setAge("")
        }
    }


    const handleRemoveProfile = (id: string) => {
        dispatch({
            type: "REMOVE_PROFILE",
            payload: id
        })
    }

    const handleUpdatePress = (id: string) => {
        dispatch({
            type: "UPDATE_PROFILE",
            payload: { id, name, age: parseInt(age, 10) }
        })


        setName("")
        setAge("")
        setEditingId(null)
    }




    return (
        <View>

            <TextInput style={styles.input} placeholder='Enter Name' onChangeText={(text) => {
                setName(text)
            }
            } value={name} />
            <TextInput style={styles.input} placeholder='Enter Age' onChangeText={(text) => setAge(text)} value={age} keyboardType='numeric' />


            {editingId ? (
                <Button title='Update Button' onPress={() => handleUpdatePress(editingId)} />
            ) : (
                <Button title='Add Button' onPress={() => {
                    handleAddPress()
                }} />
            )}

            <FlatList
                data={state.profiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<View style={styles.profileItem}>
                    <Text style={styles.profileText}>{item.name}, {item.age} Years Old</Text>

                    <TouchableOpacity onPress={() => {
                        setName(item.name)
                        setAge(item.age.toString())
                        setEditingId(item.id)
                    }} >
                        <Text style={styles.editButton}>Edit</Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        handleRemoveProfile(item.id)
                    }}>
                        <Text style={styles.removeButton}>Remove</Text>

                    </TouchableOpacity>
                </View>)
                }></FlatList>




        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    profileText: {
        fontSize: 16,
        flex: 1,
    },
    editButton: {
        color: "blue",
        marginRight: 10,
    },
    removeButton: {
        color: "red",
    },
});