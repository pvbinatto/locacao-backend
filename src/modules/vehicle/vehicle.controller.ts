import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('vehicles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new vehicle' })
  create(@Body() createVehicleDto: CreateVehicleDto, @GetUser('companyId') companyId: number) {
    return this.vehicleService.create(createVehicleDto, companyId);
  }

  @Get()
  @ApiOperation({ summary: 'List all vehicles for the company' })
  findAll(@GetUser('companyId') companyId: number) {
    return this.vehicleService.findAll(companyId);
  }

  @Get('maintenance/count')
  @ApiOperation({ summary: 'Get total vehicles in maintenance' })
  countInMaintenance(@GetUser('companyId') companyId: number) {
    return this.vehicleService.countInMaintenance(companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific vehicle by ID' })
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: number) {
    return this.vehicleService.findOne(id, companyId);
  }

  @Get('plate/:plate')
  @ApiOperation({ summary: 'Search vehicle by plate' })
  findByPlate(@Param('plate') plate: string, @GetUser('companyId') companyId: number) {
    return this.vehicleService.findByPlate(plate, companyId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update vehicle information' })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto, @GetUser('companyId') companyId: number) {
    return this.vehicleService.update(id, updateVehicleDto, companyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a vehicle' })
  remove(@Param('id') id: string, @GetUser('companyId') companyId: number) {
    return this.vehicleService.remove(id, companyId);
  }
}
