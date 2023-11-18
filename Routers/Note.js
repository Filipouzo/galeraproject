/* Import des modules */
const express = require('express')
const ctrlNote= require('../Controllers/Note')

/* Récupère le router d'express */
let router = express.Router()



/** Routage de modules */
router.get('', ctrlNote.getAllNotes)

router.get('/:id', ctrlNote.getNote)

router.put('', ctrlNote.addNote)

router.delete('/:id', ctrlNote.deleteNote)

module.exports=router