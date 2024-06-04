const mongoose = require('mongoose'); // Importa a biblioteca mongoose.

const TaskSchema = new mongoose.Schema({
  title: {
    type: String, // Define o tipo do campo como String.
    required: true, // Indica que este campo é obrigatório.
    minlength: 1, // Define o tamanho mínimo da string.
    trim: true // Remove espaços em branco no início e no fim da string.
  },
  completed: {
    type: Boolean, // Define o tipo do campo como Booleano.
    default: false // Define um valor padrão para o campo (caso não seja especificado).
  },
  _listId: {
    type: mongoose.Types.ObjectId, // Define o tipo do campo como ObjectId do mongoose.
    required: true // Indica que este campo é obrigatório.
  }
});

const Task = mongoose.model('Task', TaskSchema); // Cria um modelo 'Task' baseado no esquema TaskSchema.

module.exports = Task; // Exporta o modelo Task para ser utilizado em outros arquivos.
