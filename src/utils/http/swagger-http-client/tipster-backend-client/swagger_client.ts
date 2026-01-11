export type Swagger = {
  "/fixture/fixtureId": {
    get: {
      params: {
        sportName: string;
        fixtureId: string;
      },
      requestBody: null,
      result: Fixture
    }
  },
  "/sports/leagues": {
    get: {
      params: {
        sportName: string;
        countryName: string;
      },
      requestBody: null,
      result: null
    }
  },
  "/sports/countrys": {
    get: {
      params: {
        sportName: string;
      },
      requestBody: null,
      result: null
    }
  },
  "/sports/sports": {
    get: {
      params: {

      },
      requestBody: null,
      result: null
    }
  },
  "/sports/leagues/sync": {
    post: {
      params: {

      },
      requestBody: null,
      result: null
    }
  },
  "/Users/me": {
    get: {
      params: {

      },
      requestBody: null,
      result: UserSwagger
    }
  },
  "/Users": {
    get: {
      params: {

      },
      requestBody: null,
      result: UserSwagger[]
    },
    post: {
      params: {

      },
      requestBody: RegisterDto,
      result: UserSwagger
    },
    put: {
      params: {

      },
      requestBody: UpdateUserDto,
      result: AuthenticationResponseDto
    },
    delete: {
      params: {
        id: string;
      },
      requestBody: null,
      result: null
    }
  },
  "/Users/{id}": {
    get: {
      params: {
        id: string;
      },
      requestBody: null,
      result: UserSwagger
    }
  },
  "/Users/first-user": {
    post: {
      params: {

      },
      requestBody: null,
      result: UserSwagger
    }
  },
  "/Authentication": {
    post: {
      params: {

      },
      requestBody: LoginDto,
      result: AuthenticationResponseDto
    }
  },
  "/section": {
    post: {
      params: {

      },
      requestBody: SectionRequest,
      result: null
    },
    get: {
      params: {
        page: string;
      },
      requestBody: null,
      result: null
    }
  },
  "/section/{id}": {
    put: {
      params: {
        id: string;
      },
      requestBody: SectionRequest,
      result: null
    }
  },
  "/metadata": {
    post: {
      params: {

      },
      requestBody: null,
      result: null
    },
    delete: {
      params: {

      },
      requestBody: DeleteFileDto,
      result: null
    }
  }
};

export interface Periods {
  first: number;
  second: number;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
}

export interface Status {
  long: string;
  short: string;
  elapsed: number;
  extra: number;
}

export interface FixtureInfo {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
}

