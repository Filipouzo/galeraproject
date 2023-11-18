/* Import des modules */
const DB = require('../db.config')
const Note = DB.Note

/* Récupération de toutes les notes*/
exports.getAllNotes = (req, res) => {
    Note.findAll()
        .then(notes => res.json({ data: notes }))
        //! Attention message d'erreur à supprimer en prod
        .catch(e => res.status(500).json({ message: 'BDD Error', error: e }))
}


/* Récupération d'une note */
exports.getNote = async (req, res) => {
    let noteId = parseInt(req.params.id)

    /* l'id est-il présent ? */
    if (!noteId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        /* Récupération d'une note avec l'id */
        let note = await Note.findOne({ where: { id: noteId } })

        /* La note existe ? */
        if (note === null) {
            return res.status(404).json({ message: "Cette note n'existe pas !" })
        }

        /* Renvoie les donnnées de la note */
        return res.json({ data: note })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}



/* ajout d'une note*/
exports.addNote = async (req, res) => {
    const { value, id_eleve, id_formateur, id_module, comment } = req.body

    /* Validation des données reçues */
    if (!value || !id_eleve || !id_formateur || !id_module) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        /* La note existe ? */
        let note = await Note.findOne({
            where: {
              id_eleve: id_eleve,
              id_formateur: id_formateur,
              id_module: id_module
            },
            raw: true
        });
        if (note !== null) {
            return res.status(409).json({ message: `Vous avez déjà noté ce formateur pour ce module !` })
        }

        /* Enregistrement de la note*/
        note = await Note.create(req.body)
        return res.json({ message: `La note a bien été ajoutée ! `, data: note })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}

/* Suppression d'une note */
exports.deleteNote = async (req, res) => {
    let noteId = parseInt(req.params.id)

    /* l'id est-il présent ? */
    if (!noteId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        /* Récupération de la note avec l'id */
        let note = await Note.findOne({ where: { id: noteId } })

        /* La note existe ? */
        if (note === null) {
            return res.status(404).json({ message: "Cette note n'existe pas !" })
        }


        /* suppression de la notee */
        note = await Note.destroy({
            where: {
                id: noteId,
            },
        });
        return res.json({ message: `La note a bien été supprimée ! `, data: note })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}