
module.exports = (mongoose) => {
    const Plant = mongoose.model(
      'plant',
      mongoose.Schema(
        {
          commonName: String,
          localName: String,
          family: String,
          genus: String,
          isMedicinal: Boolean,
          flowerColor: String,
          isEdible: Boolean,
          scientificName: String
        },
        { timestamps: true }
      )
    );
  
    return Plant;
  };
  