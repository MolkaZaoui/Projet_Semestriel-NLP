const db = require('../../database/db.config');
const Stagiaire = db.stagiaire;
const multer = require('multer'); 
const path = require('path')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où les fichiers sont stockés
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalnamegit;
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique pour chaque fichier
    }
});

const upload = multer({ storage: storage,
    limits: {
        fileSize: 10* 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        // Vérifiez que le fichier est bien un PDF
        if (!file.originalname.match(/\.(pdf)$/)) {
            return cb(new Error('Only PDF files are allowed!'), false);
        }
        cb(null, true);
    }
});
console.log(upload);

exports.upload = upload;

exports.create = [
    upload.single('Cv'),
    (req, res) => {
    const { Nom, Prénom,Adresse_mail,N_de_Tel,   Ecole, Specialite,Motivation} = req.body;
    if (!Nom|| !Prénom || !Adresse_mail|| !N_de_Tel || !Ecole || !Specialite ||!Motivation|| !req.file ) {
        return res.status(400).send({ message: 'Content cannot be empty' });
    }

    const Cv = req.file.path;

    const newStagiaire = new Stagiaire({
        Nom: Nom,
        Prénom: Prénom,
        Adresse_mail: Adresse_mail,
        N_de_Tel: N_de_Tel,
        Ecole: Ecole,
        Specialite: Specialite,
        Motivation: Motivation,
        Cv: Cv

    });

    newStagiaire.save()
        .then(() => res.status(200).send({ message: 'Successfully created intern' }))
        .catch(err => {
            console.log(err);
            console.error(err);
            res.status(500).send({ message: 'Error while creating the intern' });
        });
}
];

exports.findAll = (req, res) => {
    Stagiaire.find({})
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


