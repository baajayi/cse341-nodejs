const { Binary } = require("mongodb");

module.exports = (mongoose) => {
    const PlantImage = mongoose.model(
      'temples',
      mongoose.Schema(
        {
          commonName: String,
          base64Image: String
        },
        { timestamps: true }
      )
    );
  
    return PlantImage;
  };
  