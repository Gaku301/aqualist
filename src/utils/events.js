/**
 * カレンダーのイベント(Event)に関する処理を記載
 * DB: Event
 */
import { openRealm } from '../realm';


const Realm = openRealm();

/**
 * 一ヶ月分のイベントを取得する
 * @param {String} dateStr
 * @returns {Array}
 */
export const getEventsForMonth = (dateStr) => {
  let events = [];
  const date = new Date(dateStr);
  // 月初日
  const first = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
  // 月末日
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const end = new Date(`${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`);

  try {
    const allEvents = Realm.objects('Event');
    // 一ヶ月分のイベントを取得
    events = allEvents.filtered('date >= $0 AND date <= $1', first, end);
  } catch (error) {
    console.error(error);
  }

  return events;
};

/**
 * 選択された日付のEventをDBから取得する
 * @param {String} targetDate
 * @returns {Array}
 */
export const getEventsByDate = (targetDate) => {
  let filteredEvents = [];
  try {
    let allEvents = Realm.objects('Event');
    filteredEvents = allEvents.filtered('date == $0', new Date(targetDate));
  } catch (error) {
    console.error(error);
  }

  return filteredEvents;
};

/**
 * 表示月のmarkedDatesを取得する
 * @param {String} targetDate
 * @returns {Object}
 */
export const getMarkedDates = (targetDate) => {
  let markedDates = {};
  try {
    // 一ヶ月分のイベントを取得する
    const eventsForMonth = getEventsForMonth(targetDate);
    // イベントのdateとcolorをmakedDatesにセット
    eventsForMonth.forEach(eventVal => {
      const date = new Date(eventVal.date);
      // ゼロパディングしないとCalendar側で表示されないのでゼロパディングしておく
      let dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      if (markedDates[dateStr] !== undefined) {
        // 既に追加済みの日付の場合はその日付にイベントを追加
        let dotData = {key: eventVal._id.toString(), color: eventVal.color};
        markedDates[dateStr].dots.push(dotData);
      } else {
        // その日付がない場合はそのまま追加
        markedDates[dateStr] = {dots: [{key: eventVal._id, color: 'red'}]};
      }
    });
  } catch (error) {
    console.error(error);
  }

  return markedDates;
};

/**
 * Event保存時のバリデーション
 * @param {Object} eventData
 * @returns {Boolean|String}
 */
export const validation = (eventData) => {
  let target = '';
  if (!eventData.title) {
    target = '【タイトル】';
  } else if (!eventData.date) {
    target = '【日付】';
  }

  // エラーがあった場合はエラーメッセージを返す
  if (target !== '') {
    return `${target}を入力してください`;
  }

  return true;
};


// イベントを保存
export const addEventData = (eventData) => {
  const all_events = Realm.objects('Event');
  const last_event = all_events.sorted('_id', true)[0];
  const last_event_id = last_event?._id ?? 0; // idを取得

  // バリデーションチェック
  const result = validation(eventData);
  if (result !== true) {
    // エラーメッセージをそのまま返して終了
    return result;
  }

  // データベースにデータを追加
  Realm.write(() => {
    Realm.create('Event', {
      _id: last_event_id + 1,
      title: eventData.title,
      date: eventData.date,
      color: eventData.color,
      memo: eventData.memo,
      created_at: new Date(),
    });
  });
  return true;
};
