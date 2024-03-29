import { User } from '../../types/user.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { createSHA256 } from '../../core/helpers/common.js';
import { OfferEntity } from '../offer/entity.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true, type: () => String })
  public email: string;

  @prop({
    required: false,
    type: () => String,
    default: '',
    match: [/.*\.(?:jpg|png)/, 'Avatar must be jpg or png'],
  })
  public avatarUrl?: string;

  @prop({
    required: true,
    type: () => String,
    minlength: [1, 'Min length for username is 1'],
    maxlength: [15, 'Max length for username is 15'],
  })
  public name: string;

  @prop({
    required: true,
    type: () => Boolean,
  })
  public isPro: boolean;

  @prop({ required: true, ref: 'OfferEntity', default: [] })
  public favorite!: Ref<OfferEntity>[];

  @prop({
    required: true,
    type: () => String,
    default: '',
  })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt?: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt?: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
