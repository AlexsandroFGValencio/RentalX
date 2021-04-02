// import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private cars: ICarsRepository
  ) {}
  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.cars.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new AppError("Car Already Exists!");
    }

    const car = await this.cars.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return car;
  }
}

export { CreateCarUseCase };
