import { Router } from 'express';

const appointmentRouter = Router();

appointmentRouter.get('/', (req, res) => res.json({ status: 'ok' }));

appointmentRouter.post('/', (req, res) => {
	const { name, email } = req.body;
	return res.status(201).json({ status: { name, email } });
});

export default appointmentRouter;
