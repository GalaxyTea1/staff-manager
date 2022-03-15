const pool = require('../db');

const departmentController = {
    getDepartment: async (req, res) => {
        try {
            const allDepartments = await pool.query('SELECT * FROM department');
            res.status(200).json({
                success: true,
                msg: 'Get Department Successfull',
                department: allDepartments.rows,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, msg: 'Internal server error' });
        }
    },
    createDepartment: async (req, res) => {
        try {
            const { department_name } = req.body;

            const newDepartment = await pool.query(
                'INSERT INTO department (department_name) VALUES($1) RETURNING *',
                [department_name]
            );
            res.status(200).json({
                success: true,
                msg: 'Created Success',
                department: newDepartment.rows,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, msg: 'Internal server error' });
        }
    },
    updateDepartment: async (req, res) => {
        try {
            const { id } = req.params;
            const { department_name } = req.body;
            const updateDepartment = await pool.query(
                'UPDATE department SET department_name = $1 WHERE department_id = $2',
                [department_name, id]
            );
            res.status(200).json({
                success: true,
                msg: 'Updated Success',
                department: updateDepartment.rows,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, msg: 'Internal server error' });
        }
    },
    deleteDepartment: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteDepartment = await pool.query(
                'DELETE FROM department WHERE department_id = $1',
                [id]
            );
            res.status(200).json({
                success: true,
                msg: 'Deleted Success',
                department: deleteDepartment.rows,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, msg: 'Internal server error' });
        }
    },
};

module.exports = departmentController;
