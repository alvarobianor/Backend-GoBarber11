import { Router } from 'express';
import multer from 'multer';
import Service from '../../services/CreateUserService';
import Auth from '../../middlewares/ensureAuthenticated';
import uploadConfig from '../../config/upload';

// initial of a route

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig);

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

usersRouter.patch(
	'/avatar',
	Auth,
	uploadAvatar.single('avatar'),
	async (req, res) => {
		res.json({ ok: true });
	},
);

export default usersRouter;
