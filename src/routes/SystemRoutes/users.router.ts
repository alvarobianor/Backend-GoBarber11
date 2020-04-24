import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../../services/CreateUserService';
import Auth from '../../middlewares/ensureAuthenticated';
import uploadConfig from '../../config/upload';
import UpdateUserAvatarService from '../../services/UpdateUserAvatar';

// initial of a route

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig);

// ROUTES

usersRouter.post('/', async (req, res) => {
	try {
		const { name, password, email } = req.body;
		const service = new CreateUserService();
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
		try {
			const serviceUpdateUserAvatar = new UpdateUserAvatarService();
			const newUser = await serviceUpdateUserAvatar.execute({
				user_id: req.user.id,
				avatarFileName: req.file.filename,
			}); // Se der erro é só atualizar o token do usuario no insomnia
			delete newUser.password;
			return res.json(newUser);
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	},
);

export default usersRouter;
