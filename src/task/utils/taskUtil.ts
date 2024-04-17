export const getRandomTaskName = (): string => {
  const possibleTaskNames = [
    'Read a book',
    'Write an article',
    'Attend a meeting',
    'Exercise',
    'Cook dinner',
    'Learn a new skill',
    'Clean the house',
    'Call a friend',
    'Plan a trip',
    'Watch a movie',
    'Do grocery shopping',
    'Take a walk',
    'Study',
    'Work on a project',
    'Listen to music',
    'Practice meditation',
    'Visit family',
    'Attend a class',
    'Volunteer',
    'Water plants',
    'Go for a run',
    'Organize closet',
    'Write in journal',
    'Play a game',
    'Go to the gym',
    'Explore nature',
    'Try a new recipe',
    'Read news',
    'Do laundry',
    'Paint',
    'Have a picnic',
    'Visit a museum',
    'Go to a concert',
    'Attend a webinar',
    'Watch a documentary',
    'Write poetry',
    'Do yard work',
    'Attend a sports event',
    'Go fishing',
    'Visit a park',
    'Have a barbecue',
    'Take a nap',
    'Attend a workshop',
    'Go for a bike ride',
    'Attend a party',
    'Have a spa day',
    'Do DIY project',
    'Try a new hobby',
    'Read a magazine',
    'Write a letter',
    'Attend a conference',
    'Exercise at home',
    'Cook breakfast',
    'Learn to play an instrument',
    'Clean the garage',
    'Call a relative',
    'Plan a vacation',
    'Watch a TV show',
    'Go to the farmers market',
    'Take a hike',
    'Study for an exam',
    'Work on a presentation',
    'Listen to a podcast',
    'Practice yoga',
    'Visit a friend',
    'Attend a seminar',
    'Volunteer at a shelter',
    'Water flowers',
    'Go for a walk',
    'Organize files',
    'Write a short story',
    'Play video games',
    'Go for a swim',
    'Explore a new city',
    'Try a new dish',
    'Read a blog',
    'Do the dishes',
    'Sketch',
    'Have a beach day',
    'Visit an art gallery',
    'Go to a theater',
    'Attend a concert',
    'Watch a TED talk',
    'Write a novel',
    'Mow the lawn',
    'Attend a game',
    'Go birdwatching',
    'Visit a zoo',
    'Have a family dinner',
    'Take a siesta',
    'Attend a course',
    'Go for a motorcycle ride',
    'Attend a festival',
    'Have a pampering day',
    'Do home improvement',
    'Experiment with photography',
    'Read a comic book',
    'Write a blog post',
    'Attend a trade show',
    'Exercise outdoors',
    'Cook lunch',
    'Learn a foreign language',
    'Clean the windows',
    'Call a colleague',
    'Plan a road trip',
    'Watch a documentary series',
    'Go to a flea market',
    'Take a jog',
    'Study a new subject',
    'Work on a puzzle',
    'Listen to an audiobook',
    'Practice drawing',
    'Visit a neighbor',
    'Attend a lecture',
    'Volunteer at a charity',
    'Water the garden',
    'Go for a hike',
    'Organize paperwork',
    'Write a poem',
    'Play board games',
    'Go to a spa',
    'Explore a new hobby',
  ];

  return possibleTaskNames[
    Math.floor(Math.random() * possibleTaskNames.length)
  ];
};

export const generateRandomDate = () => {
  const startDate = new Date(
    +new Date() - Math.floor(Math.random() * 10000000000),
  );
  const endDate = new Date(
    +new Date() + Math.floor(Math.random() * 10000000000),
  );

  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  const randomTimestamp =
    startTimestamp + Math.random() * (endTimestamp - startTimestamp);

  const randomDate = new Date(randomTimestamp).toISOString();

  return randomDate;
};

export const generateRandomMilliseconds = () => {
  const minMilliseconds = 20 * 60 * 1000;
  const maxMilliseconds = 6 * 60 * 60 * 1000;

  const randomDuration =
    Math.floor(Math.random() * (maxMilliseconds - minMilliseconds)) +
    minMilliseconds;

  const randomStart = Math.floor(
    Math.random() * (10000000000 - randomDuration),
  );

  const randomEnd = randomStart + randomDuration;

  return {
    taskStartInMilliseconds: randomStart,
    taskEndInMilliseconds: randomEnd,
  };
};
