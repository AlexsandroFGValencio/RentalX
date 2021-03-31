import { AppError } from "../../../../errors/AppErrors";
import { ICreateUsersDTO } from "../../dto/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
      driver_license: "SP 12345",
      email: "alexsandrovalencio@gmail.com",
      name: "Alexsandro Valencio",
      password: "12345",
    };

    await createUserUseCase.execute(user);

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticatedUser).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent user", async () => {
    expect(async () => {
      const user = {
        email: "alexsandrovalencio@gmai.com",
        password: "12345",
      };

      await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate an user with the wrong password", async () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        driver_license: "SP 12345",
        email: "alexsandrovalencio@gmail.com",
        name: "Alexsandro Valencio",
        password: "12345",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
