module.exports = function(sequelize, DataTypes) {
    var forumQuestion = sequelize.define("forumQuestion", {
    
        question: DataTypes.TEXT,
        title:DataTypes.STRING,
    });
    
    forumQuestion.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        forumQuestion.hasMany(models.forumAnswer, {
          onDelete: "cascade"
        });
      };
    return forumQuestion;
  };
  