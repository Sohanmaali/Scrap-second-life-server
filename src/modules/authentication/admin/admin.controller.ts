import { Controller, Get, Patch, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {
    console.log('admin controller loaded');
  }

  @Get()
  async getAll(@Req() req, @Res() res) {
    try {
      const query: any = { delete_at: null };
      const data = await this.adminService.getAll(req, query);

      return res.status(201).json({
        status: 'success',
        data: data,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        status: 'error',
        data: error.message,
      });
    }
  }

  @Get('show/:id')
  async findOne(@Req() req, @Res() res) {
    try {
      const id = req.params.id;
      const data = await this.adminService.findOne(req);

      return res.status(201).json({
        status: 'success',
        data: data,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        status: 'error',
        data: error.message,
      });
    }
  }

  @Patch('update/:id')
  async update(@Req() req, @Res() res) {
    try {
      const id = req.params.id;
      const data = await this.adminService.update(req);

      return res.status(201).json({
        status: 'success',
        data: data,
      });
    } catch (error) {
      console.log('error  ', error);
      return res.status(500).json({
        status: 'error',
        data: error.message,
      });
    }
  }
}
