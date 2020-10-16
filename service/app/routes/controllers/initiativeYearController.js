
import dbQuery from '../../db/dbQuery';
import {
    errorMessage, successMessage, status,
} from '../../helpers/status';

/**
 * @params {Object} req
 * @params {Object} res
 * @returns return firstname and Lastname
 */

const getInitiativeYears = async (req, res) => {
    const searchQuery = 'SELECT * from initiative_year';
    try {
        const { rows } = await dbQuery.query(searchQuery, []);
        const dbResponse = rows;
        return res.status(status.success).send(dbResponse);
    }
    catch (error) {
        return res.status(status.error).send(errorMessage);
    }
};

const postInitiativeYear = async (req, res) => {
    //Body Params
    console.log(req.body)
    const {
        formData,
    } = req.body;

    let year = formData.year;
    year = year && year + '-01-01';

    // validations
    // if(somethingBad())
    // {
    //     //   errorMessage.error = 'Password must be more than five(5) characters';
    //     //   return res.status(status.bad).send(errorMessage);
    // }

    //Query
    const values = [
        year,
        formData.rollOut,
        formData.completion,
    ];

    const createUserQuery = `INSERT INTO 
        initiative_year(initiative_year, initiative_roll_out, initiative_completion)
        VALUES($1, $2, $3)
        returning *`;

    //Execute Query
    try {
        const { rows } = await dbQuery.query(createUserQuery, values);
        const dbResponse = rows[0];
        successMessage.data = successMessage.status;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        console.log(error)
        if (error.code === '23505') {
            errorMessage.message = 'Initiative Year already exists';
            return res.status(status.conflict).send(errorMessage);
        } else {
            errorMessage.message = 'Operation was not successful';
            return res.status(status.error).send(errorMessage);
        }
    }
};

export {
    getInitiativeYears,
    postInitiativeYear,
};