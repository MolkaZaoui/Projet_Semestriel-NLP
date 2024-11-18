const db = require('../../database/db.config');
const Stagiaire = db.stagiaire;

exports.create = (req, res) => {
    const { Nom, Prénom,Adresse_mail,N_de_Tel,   Ecole, Specialite,Motivation,Cv} = req.body;
    if (!Nom|| !Prénom || !Adresse_mail|| !N_de_Tel || !Ecole || !Specialite ||!Motivation|| !Cv ) {
        return res.status(400).send({ message: 'Content cannot be empty' });
    }

    const newStagiaire = new Stagiaire({
        Nom,
        Prénom,
        Adresse_mail,
        N_de_Tel,
        Ecole,
        Specialite,
        Motivation,
        Cv

    });

    newStagiaire.save()
        .then(() => res.status(200).send({ message: 'Successfully created intern' }))
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'Error while creating the intern' });
        });
};

exports.findAll = (req, res) => {
    Condidat.find({})
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Error while retrieving interns' });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    Stagiaire.findById(id)
        .then(stagiaire=> {
            if (!stagiaire) {
                return res.status(404).send({ message: `stagiaire not found with id ${id}` });
            }
            res.send(stagiaire);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: `Error retrieving stagiaire with id ${id}` });
        });
};


exports.updateById = (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update cannot be empty' });
    }
    const { Nom, Prénom,Adresse_mail,N_de_Tel,   Ecole, Specialite,Motivation,Cv } = req.body;
    const updatedStagiaire = {
        Nom,
        Prénom,
        Adresse_mail,
        N_de_Tel,
        Ecole,
        Specialite,
        Motivation,
        Cv

    };

    Stagiaire.findByIdAndUpdate(id, updatedStagiaire, { new: true })
        .then(stagiaire=> {
            if (!stagiaire) {
                return res.status(404).send({ message: `intern not found with id ${id}` });
            }
            res.send(stagiaire);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: `Error updating stagiaire with id ${id}` });
        });
};


