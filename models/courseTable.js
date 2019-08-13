module.exports = function(sequelize, DataTypes) {
    var courseTable = sequelize.define("courseTable", {
        cid: {type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,},
        tid:DataTypes.INTEGER,
        course_title: DataTypes.TEXT,
        course_description:DataTypes.TEXT,
        course_image:DataTypes.TEXT
    });
    return courseTable;
  };
  