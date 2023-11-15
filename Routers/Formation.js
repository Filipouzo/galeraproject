/* Import des modules */
const express = require('express')
const ctrlFormation = require('../Controllers/Formation')

/* Récupère le router d'express */
let router = express.Router()

/** Middleware time */
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Date de formation : ', event.toString())
    //* Attention : Le next permet de sortir du middleware sinon on reste dedans
    next()
})

/** Routage de formation */
router.get('', ctrlFormation.getAllFormations)

router.get('/:id', ctrlFormation.getFormation)

router.put('', ctrlFormation.addFormation)

module.exports=router