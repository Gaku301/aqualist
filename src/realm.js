import Realm from 'realm';

const evnetSchema = {
  name: 'Event',
  properties: {
    _id: 'int',
    date: 'date',
    description: 'string',
    memo: 'string',
    created_at: 'date',
  },
  primaryKey: '_id',
};

const userSchema = {
  name: 'User',
  properties: {
    _id: 'int',
    name: 'string',
    email: 'string',
    created_at: 'date',
  },
  primaryKey: '_id',
};

const aquariumSchema = {
  name: 'Aquarium',
  properties: {
    _id: 'int',
    name: 'string',
    memo: 'string',
    created_at: 'date',
  },
  primaryKey: '_id',
};

const aqualistSchema = {
  name: 'Aqualist',
  properties: {
    _id: 'int',
    name: 'string',
    size: 'number',
    created_at: 'date',
  },
  primaryKey: '_id',
};

const settingSchema = {
  name: 'Setting',
  properties: {
    _id: 'int',
    user_id: 'User',
  },
  primaryKey: '_id',
};


// Realmの初期化
export const openRealm = () => {
  const config = {
    path: 'aqualist',
    schema: [aquariumSchema],
    schemaVersion: 1,
  };

  return new Realm(config);
};

export {BSON} from 'realm';
