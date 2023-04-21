/* Pour info, ce point de départ est une adaptation de celui qui vous obtiendriez
en faisant npm create backend
issu du dépôt
<https://github.com/ChoqueCastroLD/create-backend/tree/master/src/template/js>
*/

// Load Enviroment Variables to process.env (if not present take variables defined in .env file)
require('dotenv').config();
const { PORT } = process.env;

// Instantiate an Express Application
const app = require('./adapters/driving/app.js');
// Open Server on selected Port
app.listen(PORT, () => console.info('Server listening on port ', PORT));
