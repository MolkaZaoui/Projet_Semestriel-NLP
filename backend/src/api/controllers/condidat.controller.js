const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../../database/db.config');
const Condidat = db.condidat;



const upload = multer({
   dest:'./uploads',
    
});



// Créer un candidat
exports.create =("/condidats",upload.single('Cv'), (req, res) => {
   console.log(req.file);

     const { Nom, Prénom, Adresse_mail, N_de_Tel, Expérience, Entreprise  } = req.body;

       if (!Nom || !Prénom || !Adresse_mail || !N_de_Tel || !Expérience || !Entreprise || !req.file) {
        if (req.file) {
                fs.unlink(req.file.path, () => {}); // Supprimer le fichier si les champs requis sont manquants
           }
            return res.status(400).send({ message: 'All fields and CV are required' });
        }

       const newCondidat = new Condidat({
           Nom,
           Prénom,
            Adresse_mail,
            N_de_Tel,
            Expérience,
            Entreprise,
           Cv: req.file.filename // Stocker uniquement le nom du fichier
        });

        newCondidat.save()
            .then(() => res.status(201).send({ message: 'Condidat created successfully' }))
                .catch(err => {
                console.error('Error while saving condidat:', err);
                fs.unlink(req.file.path, () => {}); // Supprimer le fichier en cas d'erreur de sauvegarde
                res.status(500).send({ message: 'Error saving condidat' });
            });
    });


// Trouver tous les candidats
exports.findAll = (req, res) => {
    Condidat.find({})
        .then(data => res.send(data))
        .catch(err => {
            console.error('Error retrieving candidates:', err);
            res.status(500).send({ message: 'Error while retrieving condidats' });
        });
};

// Trouver un candidat par ID
exports.findById = (req, res) => {
    const id = req.params.id;
    Condidat.findById(id)
        .then(condidat => {
            if (!condidat) {
                return res.status(404).send({ message: `Condidat not found with id ${id}` });
            }
            res.send(condidat);
        })
        .catch(err => {
            console.error('Error retrieving condidat by ID:', err);
            res.status(500).send({ message: `Error retrieving condidat with id ${id}` });
        });
};

// Mettre à jour un candidat par ID
exports.updateById = (req, res) => {
    handleFileUpload(req, res, (err) => {
        if (err) {
            console.error('Upload Error:', err);
            return res.status(500).send({ message: 'Error during file upload', error: err.message });
        }

        const id = req.params.id;
        if (!req.body) {
            return res.status(400).send({ message: 'Data to update cannot be empty' });
        }

        const { Nom, Prénom, Adresse_mail, N_de_Tel, Expérience, Entreprise } = req.body;
        const updatedCondidat = {
            Nom,
            Prénom,
            Adresse_mail,
            N_de_Tel,
            Expérience,
            Entreprise
        };

        if (req.file) {
            updatedCondidat.Cv = req.file.filename; // Ajouter le nom du fichier si un nouveau CV est téléchargé
        }

        Condidat.findByIdAndUpdate(id, updatedCondidat, { new: true })
            .then(condidat => {
                if (!condidat) {
                    return res.status(404).send({ message: `Condidat not found with id ${id}` });
                }
                res.send(condidat);
            })
            .catch(err => {
                console.error('Error updating condidat:', err);
                res.status(500).send({ message: `Error updating condidat with id ${id}` });
            });
    });
};
