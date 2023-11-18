/* Import des modules */
const DB = require('../db.config')
const Module = DB.Module

/* Récupération de tout les modules */
exports.getAllModules = (req, res) => {
    Module.findAll()
        .then(modules => res.json({ data: modules }))
        //! Attention message d'erreur à supprimer en prod
        .catch(e => res.status(500).json({ message: 'BDD Error', error: e }))
}


/* Récupération d'un module */
exports.getModule = async (req, res) => {
    let moduleId = parseInt(req.params.id)

    /* l'id est-il présent ? */
    if (!moduleId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        /* Récupération du module avec l'id */
        let module = await Module.findOne({ where: { id: moduleId } })

        /* Le module existe ? */
        if (module === null) {
            return res.status(404).json({ message: "Ce module n'existe pas !" })
        }

        /* Renvoie les donnnées du module  */
        return res.json({ data: module })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}



/* ajout d'un module */
exports.addModule = async (req, res) => {
    const { name, id_formation, id_formateur } = req.body

    /* Validation des données reçues */
    if (!name || !id_formation || !id_formateur) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        /* Le module existe ? */
        let module = await Module.findOne({ where: { name: name }, raw: true })
        if (module !== null) {
            return res.status(409).json({ message: `Le module ${name} existe déjà !` })
        }

        /* Enregistrement du module*/
        module = await Module.create(req.body)
        return res.json({ message: `Le module ${name} a bien été ajoutée ! `, data: module })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}

/* Suppression d'un module */
exports.deleteModule = async (req, res) => {
    let moduleId = parseInt(req.params.id)

    /* l'id est-il présent ? */
    if (!moduleId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        /* Récupération du module avec l'id */
        let module = await Module.findOne({ where: { id: moduleId } })

        /* Le module existe ? */
        if (module === null) {
            return res.status(404).json({ message: "Ce module n'existe pas !" })
        }


        /* suppression du module */
        module = await Module.destroy({
            where: {
              id: moduleId,
            },
          });
        return res.json({ message: `Le module a bien été supprimée ! `, data: module })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}