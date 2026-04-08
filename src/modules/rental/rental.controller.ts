import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/rental.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('rentals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rental' })
  create(@Body() createRentalDto: CreateRentalDto, @GetUser('companyId') companyId: number) {
    return this.rentalService.create(createRentalDto, companyId);
  }

  @Post('return/:plate')
  @ApiOperation({ summary: 'Return a vehicle using its plate' })
  returnVehicle(@Param('plate') plate: string, @GetUser('companyId') companyId: number) {
    return this.rentalService.returnVehicle(plate, companyId);
  }

  @Get()
  @ApiOperation({ summary: 'List all rentals for the company' })
  findAll(@GetUser('companyId') companyId: number) {
    return this.rentalService.findAll(companyId);
  }

  @Get('active')
  @ApiOperation({ summary: 'List active rentals' })
  findActive(@GetUser('companyId') companyId: number) {
    return this.rentalService.findActive(companyId);
  }
}
