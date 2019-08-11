module.exports = function(sequelize, DataTypes) {
    var forumAnswer = sequelize.define("forumAnswer", {
      
 
        answer: DataTypes.TEXT,
        student_id:DataTypes.INTEGER,
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
    });
    forumAnswer.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        forumAnswer.belongsTo(models.forumQuestion, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return forumAnswer;
  };
  