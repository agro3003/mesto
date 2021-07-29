export default class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileAbout);
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
  }
}