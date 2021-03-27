import { ICreateUsersDTO } from "../dto/ICreateUsersDTO";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
}

export { IUsersRepository };
