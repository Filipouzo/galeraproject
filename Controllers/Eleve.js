/* Import des modules */
const DB = require('../db.config')
const Eleve = DB.Eleve

/* Récupération de toutes les élèvess */
exports.getAllEleves = (req, res) => {
    Eleve.findAll()
        .then(eleves => res.json({ data: eleves }))
        //! Attention message d'erreur à supprimer en prod
        .catch(e => res.status(500).json({ message: 'BDD Error', error: e }))
}


/* Récupération d'un élève */
exports.getEleve = async (req, res) => {
    let eleveid = parseInt(req.params.id)

    /* l'id est-il présent ? */
    if (!eleveid) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        /* Récupération d'un élève avec l'id */
        let eleve = await Eleve.findOne({ where: { id: eleveid } })

        /* L'élève' existe ? */
        if (eleve === null) {
            return res.status(404).json({ message: "Cet élève n'existe pas !" })
        }

        /* Renvoie les donnnées de l'élève */
        return res.json({ data: eleve })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}



/* ajout d'un élève */
exports.addEleve = async (req, res) => {
    const { id_formation,firstname, lastname, email, password } = req.body

    /* Validation des données reçues */
    if (!lastname || !id_formation|| !firstname || !email|| !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        /* L'élève' existe ? */
        let eleve = await Eleve.findOne({ where: { email: email }, raw: true })
        if (eleve !== null) {
            return res.status(409).json({ message: `l'email : ' ${email} existe déjà !` })
        }

        /* Enregistrement de l'élève' */
        eleve = await Eleve.create(req.body)
        return res.json({ message: `L'élève ${lastname} a bien été ajouté ! `, data: eleve })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}