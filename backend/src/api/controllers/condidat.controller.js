const db = require('../../database/db.config');
const Condidat = db.condidat;

exports.create = (req, res) => {
    const { Nom, Prénom,Adresse_mail,N_de_Tel,  Expérience, Entreprise,Cv} = req.body;
    if (!Nom|| !Prénom || !Adresse_mail|| !N_de_Tel || !Expérience || !Entreprise || !Cv ) {
        return res.status(400).send({ message: 'Content cannot be empty' });
    }

    const newCondidat = new Condidat({
        Nom:Nom,
        Prénom:Prénom,
        Adresse_mail:Adresse_mail,
        N_de_Tel:N_de_Tel,
        Expérience:Expérience,
        Entreprise:Entreprise,
        Cv:Cv

    });

    newCondidat.save()
        .then(() => res.status(200).send({ message: 'Successfully created Condidat' }))
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'Error while creating the condidat' });
        });
};

exports.findAll = (req, res) => {
    Condidat.find({})
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Error while retrieving condidats' });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    Condidat.findById(id)
        .then(condidat => {
            if (!condidat) {
                return res.status(404).send({ message: `condidat not found with id ${id}` });
            }
            res.send(condidat);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: `Error retrieving condidat with id ${id}` });
        });
};


exports.updateById = (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update cannot be empty' });
    }
    const { Nom, Prénom,Adresse_mail,N_de_Tel,  Expérience, Entreprise,Cv } = req.body;
    const updatedCondidat = {
        Nom,
        Prénom,
        Adresse_mail,
        N_de_Tel,
        Expérience,
        Entreprise,
        Cv
    };

    Condidat.findByIdAndUpdate(id, updatedCondidat, { new: true })
        .then(condidat=> {
            if (!condidat) {
                return res.status(404).send({ message: `condidat not found with id ${id}` });
            }
            res.send(stagiaire);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: `Error updating condidat with id ${id}` });
        });
};


