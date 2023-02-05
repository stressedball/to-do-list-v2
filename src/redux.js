import { configureStore } from '@reduxjs/toolkit';
import uniqid from 'uniqid'

const initialState = {
    items: getStorage()
}

function localStorageReducer(state = initialState, action) {

    let item = null
    
    if (action.id) {
        item = JSON.parse(localStorage.getItem(action.id))
    } else {
        switch (action.type) {
            case 'ADD_TASK':
                localStorage.setItem(uniqid(), JSON.stringify(action.item))
                break
            case 'ADD_PROJECT':
                localStorage.setItem(uniqid(), JSON.stringify(action.item))
                break
        }
        return {
            items: getStorage()
        }
    }
    
    switch (action.type) {
        case 'SET_IMPORTANT':
            item.important = item.important === 'important' ? '' : 'important'
            localStorage.setItem(action.id, JSON.stringify(item))
            break
        case 'TITLE_EDIT':
            item.title = action.value
            localStorage.setItem(action.id, JSON.stringify(item))
            break
        case 'DATE_EDIT':
            item.dueDate = action.dueDate
            localStorage.setItem(action.id, JSON.stringify(item))
            break
        case 'TASK_DONE':
            item.done = action.done
            localStorage.setItem(action.id, JSON.stringify(item))
            break
        case 'TASK_APPEND':
            if (item.tasks.filter(el => el === action.task).length > 0) {
                return {
                    items: getStorage()
                }
            }
            item.tasks.push(action.task)
            localStorage.setItem(action.id, JSON.stringify(item))
            break
        case 'ID_REMOVE':
            console.log(action.id)
            // localStorage.removeItem(action.id)
            break

    }
    return {
        items: getStorage()
    }
}

const store = configureStore({ reducer: localStorageReducer })

function getStorage() {
    let arr = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let value = JSON.parse(localStorage.getItem(key))
        arr.push([key, value])
    }
    return arr
}

export { store }