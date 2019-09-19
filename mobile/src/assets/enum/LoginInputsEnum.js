const LoginInputsEnum = {
  LABELS: {
    NAME: 'Ime',
    SURNAME: 'Prezime',
    EMAIL: 'E-mail',
    PASSWORD: 'Šifra',
    CONFIRM_PASS: 'Potvrdi šifru',
  },
  ERRORS: {
    PASS_LENGTH_ERR: 'Šifra mora imati minimalno 6 znakova',
    PASS_CONFIRM_ERR: 'Šifre se ne podudaraju',
    NAME_ERR: 'Ime mora imati minimalno 2 znaka',
    SURNAME_ERR: 'Prezime mora imati minimalno 2 znaka',
    EMAIL_ERR: 'E-mail nije validan',
    LOGIN_ERR: 'Email ime ili šifra nisu ispravni',
    USER_EXISTS_ERR: 'Korisnik s tim emailom već postoji!',
  },
};

export default LoginInputsEnum;
