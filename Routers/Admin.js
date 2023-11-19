/* Import des modules */
const express = require('express');
const ctrlAdmin = require('../Controllers/Admin');

/* Récupère le router d'express */
let router = express.Router()



/** Routage de modules */
router.get('/:id', ctrlAdmin.getModuleDetails);

module.exports = router;
