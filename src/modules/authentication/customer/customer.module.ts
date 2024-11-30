import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]), // Registering the Customer model
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService], // Export CustomerService if needed in other modules
})
export class CustomerModule {}
