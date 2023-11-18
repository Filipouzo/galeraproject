/* Import des modules */
const express = require('express')
const ctrlEleve = require('../Controllers/Eleve')

/* Récupère le router d'express */
let router = express.Router()



/** Routage de élève */
router.get('', ctrlEleve.getAllEleves)

router.get('/:id', ctrlEleve.getEleve)

router.put('', ctrlEleve.addEleve)

module.exports=router