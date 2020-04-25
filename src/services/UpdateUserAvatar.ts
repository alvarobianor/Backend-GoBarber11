import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfigs from '../config/upload';

import AppError from '../errors/AppError';

interface RequestDTO {
	user_id: string;
	avatarFileName: string;
}

class UpdateUserAvatarService {
	public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
		const repositoryUser = getRepository(User);
		const user = await repositoryUser.findOne({ where: { id: user_id } });
		if (!user) {
			throw new AppError('Just users loged can change avatar!', 401);
		}
		if (user.avatar) {
			const userAvatarFilePath = path.join(
				uploadConfigs.directory,
				user.avatar, // juntar os caminhos
			);
			const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);
			// verifica se já existe, se existir ele deleta o arquivo dese user
			if (userAvatarFileExist) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}
		user.avatar = avatarFileName;
		// atribui o novo caminho, pois pra salvar em disco quem faz isso é o middleware
		await repositoryUser.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
