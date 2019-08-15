import * as types from '../../actions/types';

export const largeTariffChanged = text => ({
  type: types.LARGE_TARIFF_CHANGED,
  payload: text,
});

export const smallTariffChanged = text => ({
  type: types.SMALL_TARIFF_CHANGED,
  payload: text,
});
