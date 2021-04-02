import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      brand: "Brand Car",
      category_id: "Category ID Car",
      daily_rate: 123,
      fine_amount: 60,
      license_plate: "SP 456",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with a license plate that already exists", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Description Car",
        brand: "Brand Car",
        category_id: "Category ID Car",
        daily_rate: 123,
        fine_amount: 60,
        license_plate: "SP 456",
      });

      await createCarUseCase.execute({
        name: "Car 1",
        description: "Description Car",
        brand: "Brand Car",
        category_id: "Category ID Car",
        daily_rate: 123,
        fine_amount: 60,
        license_plate: "SP 456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      description: "Description Car",
      brand: "Brand Car",
      category_id: "Category ID Car",
      daily_rate: 123,
      fine_amount: 60,
      license_plate: "SP 456",
    });

    expect(car.available).toBe(true);
  });
});
