import bcrypt from 'bcryptjs';

const encode = (password: string): string => {
  return bcrypt.hashSync(password, 8)
};

const compare = (password: string, encodePassword: string): boolean => {
    return bcrypt.compareSync(password, encodePassword);
};

export {encode, compare};