export interface League {
  id: number;
  name: string;
  type: string;
  country: string;
  logo: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface Teams {
  home: Team;
  away: Team;
}

export interface Goal {
  home: number;
  away: number;
}

export interface Score {
  halftime: Goal;
  fulltime: Goal;
  extratime: Goal;
  penalty: Goal;
}

export interface EventTime {
  elapsed: number;
  extra: number;
}

export interface Player {
  id: number;
  name: string;
}

export interface Assist {
  id: number;
  name: string;
}

export interface FixtureEvent {
  time: EventTime;
  team: Team;
  player: Player;
  assist: Assist;
  type: 'Card' | 'Goal' | 'subst' | 'Var';
  detail: 'Yellow Card' | 'Red Card' | 'Substitution 1' | 'Substitution 2' | 'Substitution 3' | 'Substitution 4' | 'Substitution 5' | 'Substitution 6' | 'Substitution 7' | 'Substitution 8' | 'Substitution 9' | 'Substitution 10' | 'Substitution 11' | 'Normal Goal' | 'Own Goal' | 'Penalty' | 'Missed Penalty';
  comments: string;
}

export interface Colors {
  primary: string;
  number: string;
  border: string;
}

export interface TeamColors {
  player: Colors;
  goalkeeper: Colors;
}

export interface TeamWithColors {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
  colors: TeamColors;
}

export interface Coach {
  id: number;
  name: string;
  photo: string;
}

export interface LineupPlayer {
  id: number;
  name: string;
  number: number;
  pos: 'G' | 'D' | 'M' | 'F';
  grid: string;
}

export interface LineupPlayerWrapper {
  player: LineupPlayer;
}

export interface Lineup {
  team: TeamWithColors;
  coach: Coach;
  formation: string;
  startXI: LineupPlayerWrapper[];
  substitutes: LineupPlayerWrapper[];
}

export interface StatisticValue {
  type: 'Shots on Goal' | 'Shots off Goal' | 'Total Shots' | 'Blocked Shots' | 'Shots insidebox' | 'Shots outsidebox' | 'Fouls' | 'Corner Kicks' | 'Offsides' | 'Ball Possession' | 'Yellow Cards' | 'Red Cards' | 'Goalkeeper Saves' | 'Total passes' | 'Passes accurate' | 'Passes %' | 'expected_goals' | 'goals_prevented';
  value: Record<string, any>;
}

export interface TeamStatistics {
  team: Team;
  statistics: StatisticValue[];
}

export interface PlayerWithPhoto {
  id: number;
  name: string;
  photo: string;
}

export interface Games {
  minutes: number;
  number: number;
  position: 'G' | 'D' | 'M' | 'F';
  rating: string;
  captain: boolean;
  substitute: boolean;
}

export interface Shots {
  total: number;
  on: number;
}

export interface GoalsStats {
  total: number;
  conceded: number;
  assists: number;
  saves: number;
}

export interface Passes {
  total: number;
  key: number;
  accuracy: string;
}

export interface Tackles {
  total: number;
  blocks: number;
  interceptions: number;
}

export interface Duels {
  total: number;
  won: number;
}

export interface Dribbles {
  attempts: number;
  success: number;
  past: number;
}

export interface Fouls {
  drawn: number;
  committed: number;
}

export interface Cards {
  yellow: number;
  red: number;
}

export interface Penalty {
  won: number;
  commited: number;
  scored: number;
  missed: number;
  saved: number;
}

export interface PlayerStatistic {
  games: Games;
  offsides: number;
  shots: Shots;
  goals: GoalsStats;
  passes: Passes;
  tackles: Tackles;
  duels: Duels;
  dribbles: Dribbles;
  fouls: Fouls;
  cards: Cards;
  penalty: Penalty;
}

export interface PlayerStatisticsItem {
  player: PlayerWithPhoto;
  statistics: PlayerStatistic[];
}

export interface PlayersData {
  team: Team;
  players: PlayerStatisticsItem[];
}

export interface Fixture {
  fixture: FixtureInfo;
  league: League;
  teams: Teams;
  goals: Goal;
  score: Score;
  events: FixtureEvent[];
  lineups: Lineup[];
  statistics: TeamStatistics[];
  players: PlayersData[];
}

export interface GenderSwagger {
  id: number;
  name: string;
  createdAt: string;
  users: UserSwagger[];
}

export interface ClaimGroupSwagger {
  id: string;
  name: string;
  claims: ClaimSwagger[];
}

export interface ClaimSwagger {
  id: string;
  name: string;
  claimGroup: ClaimGroupSwagger;
  claimGroupId: string;
  permissions: PermissionSwagger[];
  systemManaged: boolean;
}

export interface PermissionSwagger {
  id: string;
  claimId: string;
  claim: ClaimSwagger;
  roleId: string;
  role: RoleSwagger;
  enabled: boolean;
}

export interface RoleSwagger {
  id: string;
  name: string;
  permissions: PermissionSwagger[];
  User: UserSwagger[];
}

export interface LessonProgressSwagger {
  id: string;
  userId: string;
  lessonId: string;
  watched: boolean;
  watchedAt: string;
  updatedAt: string;
  user: UserSwagger;
  lesson: LessonSwagger;
}

export interface LessonSwagger {
  id: string;
  moduleId: string;
  title: string;
  status: string;
  shortDescription: string;
  description: string;
  difficulty: string;
  duration: number;
  durationText: string;
  playerProvider: string;
  playerUrl: string;
  visualizations: number;
  createdAt: string;
  updatedAt: string;
  module: ModuleSwagger;
  LessonProgress: LessonProgressSwagger[];
}

export interface ModuleSwagger {
  id: string;
  courseId: string;
  title: string;
  status: string;
  shortDescription: string;
  description: string;
  difficulty: string;
  duration: number;
  durationText: string;
  lessons: LessonSwagger[];
  createdAt: string;
  updatedAt: string;
  course: CourseSwagger;
}

export interface CourseCategorySwagger {
  id: string;
  name: string;
  courses: CourseCategoryOnCourseSwagger[];
}

export interface CourseCategoryOnCourseSwagger {
  courseId: string;
  categoryId: string;
  course: CourseSwagger;
  category: CourseCategorySwagger;
}

export interface CourseSwagger {
  id: string;
  title: string;
  status: string;
  shortDescription: string;
  description: string;
  duration: number;
  durationText: string;
  modules: ModuleSwagger[];
  categories: CourseCategoryOnCourseSwagger[];
  createdAt: string;
  updatedAt: string;
  CourseProgress: CourseProgressSwagger[];
}

export interface CourseProgressSwagger {
  id: string;
  userId: string;
  courseId: string;
  percentage: number;
  startedAt: string;
  updatedAt: string;
  completedAt: string;
  user: UserSwagger;
  course: CourseSwagger;
}

export interface UserSwagger {
  id: string;
  genderId: number;
  firstName: string;
  lastName: string;
  cnpj: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  addresses: AddressSwagger[];
  gender: GenderSwagger;
  role: RoleSwagger;
  roleId: string;
  CourseProgress: CourseProgressSwagger[];
  LessonProgress: LessonProgressSwagger[];
}

export interface AddressSwagger {
  id: number;
  userId: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  user: UserSwagger;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
}

export interface AuthenticationResponseDto {
  token: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginDto {
  emailAddress: string;
  password: string;
}

export interface SectionRequest {
  id?: number;
  ref?: string;
  page?: string;
  linkUrl?: string;
  videoUrl?: string;
  jsonContent?: string;
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  description?: string;
  linkText?: string;
  domain: string;
}

export interface DeleteFileDto {
  fileName: string;
}