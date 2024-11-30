import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
// import { ChangePasswordDto } from '../admin/dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminService.validateAdmin(email, password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }

  async login(admin: any) {
    const payload = {
      email: admin.email,
      _id: admin._id,
      first_name: admin?.first_name,
      last_name: admin?.last_name,
      featured_image: admin?.featured_image,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePassword(admin: any, changePasswordDto: any) {
    // return this.adminService.changePassword(admin.id, changePasswordDto);
  }
}
