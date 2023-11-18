/* Import des modules */
const DB = require('../db.config')
const Formateur = DB.Formateur

/* Récupération de toutes les formateurs */
exports.getAllFormateurs = (req, res) => {
    Formateur.findAll()
        .then(formateurs => res.json({ data: formateurs }))
        //! Attention message d'erreur à supprimer en prod
        .catch(e => res.status(500).json({ message: 'BDD Error', error: e }))
}


/* Récupération d'un formateur */
exports.getFormateur = async (req, res) => {
    let formateurid = parseInt(req.params.id)

    /* l'id est-il présent ? */
    if (!formateurid) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        /* Récupération d'un formateur avec l'id */
        let formateur = await Formateur.findOne({ where: { id: formateurid } })

        /* Le formateur existe ? */
        if (formateur === null) {
            return res.status(404).json({ message: "Ce formateur n'existe pas !" })
        }

        /* Renvoie les donnnées du formateur */
        return res.json({ data: formateur })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}



/* ajout d'un formateur */
exports.addFormateur = async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    /* Validation des données reçues */
    if (!lastname || !firstname || !email || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        /* Le formateur existe ? */
        let formateur = await Formateur.findOne({ where: { email: email }, raw: true })
        if (formateur !== null) {
            return res.status(409).json({ message: `l'email : ' ${email} existe déjà !` })
        }

        /* Enregistrement du formateur */
        formateur = await Formateur.create(req.body)
        return res.json({ message: `Le formateur ${lastname} a bien été ajouté ! `, data: formateur })
    } catch (err) {
        //! Attention message d'erreur à supprimer en prod
        return res.status(500).json({ message: 'BDD Error', error: err })
    }
}