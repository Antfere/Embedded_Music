import axios from "axios"
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, TOGGLE_ITEM, ITEMS_LOADING } from "./types"

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
    .get("/music_list/items")
    .then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data
    }))
}

export const deleteItem = (id) => dispatch => {
    axios.delete(`/music_list/items/${id}`)
    .then(res => dispatch ({
        type: DELETE_ITEM,
        payload: id
    }))
}

export const addItem = (item, url) => dispatch => {

    console.log(item, url)

    if (url.match(/soundcloud.com/)) {
        let data = {
            "url": url,
            "item": item
        }
        axios
        .post("/music_list/items", data)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
    }

    else if (url.match(/youtube.com/)) {
        let data = {
            "url": url,
            "item": item
        }
        axios
        .post("/music_list/items", data)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))

        // const regexID = /(?<=v=).*/
        // let id = url.match(regexID)

        // async function newItem(id) {

        //     const item = await titleScrape(id)

        //     // let html = json.html.match(/(?<=url=).{53}/).toString()

        //     let newItem = {
        //         url: item.object.url,
        //         name: item.object.name,
        //         isOpen: false
        //     }

        //     return newItem

        // }

        // newItem(id)
        // .then(item => axios.post("/music_list/items", item).then(res => dispatch({
        //     type: ADD_ITEM,
        //     payload: res.data
        // })))

    }
}

export const toggleItem = (id) => {
    return {
        type: TOGGLE_ITEM,
        payload: id
    }
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}