import express from 'express';

import { getInitiativeYears, postInitiativeYear} from './controllers/initiativeYearController';

const router = express.Router();

// users Routes
const root = "/initiativeYear";

/* GET */
router.get(root, getInitiativeYears);

/* POST */
router.post(root, postInitiativeYear);

/* UPDATE */


/* DELETE */


export default router;