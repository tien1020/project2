

module.exports = function(sequelize, DataTypes) {
    var student = sequelize.define("student", {
      id: {type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,},
      username: DataTypes.STRING,
      firstname: DataTypes.STRING,
      password:DataTypes.STRING,
      lastname:DataTypes.STRING,
      email:{type: DataTypes.STRING,
        validate: {
          isEmail: true}},
      birth_date:DataTypes.DATE,
      major:DataTypes.STRING,
      picture:DataTypes.STRING,
      course_level:DataTypes.INTEGER,
      exam_taken:DataTypes.BOOLEAN,
      exam_score:DataTypes.INTEGER,
      role:DataTypes.STRING

      

    });
    student.prototype.validPassword = function(password) {
      return (password==this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
  
    // student.hook("beforeCreate", function(student) {
    //   student.password = bcrypt.hashSync(student.password, bcrypt.genSaltSync(10), null);
    // });
    
    return student;
  };