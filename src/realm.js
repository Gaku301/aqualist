import Realm from 'realm';

const evnetSchema = {
  name: 'Event',
  properties: {
    _id: 'int',
    title: 'string',
    date: 'date',
    color: 'string',
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
    name: 'string', // 水槽名
    set_up_date: 'date', // 立ち上げ日
    kind: 'int', // 海水 or 淡水
    amount: 'string', // 水量
    size: 'string', // サイズ
    memo: 'string', // メモ
    created_at: 'date',
  },
  primaryKey: '_id',
};

const aqualistSchema = {
  name: 'Aqualist',
  properties: {
    _id: 'int',
    name: 'string',
    size: 'string',
    start_date: 'string',
    end_date: 'string',
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
    schema: [aquariumSchema, evnetSchema, userSchema, aqualistSchema, settingSchema],
    schemaVersion: 1,
    // マイグレーション時にデータが消えるため本番ではfalseにしておく
    deleteRealmIfMigrationNeeded: true,
  };

  return new Realm(config);
};

export {BSON} from 'realm';
