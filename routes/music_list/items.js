const titleScrape = require("../../client/src/video/index.js");
const soundcloudScrape = require("../../client/src/soundcloudScraper/video/index.js")
const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");

// @route GET music_list/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
    Item.find()
        .then(items => res.json(items))
});

// @route POST music_list/items
// @desc Create Item(s)
// @access Public
router.post("/", (req, res) => {

    if (req.body.url.match(/soundcloud.com/)) {

        soundcloudScrape(req.body.url).then(x => {
            const newItem = new Item({
                name: req.body.item.name,
                url: req.body.url,
                duration: x,
                isOpen: false
            })
            return newItem
        }).then(newItem => newItem.save().then(item => res.json(item)))
    
        // console.log(newItem)
    
        // newItem.save().then(item => res.json(item))

    }

    else if (req.body.url.match(/youtube.com/)) {

        const regexID = /(?<=v=).*/
        let id = req.body.url.match(regexID)

        async function newItem(id) {

            const item = await titleScrape(id)

            // let html = json.html.match(/(?<=url=).{53}/).toString()

            const newItem = new Item({
                url: item.object.url,
                name: item.object.name,
                duration: item.object.durationInSeconds,
                isOpen: false
            })
        
            console.log(newItem)
        
            newItem.save().then(item => res.json(item))

        }

        newItem(id);

    }

});

// @route DELETE music_list/items/:id
// @desc Delete Item(s)
// @access Public
router.delete("/:id", (req, res) => {

    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))

});


module.exports = router;