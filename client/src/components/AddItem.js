// const titleScrape = require("D:/Parrot/Desktop/Dev/Duplicate/Embedded_Music_Player/client/src/utils/video/index.js")
import React, { Component } from 'react'

export class AddItem extends Component {
    state = {
        url: ""
    }

    onChange = (e) => this.setState({ url: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.url)

        if (this.state.url.match(/soundcloud.com/)) {

            async function newItem(url, callback) {

                const response = await fetch("https://soundcloud.com/oembed?format=json&url=" + url );
                const json = await response.json();

                console.log(response.body)

                let html = json.html.match(/(?<=url=).{53}/).toString()

                let newItem = {
                    url: html,
                    name: json.title,
                    isOpen: false
                }

                callback(newItem, url);

            }

            newItem(this.state.url, this.props.addItem)

            this.setState({ url: "" })

        }

        else if (this.state.url.match(/youtube.com/)) {

            let newItem

            // return newItem;

            this.props.addItem(newItem, this.state.url);

            this.setState({ url: "" })

        }

    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: "flex"}}>
                <input style={{flex: "10", padding: "5px"}} type="text" name="title" placeholder="Add Item ..." value={this.state.url} onChange={this.onChange}/>
                <input type="submit" value="submit" className="btn" style={{flex: "1"}}/>
            </form>
        )
    }
}

export default AddItem