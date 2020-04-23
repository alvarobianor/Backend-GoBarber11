import { Router } from 'express';
// import { getRepository } from 'typeorm';
import Service from '../../services/CreateUserService';

// initial of a route

const usersRouter = Router();

// ROUTES

usersRouter.post('/', async (req, res) => {
	try {
		const { name, password, email } = req.body;
		const service = new Service();
		const user = await service.execute({ name, email, password });

		return res.json(user);
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
});

export default usersRouter;
