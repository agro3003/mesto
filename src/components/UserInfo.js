export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileAbout);
    this._avatar = document.querySelector(profileAvatar)
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }
  setUserInfo({ info }) {
    this._name.textContent = info.name;
    this._about.textContent = info.about;
    this._avatar.src = info.avatar;
  }
}