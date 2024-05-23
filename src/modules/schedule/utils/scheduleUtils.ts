import * as moment from 'moment';

export const getDateWithoutTime = (date: string) => {
  const changedDate = moment(date).startOf('day').format('YYYY-MM-DD');
  console.log('changedDate', changedDate);

  return moment(date).startOf('day').format('YYYY-MM-DD');
};

export const compareDates = (date1, date2) => {
  const [startDate, endDate] = moment(date1).isBefore(date2, 'day')
    ? [date1, date2]
    : [date2, date1];
  return { startDate, endDate };
};
