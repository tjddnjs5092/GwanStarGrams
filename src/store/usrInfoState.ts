import {atom} from 'recoil';

type UserType = {
  isLogin: boolean;
  usrName: string;
  memberInfo: MemberInfo;
};
type MemberInfo = {
  usrName: string;
  usrNikName: string;
  usrImage: string;
};

export const userInfoState = atom<UserType>({
  key: 'userInfoState',
  default: {
    isLogin: false,
    usrName: '',
    memberInfo: {
      usrName: '',
      usrNikName: '',
      usrImage: '',
    },
  },
});
