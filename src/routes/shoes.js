const express = require('express');
const router = express.Router();
const Shoe = require('../models/Shoe');

router.get('/', async (req, res) => {
    const shoes = await Shoe.find();
    res.json(shoes);
});
router.get('/:id', async (req, res) => {
    const shoe = await Shoe.findById(req.params.id);
    res.json(shoe);
});
router.post('/', async (req, res) => {
    const shoe = new Shoe(req.body);
    await shoe.save();
    console.log(shoe)
    res.json({
        status: 'Shoe saved.'
    });
});
router.put('/:id', async (req, res) => {
    await Shoe.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Shoe Updated.'
    });
});
router.delete('/:id', async (req, res) => {
    await Shoe.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Shoe Deleted.'
    });
});

module.exports = router;