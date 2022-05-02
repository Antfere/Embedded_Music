import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Container} from "reactstrap";
// const videoUrlToID = /(?<=v=).*/
const videoUrlToID = /(?<=v=).{11}(?!list)/

// !!! https://github.com/cookpete/react-player

export class Embed extends Component {

    // Deprecated in heroku???

    makeEmbed = (url) => {
        
        if (url.match(/soundcloud/) != null){
            // Extra check just in case
            if (url.match(/soundcloud/)[0] == "soundcloud") {
                let Video = "https://w.soundcloud.com/player/?visual=true&url=" + url + "&auto_play=true&show_artwork=true"
                return Video;
            }
        }

        if (url.match(/youtube/) != null){
            if (url.match(/youtube/)[0] == "youtube") {
                let videoID = url.match(videoUrlToID)
                let Video = "https://www.youtube.com/embed/" + videoID + "?autoplay=1" + "&rel=0" + "&vq=144p"
                return Video;
            }
        }

    }

    render() {

        if (this.props.isOpen === true) return (

            <Container>
                
                {/* <iframe allow="autoplay" allowfullscreen="allowfullscreen" frameborder="0" loading="eager" importance="high" src={((this.props.item.url.match(/soundcloud/)) ? "https://w.soundcloud.com/player/?visual=true&url=" + this.props.item.url + "&auto_play=true" : "https://www.youtube.com/embed/" + this.props.item.url.match(/(?<=v=).{11}(?!list)/) + "?autoplay=1" + "&rel=0" + "&vq=144p")} onLoad={() => {console.log("gg")}}/>*/}
                
                {/* This works */}
                <iframe allowfullscreen="allowfullscreen" frameBorder="0" loading="eager" importance="high" src={this.makeEmbed(this.props.item.url)}/>
            </Container>

        )

        else return null;

    }

}

// PropTypes
Embed.propTypes = {
    item: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired
}

export default Embed;