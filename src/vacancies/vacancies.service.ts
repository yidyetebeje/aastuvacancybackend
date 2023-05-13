import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { ApplyVacancyDto } from './dto/apply-vacancy.dto';
@Injectable()
export class VacanciesService {
  getApplicationsByUser(user: User) {
    try {
      return this.prisma.application.findMany({
        where: {
          userId: user.id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  getApplication(id: string, applicationId: string, arg2: User) {
    try {
      return this.prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getApplications(id: string, user: User) {
    try {
      const applications = await this.prisma.application.findMany({
        where: {
          vacancyId: id,
        },
        include: {
          user: true,
        },
      });
      return applications;
    } catch (error) {
      throw new Error(error);
    }
  }
  apply(id: string, applyVac: ApplyVacancyDto, arg2: User) {
    try {
      const app = this.prisma.application.create({
        data: {
          academicRank: applyVac.academicRank,
          workExperience: applyVac.workExperience,
          teachingExperience: applyVac.teachingExperience,
          researchExperience:
            applyVac.researchExperience == '1' ? 'PROJECT' : 'PUBLICATION',
          KPI: applyVac.KPI,
          KPIDocument: applyVac.KpiDocument,
          no_project: applyVac.no_projects,
          no_publication: applyVac.no_publications,
          workExperienceDocument: applyVac.workExperienceDocument,
          teachingExperienceDocument: applyVac.teachingExperienceDocument,
          researchExperienceDocument: applyVac.researchExperienceDocument,
          strategicPlanDocument: applyVac.strategicPlanDocument,
          academicRankDocument: applyVac.academicRankDocument,
          vacancyId: id,
          userId: arg2.id,
        },
      });
      return app;
    } catch (error) {
      throw new Error(error);
    }
  }
  extend(id: string) {
    try {
      return this.prisma.vacancy.update({
        where: {
          id: id,
        },
        data: {
          extended: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  constructor(private readonly prisma: PrismaService) {}
  async create(createVacancyDto: CreateVacancyDto) {
    try {
      const position = await this.prisma.position.findUnique({
        where: {
          id: createVacancyDto.positionId,
        },
      });
      if (position == null) {
        throw new Error('Position not found');
      }
      const vacancy = this.prisma.vacancy.create({
        data: {
          ...createVacancyDto,
          extended: false,
        },
      });
      return vacancy;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page: number, limit: number, active: boolean, user: User) {
    try {
      let vacancies;
      if (active == false) {
        vacancies = await this.prisma.vacancy.findMany({
          skip: (page - 1) * limit,
          take: limit,
          include: {
            position: true,
          },
        });
      } else {
        vacancies = await this.prisma.vacancy.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            OR: [
              {
                AND: [
                  {
                    extended: {
                      equals: true,
                    },
                  },
                  {
                    createdAt: {
                      gte: new Date(
                        new Date().getTime() - 15 * 24 * 60 * 60 * 1000,
                      ),
                    },
                  },
                ],
              },
              {
                AND: [
                  {
                    extended: {
                      equals: false,
                    },
                  },
                  {
                    createdAt: {
                      gte: new Date(
                        new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
                      ),
                    },
                  },
                ],
              },
            ],
          },
          include: {
            position: true,
          },
        });
        return vacancies;
      }
      if (user.role == 'APPLICANT') {
        const applications = await this.prisma.application.findMany({
          where: {
            userId: user.id,
          },
        });
        // map applied false or true
        const filteredVacancies = vacancies.map((vacancy) => {
          const application = applications.find(
            (application) => application.vacancyId === vacancy.id,
          );
          if (application) {
            return {
              ...vacancy,
              applied: true,
            };
          }
          return {
            ...vacancy,
            applied: false,
          };
        });
        return filteredVacancies;
      }
      return vacancies;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const vacancy = await this.prisma.vacancy.findUnique({
        where: {
          id: id,
        },
      });
      return vacancy;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateVacancyDto: UpdateVacancyDto) {
    return `This action updates a #${id} vacancy`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacancy`;
  }
}
