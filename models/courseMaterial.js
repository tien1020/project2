module.exports = function(sequelize, DataTypes) {
    var courseMaterial = sequelize.define("courseMaterial", {
        id: {type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,},
        
        title:DataTypes.STRING,
        chapter_title:DataTypes.TEXT,
        chapter_number:DataTypes.INTEGER,
        week_number:DataTypes.INTEGER,
        order_in_chapter:DataTypes.INTEGER,
        material:DataTypes.TEXT,
        image_url:DataTypes.STRING,

    });
    return courseMaterial;
  };