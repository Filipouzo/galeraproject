/* Import des modules */
const DB = require('../db.config')
const Module = DB.Module
const Formateur = DB.Formateur
const Formation = DB.Formation
const Eleve = DB.Eleve
const Note = DB.Note

/* Récupération des détails d'un module*/
exports.getModuleDetails = async (req, res) => {
    let moduleId = parseInt(req.params.id)
    

    /* l'id est-il présent ? */
    if (!moduleId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }




      try {
        /* Récupération du module avec l'id */
        let moduleDetails = await Module.findOne({ where: { id: moduleId },
            attributes: ['name'],
        
        include: [

            {
              model: Formateur,
              attributes: ['firstname', 'lastname'],
            },            
            {
                model: Formation,
                attributes: ['id', 'name'],
            include: [
                {
                model: Eleve,
                attributes: ['firstname', 'lastname'],
                include: [
                    {
                    model: Note,
                    attributes: ['value', 'comment'],
                    },
                ],
                }, 
            ]
        },

          ],

        })


        /* Le module existe ? */
        if (moduleDetails === null) {
            return res.status(404).json({ message: "Ce module n'existe pas !" })
        }



        /* Renvoie les donnnées du module  */
        return res.json({ NotesDuModule : moduleDetails })



    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des détails du module' });
    }
  };