import { uploadPDF } from './file.controller.js'; // Import the uploadPDF function
import { db } from '../../database/db.config.js';
const Condidat = db.condidat;
import multer from 'multer';

// Multer storage configuration
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Create a candidate
export const create = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ message: 'Error during file upload', error: err.message });
        }

        const { Nom, prenom, Adresse_mail, N_de_Tel, experience, Entreprise } = req.body;

        console.log(Nom, prenom, Adresse_mail, N_de_Tel, experience, Entreprise, req.file);

        if (!Nom || !prenom || !Adresse_mail || !N_de_Tel || !experience || !Entreprise || !req.file) {
            return res.status(400).send({ message: 'All fields and CV are required' });
        }

        try {
            // Upload the CV to Cloudinary (using the buffer from multer)
            const uploadedCV = await uploadPDF(req.file); // Now this will work properly
            console.log(uploadedCV); // You should see the Cloudinary URL here
            
            // Create a new candidate entry
            const newCondidat = new Condidat({
                Nom,
                Prénom: prenom,
                Adresse_mail,
                N_de_Tel,
                Expérience: experience,
                Entreprise,
                Cv: uploadedCV.secure_url // Save the Cloudinary URL
            });

            // Save the candidate in the database
            await newCondidat.save();

            res.status(201).send({ message: 'Condidat created successfully' });
        } catch (error) {
            console.error('Error while saving condidat:', error);
            res.status(500).send({ message: 'Error saving condidat' });
        }
    });
};


// Trouver tous les candidats
export const findAll = (req, res) => {
    Condidat.find({})
        .then(data => res.send(data))
        .catch(err => {
            console.error('Error retrieving candidates:', err);
            res.status(500).send({ message: 'Error while retrieving condidats' });
        });
};

// Trouver un candidat par ID
export const findById = (req, res) => {
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
export const updateById = (req, res) => {
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






// // Créer un candidat
// export const create =("/condidats",upload.single('Cv'), (req, res) => {
//    console.log(req.file);

//      const { Nom, Prénom, Adresse_mail, N_de_Tel, Expérience, Entreprise  } = req.body;

//        if (!Nom || !Prénom || !Adresse_mail || !N_de_Tel || !Expérience || !Entreprise || !req.file) {
//         if (req.file) {
//                 fs.unlink(req.file.path, () => {}); // Supprimer le fichier si les champs requis sont manquants
//            }
//             return res.status(400).send({ message: 'All fields and CV are required' });
//         }

//        const newCondidat = new Condidat({
//            Nom,
//            Prénom,
//             Adresse_mail,
//             N_de_Tel,
//             Expérience,
//             Entreprise,
//            Cv: req.file.filename // Stocker uniquement le nom du fichier
//         });

//         newCondidat.save()
//             .then(() => res.status(201).send({ message: 'Condidat created successfully' }))
//                 .catch(err => {
//                 console.error('Error while saving condidat:', err);
//                 fs.unlink(req.file.path, () => {}); // Supprimer le fichier en cas d'erreur de sauvegarde
//                 res.status(500).send({ message: 'Error saving condidat' });
//             });
//     });


