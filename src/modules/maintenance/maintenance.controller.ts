import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from './dto/maintenance.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('maintenances')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('maintenances')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new maintenance record' })
  @ApiResponse({ status: 201, description: 'Maintenance record created successfully.' })
  create(
    @Body() dto: CreateMaintenanceDto,
    @GetUser('companyId') companyId: number,
    @GetUser('userId') userId: string,
  ) {
    return this.maintenanceService.create(dto, companyId, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List all maintenance records' })
  findAll(@GetUser('companyId') companyId: number) {
    return this.maintenanceService.findAll(companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific maintenance record' })
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: number) {
    return this.maintenanceService.findOne(id, companyId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a maintenance record' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMaintenanceDto,
    @GetUser('companyId') companyId: number,
  ) {
    return this.maintenanceService.update(id, dto, companyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a maintenance record' })
  remove(@Param('id') id: string, @GetUser('companyId') companyId: number) {
    return this.maintenanceService.remove(id, companyId);
  }
}
