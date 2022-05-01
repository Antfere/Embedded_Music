import React, { Component } from 'react';
import Item from "./Item";
import PropTypes from "prop-types";
import Embed from "./Embed.js";

class Items extends Component {
    
    render() {

        return this.props.items.map((item) => (

            <div>

                <Item key={item._id} item={item} toggle={this.props.toggle} delItem={this.props.delItem} isOpen={item.isOpen} next={this.props.next}/>

            </div>

            ));
    }
}

// PropTypes
Items.propTypes = {
    items: PropTypes.array.isRequired,
    next: PropTypes.func.isRequired
}

export default Items;