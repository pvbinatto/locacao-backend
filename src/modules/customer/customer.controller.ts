import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  create(@Body() createCustomerDto: CreateCustomerDto, @GetUser('companyId') companyId: number) {
    return this.customerService.create(createCustomerDto, companyId);
  }

  @Get()
  @ApiOperation({ summary: 'List all customers for the company' })
  findAll(@GetUser('companyId') companyId: number) {
    return this.customerService.findAll(companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific customer' })
  findOne(@Param('id') id: string, @GetUser('companyId') companyId: number) {
    return this.customerService.findOne(id, companyId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer details' })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @GetUser('companyId') companyId: number) {
    return this.customerService.update(id, updateCustomerDto, companyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a customer' })
  remove(@Param('id') id: string, @GetUser('companyId') companyId: number) {
    return this.customerService.remove(id, companyId);
  }
}
