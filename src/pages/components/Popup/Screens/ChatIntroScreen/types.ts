export interface Question {
  text: string
  user_creator: string
  created_time: string
  status: string
}

export interface IFavouriteQuestion {
  message: string
  data: Question[]
}
