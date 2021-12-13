import { CreateProjectDTO, Project, UpdateProjectDTO } from "../models/types";
import { Repository } from "../repositories/base.repository";
import { ColorService } from "./color.service";

export class ProjectService {
  private colorService = new ColorService();

  constructor(private repo: Repository<Project>) {}

  async findById(id: string): Promise<Project> {
    const project = this.repo.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  async findByPath(path: string): Promise<Project> {
    const project = this.repo.find({ path })?.[0];
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  async applyConfig(project: Project): Promise<void> {
    this.repo.update(project.id, { ...project, color: project.color });
  }

  async findAll(): Promise<Project[]> {
    return this.repo.findAll();
  }

  async create(project: CreateProjectDTO): Promise<Project> {
    const newProject = {
      path: project.path,
      color: project.color || this.colorService.getRandomColor(),
      //TODO: probably better handled with path module
      name: project.name || project.path.split("/").pop(),
    };
    return this.repo.create(newProject);
  }

  async update(updateData: UpdateProjectDTO): Promise<Project> {
    const project = await this.findById(updateData.id);
    const updatedProject = await this.repo.update(updateData.id, { ...project, ...updateData });
    return updatedProject;
  }

  async delete(project: Project): Promise<void> {
    this.repo.delete(project.id);
  }
}
