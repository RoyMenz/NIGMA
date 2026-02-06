// Event Details Data

export interface EventDetail {
  id: number;
  title: string;
  description: string;
  quote: string;
  icon: string;
  heads?: string[];
  /** Number of participants per team (1 = solo, 2 = duo, etc.). Set manually per event. Use max when range is set. */
  teamSize: number;
  /** Optional range for badge display (e.g. Variety 10–17). */
  teamSizeMin?: number;
  teamSizeMax?: number;
  rules: string[];
  registrationDeadline?: string;
}

/** Returns the event's team size (max when range set), or 1 if event is null/undefined. */
export function getTeamSize(event: { teamSize?: number; teamSizeMax?: number } | null): number {
  if (!event) return 1;
  return event.teamSizeMax ?? event.teamSize ?? 1;
}

/** Returns team size for badge: "10-17" when range set, otherwise the number. */
export function getTeamSizeDisplay(event: { teamSize?: number; teamSizeMin?: number; teamSizeMax?: number } | null): string | number {
  if (!event) return 1;
  if (event.teamSizeMin != null && event.teamSizeMax != null) {
    return `${event.teamSizeMin}-${event.teamSizeMax}`;
  }
  return event.teamSize ?? 1;
}

export const eventDetails: EventDetail[] = [
  // Commerce events (displayed first)
  {
    id: 1,
    title: 'Best Manager',
    description: 'Inter-college management challenge.',
    quote: 'Prove your leadership, strategy and people skills in this management simulation.',
    icon: 'grade',
    heads: ['Vishak', 'Santhosh'],
    teamSize: 1,
    rules: [
      'Entry Fees : ₹ 150 per participant(On-site payment).',
      'Every college has only one participant each.',
      'Participants must wear formal attire with a blazer.',
      'Rounds will be disclosed on the spot.',
      'No participant replacements are allowed after registration.',
      'Participants must carry their own laptop.',
      'Arguments with the judges will not be entertained.',
      'Use of unfair means, plagiarism, or external assistance is strictly prohibited.',
      'Participants must maintain professional behavior throughout the event.',
      'Any form of misbehavior or misconduct will lead to immediate disqualification.'
    ]
  },
  {
    id: 2,
    title: 'Finance',
    description: 'Finance case challenge and trading simulations.',
    quote: 'Show your financial acumen and trading instincts.',
    icon: 'attach_money',
    heads: ['Prarthana', 'Bharath'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team(On-site payment).',
      'Two make a team.',
      'The rounds and rules will be explained on the spot.',
      'After registration, the replacement of any participant is not allowed.',
      'Participants must carry their own smartphone with good network connection for internet access.',
      'Participants must bring their own calculator.'
    ]
  },
  {
    id: 3,
    title: 'Marketing',
    description: 'Marketing strategy and campaign creation.',
    quote: 'Craft campaigns that move people and markets.',
    icon: 'campaign',
    heads: ['Prapthi', 'Ayshal'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team.',
      'Each team shall consist of Two participants(On-site payment).',
      'Participants are required to bring their own Laptops.',
      'Borrowing devices from other teams is strictly prohibited.',
      'The event will be conducted in multiple rounds.',
      'Use of mobile phones/internet or any misconduct will lead to disqualification.'
    ]
  },
  {
    id: 4,
    title: 'HR',
    description: 'Human Resources challenge & role plays.',
    quote: 'Test your people skills and organisational judgment.',
    icon: 'group',
    heads: ['Pavani', 'Sudeeksha'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team(On-site payment).',
      'Two make a team.',
      'Participants must carry a valid college ID.',
      'Registration is Compulsory.',
      'The event consists of multiple rounds. Rules relating to rounds will be informed on the spot.',
      'Participants must report 15 minutes before the schedule.',
      'Judges and organizers decisions will be final.',
      'Any form of misbehaviour or indiscipline will lead to disqualification.',
      'Dress Code: Formal or business casuals.',
      'Strict time limit will be followed for each round.'
    ]
  },
  {
    id: 5,
    title: 'Event Management',
    description: 'Plan and execute a mock event.',
    quote: 'Showcase logistics, creativity and management skills.',
    icon: 'event',
    heads: ['Rishika', 'Viola'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team(On-site payment).',
      'Two make a team.',
      'The event will have multiple rounds focusing on creativity, crisis handling, planning and presentation.',
      'Rules relating to the rounds and topics shall be informed on the spot.',
      'Participants must clarify their doubts before the competition starts.',
      'After the registration, replacement of any participant is not allowed.',
      'Misconduct or arguments with judges will lead to disqualification.',
      'Participants are required to bring the necessary electronic devices.',
      'Judges decision is final.'
    ]
  },

  // IT / Technical events (displayed second)
  {
    id: 6,
    title: 'Coding Challenge',
    description: 'Problem-solving contest.',
    quote: 'Speed, accuracy and algorithmic thinking win the day.',
    icon: 'code',
    heads: ['Leesha', 'Lavisha'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team(On-site payment).',
      'Two make a team.',
      'Participants must have basic knowledge of programming languages like (C, C++, Java, Python).',
      'Any kind of malpractices will lead to disqualification of the team.',
      'All the rounds and their rules will be disclosed just before the competition.'
    ]
  },
  {
    id: 7,
    title: 'E-Sports',
    description: 'Competitive gaming tournament.',
    quote: 'Bring your best team and reflexes to the arena.',
    icon: 'sports_esports',
    heads: ['Vikas', 'Adithya Shenoy'],
    teamSize: 4,
    rules: [
      'Entry Fees : ₹ 300 per team(On-site payment).',
      'Squad entry only with exactly four players per team. TPP mode only. Players are requested to download all the maps in advance.',
      'Tournament will be conducted in league format. Winners and runners-up will be decided based on total points from all matches.',
      'Only mobile phones are allowed. Emulators, tablets, iPads, or external devices are strictly prohibited.',
      'No hacking, cheating, or teaming up with other squads. Any violation will result in immediate disqualification of the entire team. Organisers can check devices.',
      'All players must be present inside the venue at least 15 minutes before match time. Late entry is not allowed.',
      'Respect towards players, volunteers, and organizers is mandatory. Organizer\'s decision will be final and binding.'
    ]
  },
  {
    id: 8,
    title: 'IT Treasure Hunt',
    description: 'Tech-themed treasure hunt.',
    quote: 'Solve riddles, decode clues and race to the treasure.',
    icon: 'search',
    heads: ['Sudeeksha', 'Manisha'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team(On-site payment).',
      'Number of participants for the event will be 2 per team.',
      'The decision of the event coordinators will be final and shall not be subjected to any change.',
      'The event will unfold in multiple stages leading to the final treasure.',
      'Participants are not allowed to use mobiles or electronic devices unless specified.',
      'Replacement of any participant of a team is not allowed after registration.',
      'Teams using unfair means will face disqualification.'
    ]
  },
  {
    id: 9,
    title: 'Maths Heptathlon',
    description: 'Seven mathematical challenges.',
    quote: 'From logic puzzles to number theory — endurance matters.',
    icon: 'calculate',
    heads: ['Clanita', 'Shruthi'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team(On-site payment).',
      'Each team must have 2 participants.',
      'The event consists of 7 rounds, each testing different mathematical and logical skills.',
      'Rules and instructions for each round will be explained on the spot.',
      'No replacement of participants after the registration.',
      'Participants must clarify their doubts before the competition starts.',
      'Arguments or disputes with judges are strictly not allowed.',
      'Any form of misconduct or unfair practices will result in disqualification.'
    ]
  },
  {
    id: 10,
    title: 'Hackathon',
    description: 'Build solutions in a sprint.',
    quote: 'Create, prototype and present — build what matters.',
    icon: 'developer_mode',
    heads: ['Royston', 'Prarthana'],
    teamSize: 4,
    teamSizeMin: 2,
    teamSizeMax: 4,
    rules: [
      'The hackathon will be conducted over a continuous duration of 20 hours.',
      'Entry Fees : ₹ 350 per head, payable only by 15 teams shortlisted for the final round.',
      'The event will be held in two phases: Round 1 (Online Ideation Round) and Round 2 (Onsite Final Round).',
      'Only currently enrolled BCA and BSC students are eligible to participate.',
      'Teams must consist of 2 to 4 members, and all members must belong to the same college.',
      'Team composition cannot be changed after registration.',
      'For Round 1, teams must submit an idea presentation (PPT) based on one of the four provided tracks.',
      'Based on the evaluation, the top 15 teams will be shortlisted for the onsite finals.',
      'In the final round, problem statements will be announced on the spot.',
      'All solutions must be designed and developed strictly during the hackathon duration.',
      'Use of pre-built or previously developed projects is strictly prohibited.',
      'If any third-party libraries, tools, APIs, or code are used, proper credits must be clearly mentioned.',
      'Plagiarism or failure to provide appropriate credits will result in immediate disqualification.',
      'The decisions of the judges and organizing committee shall be final and binding.'
    ]
  },

  // Other / Cultural events (displayed last)
  {
    id: 11,
    title: 'Variety Event',
    description: 'Open cultural performances.',
    quote: 'Bring any act that entertains and inspires.',
    icon: 'theaters',
    heads: ['Afreed', 'Shanola'],
    teamSize: 17,
    teamSizeMin: 10,
    teamSizeMax: 17,
    rules: [
      'Entry Fees : ₹ 600 per team(On-site payment).',
      'All performances must strictly follow the theme: "ಕಾಲಯಾನ (Kaalayaana) – The Journey Through Time" (Ancient → Medieval → Present → Future)',
      'Each team must clearly show transitions between different time periods in their performance.',
      'Team Size: 15 + 2 participants. Maximum of 15 participants, Minimum of 8 participants per team, Plus 2 members for backstage support only.',
      'Time Limit: 15 + 2 minutes. 15 minutes for performance. 2 minutes strictly for stage set-up. No performance is allowed during the set-up time.',
      'Exceeding the time limit may lead to negative marking.',
      'Performance Types Allowed: Dance, Singing, Skit, Mime, Drama, Fashion Walk, Fusion Acts, and other creative forms.',
      'Costumes, props, and music must match the selected era(s) and support the theme.',
      'Vulgarity, offensive gestures, or inappropriate content is strictly prohibited.',
      'Performances must respect all cultures, traditions, and communities.',
      'Audio tracks must be submitted in MP3 format before the event.',
      'LED screen facility is available and teams are free to use it.',
      'Teams must report at least 30 minutes prior to their performance time.',
      'Participants must handle props carefully. Any damage to the stage or college property will be the team\'s responsibility.',
      'Use of dangerous materials such as fire, sharp objects, liquids, or heavy props is strictly prohibited.',
      'The judges\' decision will be final and binding.',
      'Late entries and violation of rules may result in negative marking or disqualification.',
      'The Organizing Committee reserves the right to make necessary changes for the smooth conduct of the event.'
    ]
  },
  {
    id: 12,
    title: 'Mock Press',
    description: 'Press and media event simulation.',
    quote: 'Craft narratives, press releases and handle interviews professionally.',
    icon: 'newspaper',
    heads: ['Trisha', 'Pranamya'],
    teamSize: 1,
    rules: [
      'Entry Fees : ₹ 100 per participant(On-site payment).',
      'Individual participation.',
      'The participant can choose a particular personality for the first round, rules for the second round will be disclosed later.',
      'Languages that can be used are English, Hindi, Kannada and Tulu (Obscene words and flaring comments are strictly prohibited).',
      'Before the event, participants must give the required information about their personality to the event head.',
      'Participants must wear the costumes and use music suitable to the character.',
      'Argument with the judges will lead to disqualification of the participant.'
    ]
  },
  {
    id: 13,
    title: 'Best out of Waste',
    description: 'Creative reuse competition.',
    quote: 'Turn trash into treasure with creativity and sustainability.',
    icon: 'recycling',
    heads: ['Riya', 'Shreya'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team(On-site payment).',
      'Each team must consist of 2 members.',
      'Time limit: 2 hours.',
      'There will be only one round.',
      'Participants must bring their own waste materials (maximum 5 items can be used).',
      'Only used/waste materials are allowed; no new or decorative items.',
      'Basic stationery is allowed and not counted as waste.',
      'Only hot glue gun is permitted; no other electrical items allowed.',
      'Judging will be based on creativity, use of waste, and presentation.',
      'The judges decision is final.',
      'No replacement of participants after registration.'
    ]
  },
  {
    id: 14,
    title: 'Reel Making',
    description: 'Short-form video challenge.',
    quote: 'Tell a story in 30–60 seconds.',
    icon: 'movie',
    heads: ['Manish', 'Dhanush'],
    teamSize: 1,
    rules: [
      'Entry Fees : ₹ 100 per participant(On-site payment).',
      'Individual participation.',
      'Both mobile phones and DSLR cameras are allowed.',
      'Reel must be a maximum of 1 minute 30 sec in duration.',
      'The topic will be provided on the spot.',
      'No Plagiarism.'
    ]
  },
  {
    id: 15,
    title: 'Face Painting',
    description: 'Art and creativity on canvas — your face.',
    quote: 'Colors, patterns and imagination.',
    icon: 'brush',
    heads: ['Akshay N', 'Prajna'],
    teamSize: 2,
    rules: [
      'Entry Fees : ₹ 150 per team(On-site payment).',
      'Each team must have two participants: one painter and one model.',
      'The time limit is 60 minutes.',
      'Participants must report 15 minutes before the event starts.',
      'The theme will be announced 30 minutes before the event and must be followed.',
      'Only skin-safe face paints and brushes are allowed.',
      'Painting must be done only on the face.',
      'Participants must bring their own materials.',
      'No change of team members is allowed after registration.',
      'No outside help or mobile phone usage is allowed during the event.',
      'The judges and organisers decision will be final.'
    ]
  }
];
