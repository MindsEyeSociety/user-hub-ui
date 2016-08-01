import * as actions from './actions';
import reducer from './reducer';

export const NAME = 'profile';
export const getCurrentUser = actions.getCurrentUser;
export const setProfileId = actions.setProfileId;
export const setProfileOffices = actions.setProfileOffices;

export default { actions, reducer, NAME };
