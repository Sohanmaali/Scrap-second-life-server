import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as hbs from 'hbs';
import * as fs from 'fs';
import * as path from 'path';
import { Buffer } from 'buffer';
// import { first } from 'rxjs';

export class CmsHelper {
  constructor() {}

  static async findOne(req, model) {
    return model.findById({ _id: req.params.id });
  }

  static async findByType(type, req, model) {
    return model.findOne({ [type]: req.body[type] });
  }

  // Create a new entry
  static async create(req, model) {
    try {
      const data = req.body;
      console.log('data', data);

      return await model.create(data);
    } catch (error) {
      console.error('Error creating new entry:', error);
      throw new Error('Error creating new entry');
    }
  }

  // Update an entry
  static async update(req, model) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
      }
      const updatedEntry = await model.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!updatedEntry) {
        throw new Error('Entry not found');
      }
      console.log('Entry updated:', updatedEntry);
      return updatedEntry;
    } catch (error) {
      console.error('Error updating entry:', error);
      throw new Error('Error updating entry');
    }
  }

  static async search(req, model) {
    try {
      // Extract search term from query parameters
      const { search } = req.query;
      let query: any = { delete_at: null };

      // If a search term is provided, modify the query to include an $or condition
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { first_name: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }

      // Execute the query to find matching documents
      const data = await model.find(query);
      return data;
    } catch (error) {
      console.error('Error searching entry:', error);
      throw new Error('Error searching entry');
    }
  }

  // Get an entry
  static async getAll(req, model) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
      }
      const entry = await model.findById(id);
      if (!entry) {
        throw new Error('Entry not found');
      }
      console.log('Entry retrieved:', entry);
      return entry;
    } catch (error) {
      console.error('Error retrieving entry:', error);
      throw new Error('Error retrieving entry');
    }
  }

  //MultiTrash
  static async multiTrash(req, model) {
    const ids = req.body.ids;
    const query = { delete_at: new Date() };
    const data = await model.updateMany({ _id: { $in: ids } }, { $set: query });
    return data;
  }

  //MultiRestore
  static async multiRestore(req, model) {
    const ids = req.body.ids;
    const query = { delete_at: null };
    console.log(ids);

    const data = await model.updateMany({ _id: { $in: ids } }, { $set: query });
    return data;
  }

  //MultiDelete
  static async multiDelete(req, model) {
    const ids = req.body.ids;
    const data = await model.deleteMany({ _id: { $in: ids } });
    return data;
  }

  static async generatePDF(printData: any): Promise<Buffer> {
    const data = JSON.parse(JSON.stringify(printData));
    const templatePath = path.join(
      __dirname,
      '..',
      '../template',
      'customerBill.hbs',
    );

    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = hbs.compile(template);

    const html = compiledTemplate(data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
