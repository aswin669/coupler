// src/infrastructure/di.ts
import * as RepoInterfaces from '@domain/repositories';
import * as Interfaces from '@domain/services';
import { makeConfig } from '@infrastructure/config';
import { PrismaClient } from '@prisma/client';
import { AcademicLevelService } from '@routes/v1/admin/academic-levels/service';
import { AgeGroupService } from '@routes/v1/admin/age-groups/service';
import { GenderService } from '@routes/v1/admin/genders/service';
import { MaritalStatusService } from '@routes/v1/admin/marital-statuses/service';
import { UserService } from '@routes/v1/admin/users/service';
import { AuthService } from '@routes/v1/auth/service';
// <-- ensure this file exports the class
import { AppConfig, Logger } from '@types';
import { FastifyInstance } from 'fastify';

import { connectDB } from './db';
import { makeLogger } from './logger';
import * as repositories from './repositories';

export type Dependencies = {
  academicLevelService: Interfaces.IAcademicLevelService;
  db: PrismaClient;
  logger: Logger;
  config: AppConfig;
  userService: Interfaces.IUserService;
  authService: Interfaces.IAuthService;
  genderService: Interfaces.IGenderService;
  maritalStatusService: Interfaces.IMaritalStatusService;
  ageGroupService: Interfaces.IAgeGroupService;
};

export async function makeInfrastructureDependencies(fastify: FastifyInstance): Promise<Dependencies> {
  const config = await makeConfig();
  const logger = makeLogger(config);
  const db = await connectDB(config, logger);

  // Initialize repositories
  const userRepository: RepoInterfaces.IUserRepository = new repositories.UserRepository(db);
  const genderRepository: RepoInterfaces.IGenderRepository = new repositories.GenderRepository(db);
  const maritalStatusRepository: RepoInterfaces.IMaritalStatusRepository = new repositories.MaritalStatusRepository(db);
  const ageGroupRepository: RepoInterfaces.IAgeGroupRepository = new repositories.AgeGroupRepository(db);
  const academicLevelRepository: RepoInterfaces.IAcademicLevelRepository = new repositories.AcademicLevelRepository(db);

  // Initialize services with repositories (use concrete classes)
  const userService: Interfaces.IUserService = new UserService(userRepository);
  const authService: Interfaces.IAuthService = new AuthService(fastify, userRepository);
  const genderService: Interfaces.IGenderService = new GenderService(genderRepository);
  const maritalStatusService: Interfaces.IMaritalStatusService = new MaritalStatusService(maritalStatusRepository);
  const ageGroupService: Interfaces.IAgeGroupService = new AgeGroupService(ageGroupRepository);
  const academicLevelService: Interfaces.IAcademicLevelService = new AcademicLevelService(academicLevelRepository);

  return {
    db,
    logger,
    config,
    userService,
    authService,
    genderService,
    maritalStatusService,
    ageGroupService,
    academicLevelService,
  };
}
