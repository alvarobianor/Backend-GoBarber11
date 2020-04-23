import { getRepository } from 'typeorm';

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
		const user = userRepository.create({ name, email, password });
		await userRepository.save(user);
		return user;
	}
}

export default CreateUserService;
