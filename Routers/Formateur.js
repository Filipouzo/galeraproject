/* Import des modules */
const express = require('express')
const ctrlFormateur = require('../Controllers/Formateur')

/* Récupère le router d'express */
let router = express.Router()



/** Routage de formateur */
router.get('', ctrlFormateur.getAllFormateurs)

router.get('/:id', ctrlFormateur.getFormateur)

router.put('', ctrlFormateur.addFormateur)

module.exports=router