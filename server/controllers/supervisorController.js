const pool = require('../db');

const supervisorController = {
    getSupervisor: async (req, res) => {
        try {
            const allSupervisor = await pool.query('SELECT * FROM supervisor');
            res.status(200).json({
                success: true,
                msg: 'Get Supervisor Successfull',
                supervisor: allSupervisor.rows,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, msg: 'Internal server error' });
        }
    },
    createSupervisor: async (req, res) => {
        try {
            const { supervisor_name } = req.body;

            const newSupervisor = await pool.query(
                'INSERT INTO supervisor (supervisor_name) VALUES($1) RETURNING *',
                [supervisor_name]
            );
            res.status(200).json({
                success: true,
                msg: 'Created Success',
                supervisor: newSupervisor.rows,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, msg: 'Internal server error' });
        }
    },
    updateSupervisor: async (req, res) => {
        try {
            const { id } = req.params;
            const { supervisor_name } = req.body;
            const updateSupervisor = await pool.query(
                'UPDATE supervisor SET supervisor_name = $1 WHERE supervisor_id = $2',
                [supervisor_name, id]
            );
            res.status(200).json({
                success: true,
                msg: 'Updated Success',
                supervisor: updateSupervisor.rows,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, msg: 'Internal server error' });
        }
    },
    deleteSupervisor: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteSupervisor = await pool.query(
                'DELETE FROM supervisor WHERE supervisor_id = $1',
                [id]
            );
            res.status(200).json({
                success: true,
                msg: 'Deleted Success',
                supervisor: deleteSupervisor.rows,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, msg: 'Internal server error' });
        }
    },
};

module.exports = supervisorController;
