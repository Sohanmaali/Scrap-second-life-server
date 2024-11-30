import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Borrowing } from './entities/borrowing.schema';

import { CmsHelper } from '../helper/cmsHelper';
import { CustomPagination } from 'src/cms/helper/piplineHalper';
import { File } from './entities/file.schema';
// import { PaginationHelper } from 'src/cms/helper/piplineHalper';
// import Pipli

@Injectable()
export class FileService {
  constructor(@InjectModel('File') private readonly file: Model<File>) {}

  async create(req) {
    return await CmsHelper.create(req, this.file);
  }

  async get(req) {
    console.log('service');
    const query: any = { delete_at: null };
    const pipeline = [
      {
        $match: query,
      },
      {
        $sort: { created_at: -1 },
      },
    ];

    return ''; // await CustomPagination(req,pipeline, this.borrowing);
  }

  async update(req) {
    return;
  }
}
