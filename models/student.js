module.exports = function(sequelize, DataTypes) {
    var student = sequelize.define("student", {
      id: {type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,},
      username: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname:DataTypes.STRING,
      password:DataTypes.STRING,
      email:DataTypes.STRING,
      birth_date:DataTypes.DATE,
      major:DataTypes.STRING,
      picture:DataTypes.STRING,
      course_level:DataTypes.INTEGER,
      exam_taken:DataTypes.BOOLEAN,
      exam_score:DataTypes.INTEGER,

      

    });
    return student;
  };