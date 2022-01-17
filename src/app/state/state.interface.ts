export interface IPost {
  id: number;
  fname: string;
  lname: string;
  mobile: string;
  email: string;
  job: string;
  date: string;
  terms: boolean;
}

export interface Posts {
  posts: IPost[];
  error: string;
}

export const initialState = {
  posts: [
    {
      fname: 'visshnnu',
      lname: 'tejaa',
      mobile: '7619352192',
      email: 'email@gamil.com',
      job: 'Part Time',
      date: '2021-12-29',
      terms: false,
      id: 1,
    },
    {
      fname: 'visshnnu',
      lname: 'tejaa',
      mobile: '7619352192',
      email: 'email@gamil.com',
      job: 'Part Time',
      date: '2021-12-29',
      terms: false,
      id: 2,
    },
    {
      fname: 'visshnnu',
      lname: 'tejaa',
      mobile: '7619352192',
      email: 'email@gamil.com',
      job: 'Part Time',
      date: '2021-12-29',
      terms: false,
      id: 3,
    },
  ],
  error: '',
};
