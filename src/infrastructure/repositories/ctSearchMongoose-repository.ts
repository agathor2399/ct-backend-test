import { ICTSearchRepository } from '@/application/ports/ctSearchRespository-port';
import { CTSearch } from '@/domain/entities/ctSearch';
import { CTSearchDocument } from '@/schemas/ctSearch-schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import assert from 'assert';
import { Model } from 'mongoose';

@Injectable()
export class CTSearchMongooseRepository implements ICTSearchRepository {
  constructor(@InjectModel('CTSearch') protected readonly ctSearch: Model<CTSearchDocument>) {}

  async save(ctSearch: CTSearch): Promise<void> {
    let session = null;

    this.ctSearch
      .startSession()
      .then(_session => {
        session = _session;
        return this.ctSearch.create(ctSearch);
      })
      .then(data => {
        session.startTransaction();
        return this.ctSearch.findById(data._id);
      })
      .then(data => {
        assert.ok(data.$session());
        return data.save();
      })
      .then(() => session.commitTransaction())
      .then(() => session.endSession());
  }
}
