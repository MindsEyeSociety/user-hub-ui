import * as actions from './actions';
import * as components from './components';
import * as models from './models';
import reducer from './reducer';

export const NAME = 'profile';
export const Profile = components.ProfileContainer;
export default { actions, components, models, reducer, NAME };
