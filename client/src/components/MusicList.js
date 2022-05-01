import React, {Component} from "react";
import Items from "./Items";
import AddItem from "./AddItem";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem, toggleItem } from "../actions/itemActions"
import PropTypes from "prop-types";
import AppNavbar from "./AppNavbar.js";
import {Container} from "reactstrap";

// !!! https://github.com/cookpete/react-player

class MusicList extends Component {

    componentDidMount = () => {
        this.props.getItems();
    }

    toggle = (id) => {
        this.props.toggleItem(id)
        console.log(this.props.item.items)
    }

    delItem = (id) => {
        this.props.deleteItem(id)
    }

    addItem = (item, url) => {
        this.props.addItem(item, url)
        console.log(this.props.item.items)
    }

    render() {
        const { items } = this.props.item
        console.log(items)

        return (
            
            <div>

                {/* <div class="sticky-top">
                    <AppNavbar toggle={this.toggle} items={items} ref={instance => { this.appnavbar = instance; }}/>
                    <AddItem addItem={this.addItem}/>
                </div>

                <Items items={items} toggle={this.toggle} delItem={this.delItem} next={() => this.appnavbar.nextTrack, console.log("bruh") }/> */}

                <div class="sticky-top">
                    <AppNavbar toggle={this.toggle} items={items} />
                    <AddItem addItem={this.addItem}/>
                </div>

                <Items items={items} toggle={this.toggle} delItem={this.delItem}/>

            </div>

        )
        
    }

}

MusicList.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired, 
    addItem: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
    {
    item: state.item
    }
)

export default connect(mapStateToProps, { getItems, deleteItem, addItem, toggleItem})(MusicList);