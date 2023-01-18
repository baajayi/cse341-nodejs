module.exports = (mongoose) => {
    const PlantImage = mongoose.model(
      'plantimage',
      mongoose.Schema(
        {
          commonName: {
            type: String,
            required: true,
          },
       base64Image: String
        },
        { timestamps: true }
      )
    );
  
    return PlantImage;
  };
