const mongoose = require('mongoose');

const CondidatSchema = new mongoose.Schema({
            
            Nom: { type: String, required: true },
            Prénom: { type: String, required: true },
            Adresse_mail: { type: String, required: true },
            N_de_Tel: { type: Number, required: true },
            Expérience: { type: String, required: true },
            Entreprise: { type: String, required: true },
            Cv: { type: String, required: true }


            
            
}, {
    timestamps: true
});
CondidatSchema.method('toJSON',function(){
    const{__v,_id,...object}=this.toObject();
    object.id=_id;
    return object;
})

const Condidat = mongoose.model('Condidat', CondidatSchema);

module.exports = Condidat;