export interface PlayerData {
  gameToken: string;
  name: string;
  uid?: string;
  pid: string;
  data?: {
    state?: 'waiting' | 'in-game';
  };
}
