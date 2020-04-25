import { Router } from 'express';
import Service from '../../services/AuthenticationService';
// initial of a route

const usersRouter = Router();

// ROUTES

usersRouter.post('/', async (req, res) => {
	const { email, password } = req.body;
	const service = new Service();
	const { user, token } = await service.execute({ email, password });
	delete user.password;
	return res.json({ user, token });
});

export default usersRouter;
