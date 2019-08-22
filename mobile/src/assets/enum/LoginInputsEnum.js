const LoginInputsEnum = {
  LABELS: {
    USERNAME: 'Korisničko ime',
    EMAIL: 'E-mail',
    PASSWORD: 'Šifra',
    CONFIRM_PASS: 'Potvrdi šifru',
  },
  ERRORS: {
    PASS_LENGTH_ERR: 'Šifra mora imati minimalno 6 znakova',
    PASS_CONFIRM_ERR: 'Šifre se ne podudaraju',
    USERNAME_ERR: 'Korisničko ime mora imati minimalno 4 znaka',
    EMAIL_ERR: 'E-mail nije validan',
    LOGIN_ERR: 'Korisničko ime ili šifra nisu ispravni',
    USER_EXISTS_ERR: 'Korisničko ime već postoji!',
  },
};

export default LoginInputsEnum;
