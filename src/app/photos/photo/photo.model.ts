export interface IPhoto {
  id: number;
  postDate: Date;
  url: string;
  description: string;
  allowComments: boolean;
  likes: number;
  comments: number;
  userId: number;
}

export interface IPhotoComment {
  date: Date;
  text: string;
  userName: string;
}
