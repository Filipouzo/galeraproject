/* Import des modules */
const DB = require('../db.config')
const Formation = DB.Formation

/* Récupération de toutes les formations */
exports.getAllFormations = (req, res) => {
    Formation.findAll()
        .then(formations => res.json({data: formations}))
        //! Attention message d'erreur à supprimer en prod
        .catch(e => res.status(500).json({message: 'BDD Error', error:e}))
}


/* Récupération d'une formation */
exports.getFormation = async (req, res) => {
    let formationId = parseInt(req.params.id)

    /* l'id est-il présent ? */
    if (!formationId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        /* Récupération de formation avec l'id */
        let formation = await Formation.findOne({ where: { id: formationId }})

        /* La formation existe ? */
        if (formation === null) {
            return res.status(404).json({ message: "Cette formation n'existe pas !" })
        }

        /* Renvoie les donnnées de la formation */
        return res.json({ data: formation })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}



/* ajout d'une formation */
exports.addFormation = async (req, res) => {
    const { nom, debut, fin } = req.body

    /* Validation des données reçues */
    if (!nom || !debut || !fin) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        /* La formation existe ? */
        let formation = await Formation.findOne({ where: { nom: nom }, raw: true })
        if (formation !== null) {
            return res.status(409).json({ message: `La formation ${nom} existe déjà !` })
        }

        /* Enregistrement de la formation */
        formation = await Formation.create(req.body)
        return res.json({ message: `La formation ${nom} a bien été ajotée ! `, data: formation })
    }catch(err){
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}