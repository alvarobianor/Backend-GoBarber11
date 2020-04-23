import { Router } from 'express';
// import { getRepository } from 'typeorm';
import Service from '../../services/CreateUserService';
import Auth from '../../middlewares/ensureAuthenticated';

// initial of a route

const usersRouter = Router();
usersRouter.use(Auth);
// ROUTES

usersRouter.post('/', async (req, res) => {
	try {
		const { name, password, email } = req.body;
		const service = new Service();
		const user = await service.execute({ name, email, password });

		delete user.password;

		return res.json(user);
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
});

export default usersRouter;
