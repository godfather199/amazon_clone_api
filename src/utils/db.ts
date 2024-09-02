import {connect, set} from 'mongoose'
import { DATABASE_URL } from '../config/config';



 const connect_MongoDB = () => {
   connect(DATABASE_URL)
     .then(() => {
       console.log(`Connected to MongoDB`);
     })
     .catch((err) => {
       console.log(`Unable to connect to MongoDB: ${err}`);
     });
 };

 export default connect_MongoDB;