import { uploadPDF } from './file.controller.js';
import { db } from '../../database/db.config.js';
const Stagiaire = db.stagiaire;
import multer from 'multer';


// Multer storage configuration
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });


export const Create=async (req, res)=> {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ message: 'Error during file upload', error: err.message });
        }

    
    const { Nom, prenom,Adresse_mail,N_de_Tel,ecole, Specialite,Motivation} = req.body;
    console.log(Nom, prenom, Adresse_mail, N_de_Tel, ecole, Specialite,Motivation, req.file);

    if (!Nom|| !prenom || !Adresse_mail|| !N_de_Tel || !ecole || !Specialite ||!Motivation|| !req.file ) {
        return res.status(400).send({ message: 'Content cannot be empty' });
    }

    try {
        // Upload the CV to Cloudinary (using the buffer from multer)
        const uploadedCV = await uploadPDF(req.file); // Now this will work properly
        console.log(uploadedCV); // You should see the Cloudinary URL here
        
        // Create a new candidate entry

    const newStagiaire = new Stagiaire({
        Nom,
        Prénom: prenom,
        Adresse_mail,
        N_de_Tel,
        Ecole: ecole,
        Specialite,
        Motivation,
        Cv: uploadedCV.secure_url

    });

     // Save the candidate in the database
     await newStagiaire.save();

     res.status(201).send({ message: 'Stagiaire created successfully' });
 } catch (error) {
     console.error('Error while saving stagiaire:', error);
     res.status(500).send({ message: 'Error saving stagiaire' });
 }
});
};

export const FindAll = (req, res) => {
    Stagiaire.find({})
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Error while retrieving interns' });
        });
};

export const FindById = (req, res) => {
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


export const UpdateById = (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update cannot be empty' });
    }
    const { Nom, Prenom,Adresse_mail,N_de_Tel,   Ecole, Specialite,Motivation,Cv } = req.body;
    const updatedStagiaire = {
        Nom,
        Prenom,
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


