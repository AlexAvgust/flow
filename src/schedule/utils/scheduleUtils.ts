import * as moment from 'moment';

export const getDateWithoutTime = (date: string) => {
  const changedDate = moment(date).startOf('day').format('YYYY-MM-DD');
  console.log('changedDate', changedDate);

  return moment(date).startOf('day').format('YYYY-MM-DD');
};
