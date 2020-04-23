import { Router } from 'express';
import Service from '../../services/AuthenticationService';
// initial of a route

const usersRouter = Router();

// ROUTES

usersRouter.post('/', async (req, res) => {
	try {
		const { email, password } = req.body;
		const service = new Service();
		const { user } = await service.execute({ email, password });
		delete user.password;
		return res.json({ user });
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
});

export default usersRouter;
