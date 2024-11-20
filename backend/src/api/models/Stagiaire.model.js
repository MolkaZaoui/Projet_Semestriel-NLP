module.exports = mongoose => {
    const Schema = mongoose.Schema;

const StagiaireSchema = new Schema({
           
            Nom: { type: String, required: true },
            Prénom: { type: String, required: true },
            Adresse_mail: { type: String, required: true },
            N_de_Tel: { type: Number, required: true },
            Ecole: { type: String, required: true },
            Specialite: { type: String, required: true },
            Motivation: { type: String, required: true },
            Cv: { type: String, required: true },
}, {
    timestamps: true
});
StagiaireSchema.method('toJSON',function(){
    const{__v,_id,...object}=this.toObject();
    object.id=_id;
    return object;
})
const Stagiaire = mongoose.model('Stagiaire', StagiaireSchema);
return Stagiaire;
}
