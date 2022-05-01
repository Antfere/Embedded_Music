import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Collapse} from "reactstrap";
import Embed from "./Embed.js";

export class Item extends Component {

    getStyle = () => {
        return {
            background: "#f4f4f4",
            padding: "10px",
            borderBottom: "1px #ccc dotted"
        }
    }

    render() {

        return (
            
            <div style={this.getStyle()}>

            
                <input type="checkbox" checked={this.props.isOpen} onChange={this.props.toggle.bind(this, this.props.item._id)}/> { " " }
                { this.props.item.name }
                <button style={ btnStyle } onClick={this.props.delItem.bind(this, this.props.item._id)}>x</button>
                

                <Collapse isOpen={this.props.isOpen}>
                    <Embed item={this.props.item} isOpen={this.props.isOpen} next={this.props.next}/>
                </Collapse>

            </div>
        )
    }
}

// PropTypes
Item.propTypes = {
    item: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired
}

const btnStyle = {
    background: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
}

export default Item;
