import { profileAbout, profileName } from '../utils/constants.js'

export default class UserInfo {
  constructor(info) {
    this._info = info;
    this._name = this._info.name;
    this._about = this._info.about;
  }
  getUserInfo(obj) {
    obj.querySelector('.popup__input_type_name').value = profileName.textContent;
    obj.querySelector('.popup__input_type_about').value = profileAbout.textContent;
  }
  setUserInfo = () => {
    profileName.textContent = this._name;
    profileAbout.textContent = this._about;
  }
}