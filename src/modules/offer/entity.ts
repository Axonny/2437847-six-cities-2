import typegoose, { defaultClasses, getModelForClass, Ref, Severity } from '@typegoose/typegoose';
import { City, Facilities, HousingType } from '../../types/enums.js';
import { UserEntity } from '../user/entity.js';
import { Coordinates } from '../../types/offer.js';
import mongoose from 'mongoose';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    type: () => String,
    enum: City,
  })
  public city!: City;

  @prop({ default: 0, type: () => Number, min: [0, 'Min comments count is 0'] })
  public commentsCount!: number;

  @prop({
    required: true,
    type: () => Number,
    min: [100, 'Min price is 100'],
    max: [100000, 'Max price is 100000'],
  })
  public price!: number;

  @prop({
    required: true,
    trim: true,
    type: () => String,
    minlength: [20, 'Min length for description is 20'],
    maxlength: [1024, 'Max length for description is 1024'],
  })
  public description!: string;

  @prop({
    required: true,
    type: () => String,
    enum: Facilities,
  })
  public goods!: Facilities[];

  @prop({
    required: true,
    type: () => Number,
    min: [1, 'Min count of guests is 1'],
    max: [10, 'Max count of guests is 10'],
  })
  public maxAdults!: number;

  @prop({
    required: true,
    type: () => String,
    enum: HousingType,
  })
  public type!: HousingType;

  @prop({
    type: () => [String],
    minCount: [6, 'Images should be 6'],
    maxCount: [6, 'Images should be 6'],
  })
  public images!: string[];

  @prop({
    required: true,
    trim: true,
    type: () => String,
    minlength: [10, 'Min length for title is 10'],
    maxlength: [100, 'Max length for title is 100'],
  })
  public title!: string;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public host!: Ref<UserEntity>;

  @prop({ required: true, default: false, type: () => Boolean })
  public isPremium!: boolean;

  public isFavorite!: boolean;

  @prop({ required: true, type: () => String })
  public previewImage!: string;

  @prop({ required: true, type: () => Date })
  public publicationDate!: Date;

  @prop({
    type: () => Number,
    default: 1,
    min: [1, 'Min rating is 1'],
    max: [5, 'Max rating is 5'],
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => Number,
    min: [1, 'Min room count is 1'],
    max: [8, 'Max room count is 8'],
  })
  public bedrooms!: number;

  @prop({
    required: true,
    type: () => mongoose.Schema.Types.Mixed,
    allowMixed: Severity.ALLOW,
  })
  public location!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
