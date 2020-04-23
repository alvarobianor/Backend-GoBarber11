import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';

interface RequetDTO {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	public async execute({ name, email, password }: RequetDTO): Promise<User> {
		const userRepository = getRepository(User);
		const checkUserExists = await userRepository.findOne({ where: { email } });

		if (checkUserExists) {
			throw Error('Email alredy exists/used');
		}

		const passwordHash = await hash(password, 9);
		const user = userRepository.create({ name, email, password: passwordHash });
		await userRepository.save(user);
		return user;
	}
}

export default CreateUserService;
