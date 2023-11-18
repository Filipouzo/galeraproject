/* Import des modules */
const express = require('express')
const ctrlModule= require('../Controllers/Module')

/* Récupère le router d'express */
let router = express.Router()



/** Routage de modules */
router.get('', ctrlModule.getAllModules)

router.get('/:id', ctrlModule.getModule)

router.put('', ctrlModule.addModule)

router.delete('/:id', ctrlModule.deleteModule)

module.exports=router