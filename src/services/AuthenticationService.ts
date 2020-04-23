import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import User from '../models/User';

interface RequestDTO {
	email: string;
	password: string;
}

export default class AuthenticationService {
	public async execute({
		email,
		password,
	}: RequestDTO): Promise<{ user: User }> {
		const userRepository = getRepository(User);

		const userEmailValidated = await userRepository.findOne({
			where: { email },
		});

		if (!userEmailValidated) {
			throw Error('Wrong email/password combination');
		}

		const passwordMatch = await compare(password, userEmailValidated.password);

		if (!passwordMatch) {
			throw Error('Wrong email/password combination');
		}

		return { user: userEmailValidated };
	}
}
